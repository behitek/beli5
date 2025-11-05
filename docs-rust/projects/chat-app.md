---
sidebar_position: 11
title: 💬 Real-time Chat Application
description: Xây dựng ứng dụng chat real-time với WebSocket - Tokio async runtime, message broadcasting, room management
keywords: [rust, project, websocket, chat, real-time, tokio, async, advanced, networking]
---

# 💬 Real-time Chat Application

## 🎯 Mục Tiêu Dự Án

Xây dựng một **real-time chat application** với WebSocket protocol:
- 🔌 WebSocket server và client handling
- 📡 Message broadcasting to multiple clients
- 🏠 Multiple chat rooms support
- 👤 User management (join, leave, nicknames)
- 📨 Private messages (DMs)
- 📜 Message history per room
- 👥 Online users list
- ⚡ High-performance async với Tokio

### Bạn Sẽ Học Được
- ✅ **WebSocket protocol** implementation
- ✅ **Async programming** với Tokio
- ✅ **Channels** cho message passing (`mpsc`, `broadcast`)
- ✅ **Concurrent data structures** (Arc, Mutex, RwLock)
- ✅ **Actor pattern** cho state management
- ✅ **Broadcasting** messages to multiple clients
- ✅ **Real-time communication** patterns
- ✅ **Error handling** trong async context

## 📦 Bước 1: Setup Project

```bash
cargo new chat_app
cd chat_app
```

Thêm dependencies vào `Cargo.toml`:

```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
tokio-tungstenite = "0.21"
futures-util = "0.3"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
uuid = { version = "1.0", features = ["v4"] }
chrono = "0.4"
dashmap = "5.5"
```

## 🎮 Bước 2: Version 1 - Basic WebSocket Echo Server

Tạo `src/main.rs`:

```rust
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::{accept_async, tungstenite::Message};
use futures_util::{StreamExt, SinkExt};

async fn handle_connection(stream: TcpStream) {
    let addr = stream.peer_addr().unwrap();
    println!("📥 New connection from: {}", addr);

    let ws_stream = match accept_async(stream).await {
        Ok(ws) => ws,
        Err(e) => {
            eprintln!("❌ WebSocket handshake error: {}", e);
            return;
        }
    };

    println!("✅ WebSocket connection established: {}", addr);

    let (mut write, mut read) = ws_stream.split();

    // Echo back all messages
    while let Some(msg) = read.next().await {
        let msg = match msg {
            Ok(msg) => msg,
            Err(e) => {
                eprintln!("❌ Error receiving message: {}", e);
                break;
            }
        };

        if msg.is_text() || msg.is_binary() {
            println!("📨 Received: {:?}", msg);

            if write.send(msg).await.is_err() {
                eprintln!("❌ Error sending message");
                break;
            }
        } else if msg.is_close() {
            println!("👋 Connection closed: {}", addr);
            break;
        }
    }
}

#[tokio::main]
async fn main() {
    let addr = "127.0.0.1:8080";
    let listener = TcpListener::bind(addr).await.unwrap();

    println!("🚀 WebSocket server running on ws://{}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(handle_connection(stream));
    }
}
```

**Test với HTML client** (`client.html`):

```html
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Echo Test</title>
</head>
<body>
    <h1>WebSocket Echo Client</h1>
    <input id="message" type="text" placeholder="Type a message...">
    <button onclick="send()">Send</button>
    <div id="output"></div>

    <script>
        const ws = new WebSocket('ws://localhost:8080');
        const output = document.getElementById('output');

        ws.onopen = () => {
            output.innerHTML += '<p style="color: green">Connected!</p>';
        };

        ws.onmessage = (event) => {
            output.innerHTML += `<p>Echo: ${event.data}</p>`;
        };

        ws.onerror = (error) => {
            output.innerHTML += `<p style="color: red">Error: ${error}</p>`;
        };

        ws.onclose = () => {
            output.innerHTML += '<p style="color: red">Disconnected</p>';
        };

        function send() {
            const msg = document.getElementById('message').value;
            ws.send(msg);
            document.getElementById('message').value = '';
        }
    </script>
</body>
</html>
```

Chạy:
```bash
cargo run
# Mở client.html trong browser
```

## 📖 Giải Thích Code

### 1. Tokio Async Runtime

```rust
#[tokio::main]
async fn main() {
    // Tokio tự động setup async runtime
    listener.accept().await; // Async operation
}
```

- `#[tokio::main]`: Macro để setup Tokio runtime
- `async/await`: Non-blocking I/O operations
- `tokio::spawn()`: Spawn new async task

### 2. WebSocket Handshake

```rust
let ws_stream = accept_async(stream).await?;
```

- `accept_async()`: Thực hiện WebSocket handshake
- Upgrade từ HTTP sang WebSocket protocol

### 3. Split Stream

```rust
let (mut write, mut read) = ws_stream.split();
```

- Split thành read half và write half
- Cho phép concurrent read và write

## 🎨 Bước 3: Version 2 - Multi-user Chat với Broadcasting

Tạo `src/models.rs`:

```rust
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum ClientMessage {
    Join { username: String },
    Message { content: String },
    Leave,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum ServerMessage {
    Welcome {
        user_id: String,
        message: String,
    },
    UserJoined {
        user_id: String,
        username: String,
    },
    UserLeft {
        user_id: String,
        username: String,
    },
    Message {
        user_id: String,
        username: String,
        content: String,
        timestamp: DateTime<Utc>,
    },
    UserList {
        users: Vec<UserInfo>,
    },
    Error {
        message: String,
    },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfo {
    pub user_id: String,
    pub username: String,
}
```

Tạo `src/server.rs`:

```rust
use std::sync::Arc;
use tokio::sync::{mpsc, RwLock};
use std::collections::HashMap;
use crate::models::{ServerMessage, UserInfo};

pub type Tx = mpsc::UnboundedSender<ServerMessage>;
pub type Rx = mpsc::UnboundedReceiver<ServerMessage>;

#[derive(Clone)]
pub struct User {
    pub id: String,
    pub username: String,
    pub tx: Tx,
}

pub struct ChatServer {
    users: Arc<RwLock<HashMap<String, User>>>,
}

impl ChatServer {
    pub fn new() -> Self {
        ChatServer {
            users: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    pub async fn add_user(&self, user_id: String, username: String, tx: Tx) {
        let user = User {
            id: user_id.clone(),
            username: username.clone(),
            tx,
        };

        self.users.write().await.insert(user_id.clone(), user);

        // Broadcast user joined
        let msg = ServerMessage::UserJoined {
            user_id: user_id.clone(),
            username: username.clone(),
        };
        self.broadcast_message(msg, Some(&user_id)).await;

        // Send user list to new user
        let users_list = self.get_users_list().await;
        let _ = self.send_to_user(&user_id, ServerMessage::UserList { users: users_list }).await;
    }

    pub async fn remove_user(&self, user_id: &str) {
        if let Some(user) = self.users.write().await.remove(user_id) {
            let msg = ServerMessage::UserLeft {
                user_id: user.id.clone(),
                username: user.username.clone(),
            };
            self.broadcast_message(msg, None).await;
        }
    }

    pub async fn broadcast_message(&self, msg: ServerMessage, exclude_user: Option<&str>) {
        let users = self.users.read().await;

        for (user_id, user) in users.iter() {
            if let Some(exclude) = exclude_user {
                if user_id == exclude {
                    continue;
                }
            }

            let _ = user.tx.send(msg.clone());
        }
    }

    pub async fn send_message(&self, from_user_id: &str, content: String) {
        let users = self.users.read().await;

        if let Some(user) = users.get(from_user_id) {
            let msg = ServerMessage::Message {
                user_id: user.id.clone(),
                username: user.username.clone(),
                content,
                timestamp: chrono::Utc::now(),
            };

            drop(users); // Release lock before broadcasting
            self.broadcast_message(msg, None).await;
        }
    }

    pub async fn send_to_user(&self, user_id: &str, msg: ServerMessage) -> Result<(), String> {
        let users = self.users.read().await;

        if let Some(user) = users.get(user_id) {
            user.tx.send(msg).map_err(|e| e.to_string())?;
            Ok(())
        } else {
            Err("User not found".to_string())
        }
    }

    pub async fn get_users_list(&self) -> Vec<UserInfo> {
        let users = self.users.read().await;

        users
            .values()
            .map(|u| UserInfo {
                user_id: u.id.clone(),
                username: u.username.clone(),
            })
            .collect()
    }
}
```

Cập nhật `src/main.rs`:

```rust
mod models;
mod server;

use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::{accept_async, tungstenite::Message};
use futures_util::{StreamExt, SinkExt};
use server::{ChatServer, Tx};
use models::{ClientMessage, ServerMessage};
use std::sync::Arc;

async fn handle_connection(stream: TcpStream, server: Arc<ChatServer>) {
    let addr = stream.peer_addr().unwrap();
    println!("📥 New connection from: {}", addr);

    let ws_stream = match accept_async(stream).await {
        Ok(ws) => ws,
        Err(e) => {
            eprintln!("❌ WebSocket error: {}", e);
            return;
        }
    };

    let (mut ws_sender, mut ws_receiver) = ws_stream.split();
    let (tx, mut rx): (Tx, _) = tokio::sync::mpsc::unbounded_channel();

    let user_id = uuid::Uuid::new_v4().to_string();
    let mut username: Option<String> = None;

    // Send welcome message
    let welcome = ServerMessage::Welcome {
        user_id: user_id.clone(),
        message: "Welcome! Please send a Join message with your username.".to_string(),
    };

    if let Ok(json) = serde_json::to_string(&welcome) {
        let _ = ws_sender.send(Message::Text(json)).await;
    }

    // Spawn task to forward messages from rx to WebSocket
    let mut send_task = tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            if let Ok(json) = serde_json::to_string(&msg) {
                if ws_sender.send(Message::Text(json)).await.is_err() {
                    break;
                }
            }
        }
    });

    // Handle incoming messages
    let server_clone = Arc::clone(&server);
    let user_id_clone = user_id.clone();

    let mut recv_task = tokio::spawn(async move {
        while let Some(Ok(msg)) = ws_receiver.next().await {
            if let Message::Text(text) = msg {
                match serde_json::from_str::<ClientMessage>(&text) {
                    Ok(ClientMessage::Join { username: uname }) => {
                        if username.is_none() {
                            username = Some(uname.clone());
                            server_clone.add_user(user_id_clone.clone(), uname, tx.clone()).await;
                            println!("👤 User joined: {} ({})", username.as_ref().unwrap(), user_id_clone);
                        }
                    },
                    Ok(ClientMessage::Message { content }) => {
                        if username.is_some() {
                            server_clone.send_message(&user_id_clone, content).await;
                        }
                    },
                    Ok(ClientMessage::Leave) => {
                        break;
                    },
                    Err(e) => {
                        eprintln!("❌ Invalid message format: {}", e);
                    }
                }
            } else if msg.is_close() {
                break;
            }
        }

        user_id_clone
    });

    // Wait for either task to finish
    tokio::select! {
        user_id = &mut recv_task => {
            send_task.abort();
            if let Ok(uid) = user_id {
                server.remove_user(&uid).await;
                println!("👋 User left: {}", uid);
            }
        }
        _ = &mut send_task => {
            recv_task.abort();
        }
    }
}

#[tokio::main]
async fn main() {
    let addr = "127.0.0.1:8080";
    let listener = TcpListener::bind(addr).await.unwrap();
    let server = Arc::new(ChatServer::new());

    println!("🚀 Chat server running on ws://{}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        let server_clone = Arc::clone(&server);
        tokio::spawn(handle_connection(stream, server_clone));
    }
}
```

**Advanced HTML Client** (`chat_client.html`):

```html
<!DOCTYPE html>
<html>
<head>
    <title>Rust Chat</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; }
        #messages { height: 400px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
        .message { margin: 5px 0; padding: 5px; border-radius: 3px; }
        .system { background: #f0f0f0; color: #666; }
        .user { background: #e3f2fd; }
        .me { background: #c8e6c9; text-align: right; }
        #userList { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
        input { width: 70%; padding: 10px; }
        button { padding: 10px 20px; }
    </style>
</head>
<body>
    <h1>💬 Rust Chat Room</h1>

    <div>
        <input id="username" type="text" placeholder="Enter username...">
        <button onclick="join()">Join</button>
        <button onclick="leave()" id="leaveBtn" disabled>Leave</button>
    </div>

    <div id="userList">
        <h3>👥 Online Users</h3>
        <div id="users"></div>
    </div>

    <div id="messages"></div>

    <div>
        <input id="messageInput" type="text" placeholder="Type a message..." disabled>
        <button onclick="sendMessage()" id="sendBtn" disabled>Send</button>
    </div>

    <script>
        let ws = null;
        let myUserId = null;

        function connect() {
            ws = new WebSocket('ws://localhost:8080');

            ws.onopen = () => {
                addMessage('Connected to server', 'system');
            };

            ws.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                handleMessage(msg);
            };

            ws.onerror = (error) => {
                addMessage('Error: ' + error, 'system');
            };

            ws.onclose = () => {
                addMessage('Disconnected from server', 'system');
                document.getElementById('messageInput').disabled = true;
                document.getElementById('sendBtn').disabled = true;
            };
        }

        function handleMessage(msg) {
            switch(msg.type) {
                case 'Welcome':
                    myUserId = msg.user_id;
                    addMessage(msg.message, 'system');
                    break;

                case 'UserJoined':
                    addMessage(`${msg.username} joined the chat`, 'system');
                    break;

                case 'UserLeft':
                    addMessage(`${msg.username} left the chat`, 'system');
                    break;

                case 'Message':
                    const isMe = msg.user_id === myUserId;
                    const className = isMe ? 'me' : 'user';
                    addMessage(`${msg.username}: ${msg.content}`, className);
                    break;

                case 'UserList':
                    updateUserList(msg.users);
                    break;

                case 'Error':
                    addMessage(`Error: ${msg.message}`, 'system');
                    break;
            }
        }

        function addMessage(text, className) {
            const div = document.createElement('div');
            div.className = 'message ' + className;
            div.textContent = text;
            document.getElementById('messages').appendChild(div);
            div.scrollIntoView();
        }

        function updateUserList(users) {
            const userDiv = document.getElementById('users');
            userDiv.innerHTML = users.map(u => `<div>${u.username}</div>`).join('');
        }

        function join() {
            const username = document.getElementById('username').value.trim();
            if (!username) {
                alert('Please enter a username');
                return;
            }

            if (!ws) {
                connect();
            }

            setTimeout(() => {
                ws.send(JSON.stringify({
                    type: 'Join',
                    username: username
                }));

                document.getElementById('messageInput').disabled = false;
                document.getElementById('sendBtn').disabled = false;
                document.getElementById('leaveBtn').disabled = false;
                document.getElementById('username').disabled = true;
            }, 500);
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();

            if (message && ws) {
                ws.send(JSON.stringify({
                    type: 'Message',
                    content: message
                }));
                input.value = '';
            }
        }

        function leave() {
            if (ws) {
                ws.send(JSON.stringify({ type: 'Leave' }));
                ws.close();
                ws = null;
            }
        }

        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    </script>
</body>
</html>
```

## 🎨 Bước 4: Version 3 - Multiple Rooms và Private Messages

Tạo `src/room.rs`:

```rust
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use crate::models::{ServerMessage, UserInfo};
use crate::server::User;

pub struct Room {
    pub id: String,
    pub name: String,
    pub users: HashMap<String, User>,
    pub message_history: Vec<ServerMessage>,
}

impl Room {
    pub fn new(id: String, name: String) -> Self {
        Room {
            id,
            name,
            users: HashMap::new(),
            message_history: Vec::new(),
        }
    }

    pub fn add_user(&mut self, user: User) {
        self.users.insert(user.id.clone(), user);
    }

    pub fn remove_user(&mut self, user_id: &str) -> Option<User> {
        self.users.remove(user_id)
    }

    pub fn broadcast(&self, msg: ServerMessage, exclude_user: Option<&str>) {
        for (user_id, user) in &self.users {
            if let Some(exclude) = exclude_user {
                if user_id == exclude {
                    continue;
                }
            }
            let _ = user.tx.send(msg.clone());
        }
    }

    pub fn add_to_history(&mut self, msg: ServerMessage) {
        // Keep only last 100 messages
        if self.message_history.len() >= 100 {
            self.message_history.remove(0);
        }
        self.message_history.push(msg);
    }

    pub fn get_users_list(&self) -> Vec<UserInfo> {
        self.users
            .values()
            .map(|u| UserInfo {
                user_id: u.id.clone(),
                username: u.username.clone(),
            })
            .collect()
    }
}

pub struct RoomManager {
    rooms: Arc<RwLock<HashMap<String, Room>>>,
}

impl RoomManager {
    pub fn new() -> Self {
        let mut rooms = HashMap::new();

        // Create default room
        let default_room = Room::new("general".to_string(), "General".to_string());
        rooms.insert("general".to_string(), default_room);

        RoomManager {
            rooms: Arc::new(RwLock::new(rooms)),
        }
    }

    pub async fn create_room(&self, room_id: String, name: String) -> Result<(), String> {
        let mut rooms = self.rooms.write().await;

        if rooms.contains_key(&room_id) {
            return Err("Room already exists".to_string());
        }

        rooms.insert(room_id.clone(), Room::new(room_id, name));
        Ok(())
    }

    pub async fn join_room(&self, room_id: &str, user: User) -> Result<Vec<ServerMessage>, String> {
        let mut rooms = self.rooms.write().await;

        let room = rooms
            .get_mut(room_id)
            .ok_or_else(|| "Room not found".to_string())?;

        // Broadcast join message
        let join_msg = ServerMessage::UserJoined {
            user_id: user.id.clone(),
            username: user.username.clone(),
        };
        room.broadcast(join_msg.clone(), Some(&user.id));

        room.add_user(user);

        // Return message history
        Ok(room.message_history.clone())
    }

    pub async fn leave_room(&self, room_id: &str, user_id: &str) -> Result<(), String> {
        let mut rooms = self.rooms.write().await;

        let room = rooms
            .get_mut(room_id)
            .ok_or_else(|| "Room not found".to_string())?;

        if let Some(user) = room.remove_user(user_id) {
            let leave_msg = ServerMessage::UserLeft {
                user_id: user.id.clone(),
                username: user.username.clone(),
            };
            room.broadcast(leave_msg, None);
        }

        Ok(())
    }

    pub async fn send_message(&self, room_id: &str, user_id: &str, content: String) -> Result<(), String> {
        let mut rooms = self.rooms.write().await;

        let room = rooms
            .get_mut(room_id)
            .ok_or_else(|| "Room not found".to_string())?;

        let user = room
            .users
            .get(user_id)
            .ok_or_else(|| "User not in room".to_string())?;

        let msg = ServerMessage::Message {
            user_id: user.id.clone(),
            username: user.username.clone(),
            content,
            timestamp: chrono::Utc::now(),
        };

        room.add_to_history(msg.clone());
        room.broadcast(msg, None);

        Ok(())
    }

    pub async fn get_room_list(&self) -> Vec<(String, String, usize)> {
        let rooms = self.rooms.read().await;

        rooms
            .values()
            .map(|r| (r.id.clone(), r.name.clone(), r.users.len()))
            .collect()
    }
}
```

Cập nhật `src/models.rs` với room messages:

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum ClientMessage {
    Join { username: String },
    JoinRoom { room_id: String },
    LeaveRoom { room_id: String },
    Message { room_id: String, content: String },
    PrivateMessage { to_user_id: String, content: String },
    ListRooms,
    Leave,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum ServerMessage {
    Welcome {
        user_id: String,
        message: String,
    },
    RoomJoined {
        room_id: String,
        room_name: String,
        history: Vec<ServerMessage>,
    },
    UserJoined {
        user_id: String,
        username: String,
    },
    UserLeft {
        user_id: String,
        username: String,
    },
    Message {
        user_id: String,
        username: String,
        content: String,
        timestamp: DateTime<Utc>,
    },
    PrivateMessage {
        from_user_id: String,
        from_username: String,
        content: String,
        timestamp: DateTime<Utc>,
    },
    RoomList {
        rooms: Vec<RoomInfo>,
    },
    UserList {
        users: Vec<UserInfo>,
    },
    Error {
        message: String,
    },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RoomInfo {
    pub room_id: String,
    pub name: String,
    pub user_count: usize,
}
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Deadlock với RwLock

```rust
// ❌ Giữ lock quá lâu
let rooms = self.rooms.write().await;
// Long operation...
rooms.get_mut(room_id); // Still holding lock!

// ✅ Release lock sớm
{
    let mut rooms = self.rooms.write().await;
    rooms.get_mut(room_id);
} // Lock released here
```

### Lỗi 2: Channel Closed

```rust
// ❌ Không check kết quả send
tx.send(msg).unwrap(); // Panic nếu receiver dropped!

// ✅ Handle error gracefully
if tx.send(msg).is_err() {
    // User disconnected, cleanup
}
```

### Lỗi 3: Memory Leak với History

```rust
// ❌ Unlimited history
room.message_history.push(msg);

// ✅ Limit history size
if room.message_history.len() >= 100 {
    room.message_history.remove(0);
}
room.message_history.push(msg);
```

### Lỗi 4: Race Condition

```rust
// ❌ Check-then-act race condition
if !users.contains_key(&user_id) {
    // Another task có thể insert ở đây!
    users.insert(user_id, user);
}

// ✅ Atomic operation
users.entry(user_id).or_insert(user);
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Typing Indicators

Show khi users đang typing:

```rust
#[derive(Serialize)]
pub enum ServerMessage {
    TypingStart { user_id: String, username: String },
    TypingStop { user_id: String },
    // ...
}
```

### Thử Thách 2: File Sharing

Implement binary file transfer qua WebSocket:

```rust
pub enum ClientMessage {
    UploadFile {
        filename: String,
        content_type: String,
        data: Vec<u8>,
    },
}
```

### Thử Thách 3: Message Reactions

Cho phép users react to messages với emoji.

### Thử Thách 4: Persistent Storage

Lưu message history vào database (SQLite, PostgreSQL).

### Thử Thách 5: Authentication và Authorization

```rust
pub struct User {
    pub id: String,
    pub username: String,
    pub role: UserRole,
    pub tx: Tx,
}

pub enum UserRole {
    Admin,
    Moderator,
    User,
}
```

## 📚 Kiến Thức Đã Học

✅ **WebSocket Protocol**: Real-time bidirectional communication
✅ **Tokio Async Runtime**: Efficient async I/O handling
✅ **Channels**: Message passing giữa tasks (`mpsc`, `broadcast`)
✅ **Concurrent Data Structures**: Arc, RwLock, Mutex
✅ **Actor Pattern**: Isolated state với message passing
✅ **Broadcasting**: Sending messages to multiple clients
✅ **Error Handling**: Graceful error handling trong async code
✅ **State Management**: Shared mutable state trong concurrent context

## 🔒 Security Best Practices

1. **Input Validation**: Validate username length, message content
2. **Rate Limiting**: Prevent message spam
3. **Authentication**: Verify user identity before allowing chat
4. **XSS Prevention**: Sanitize message content
5. **Message Size Limits**: Prevent DoS với large messages
6. **Connection Limits**: Limit concurrent connections per IP

## ⚡ Performance Optimization

1. **Connection Pooling**: Reuse connections khi có thể
2. **Message Batching**: Batch multiple messages
3. **Compression**: Enable WebSocket compression
4. **Backpressure**: Handle slow clients properly
5. **Memory Management**: Limit history size, cleanup old data

## 🧪 Testing

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_room_creation() {
        let manager = RoomManager::new();
        let result = manager.create_room("test".to_string(), "Test Room".to_string()).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_broadcast_message() {
        let room = Room::new("test".to_string(), "Test".to_string());
        // Test broadcasting...
    }
}
```

## 🚀 Deployment

```dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/target/release/chat_app /usr/local/bin/
EXPOSE 8080
CMD ["chat_app"]
```

```bash
# Build and run
docker build -t chat-app .
docker run -p 8080:8080 chat-app
```

## 🎯 Bước Tiếp Theo

➡️ **Tiếp theo**: [Professional CLI Tool](cli-tool.md)
➡️ **Quay lại**: [REST API với Actix-Web](rest-api.md)
➡️ **Hoặc**: [Multi-threaded Web Server](web-server.md)

---

🎉 **Xuất sắc! Bạn đã xây dựng real-time chat application!** 💬

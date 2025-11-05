---
sidebar_position: 10
title: 🔌 REST API với Actix-Web
description: Xây dựng production-ready REST API với Rust - Actix-web framework, JSON, database, validation, middleware
keywords: [rust, project, rest api, actix-web, axum, web framework, json, database, advanced, backend]
---

# 🔌 REST API với Actix-Web

## 🎯 Mục Tiêu Dự Án

Xây dựng một **REST API hoàn chỉnh** cho blog system với các tính năng:
- 📝 CRUD operations cho blog posts
- 🗄️ Database persistence (SQLite)
- ✅ Input validation
- 🔐 Authentication middleware
- ❌ Error handling và custom error types
- 🧪 Unit tests và integration tests
- 📊 Logging và monitoring
- 🚀 Production-ready patterns

### Bạn Sẽ Học Được
- ✅ **Web framework** Actix-web hoặc Axum
- ✅ **JSON serialization** với Serde
- ✅ **Database** operations với SQLx
- ✅ **Middleware** pattern
- ✅ **Error handling** strategies
- ✅ **Validation** với validator crate
- ✅ **Testing** REST APIs
- ✅ **API versioning** và documentation

## 📦 Bước 1: Setup Project

```bash
cargo new blog_api
cd blog_api
```

Thêm dependencies vào `Cargo.toml`:

```toml
[dependencies]
actix-web = "4"
actix-rt = "2"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio-native-tls", "sqlite"] }
tokio = { version = "1", features = ["full"] }
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1.0", features = ["v4", "serde"] }
validator = { version = "0.16", features = ["derive"] }
env_logger = "0.10"
log = "0.4"
dotenv = "0.15"

[dev-dependencies]
actix-web-test = "0.1"
```

## 🎮 Bước 2: Version 1 - Basic REST API với In-Memory Storage

Tạo `src/models.rs`:

```rust
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Post {
    pub id: String,
    pub title: String,
    pub content: String,
    pub author: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreatePost {
    pub title: String,
    pub content: String,
    pub author: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdatePost {
    pub title: Option<String>,
    pub content: Option<String>,
}

impl Post {
    pub fn new(title: String, content: String, author: String) -> Self {
        let now = Utc::now();
        Post {
            id: uuid::Uuid::new_v4().to_string(),
            title,
            content,
            author,
            created_at: now,
            updated_at: now,
        }
    }

    pub fn update(&mut self, update: UpdatePost) {
        if let Some(title) = update.title {
            self.title = title;
        }
        if let Some(content) = update.content {
            self.content = content;
        }
        self.updated_at = Utc::now();
    }
}
```

Tạo `src/handlers.rs`:

```rust
use actix_web::{web, HttpResponse, Responder};
use std::sync::Mutex;
use crate::models::{Post, CreatePost, UpdatePost};

pub struct AppState {
    pub posts: Mutex<Vec<Post>>,
}

// GET /posts - Lấy tất cả posts
pub async fn get_posts(data: web::Data<AppState>) -> impl Responder {
    let posts = data.posts.lock().unwrap();
    HttpResponse::Ok().json(&*posts)
}

// GET /posts/{id} - Lấy một post theo ID
pub async fn get_post(
    data: web::Data<AppState>,
    path: web::Path<String>,
) -> impl Responder {
    let posts = data.posts.lock().unwrap();
    let post_id = path.into_inner();

    match posts.iter().find(|p| p.id == post_id) {
        Some(post) => HttpResponse::Ok().json(post),
        None => HttpResponse::NotFound().json(serde_json::json!({
            "error": "Post not found"
        })),
    }
}

// POST /posts - Tạo post mới
pub async fn create_post(
    data: web::Data<AppState>,
    post_data: web::Json<CreatePost>,
) -> impl Responder {
    let new_post = Post::new(
        post_data.title.clone(),
        post_data.content.clone(),
        post_data.author.clone(),
    );

    let mut posts = data.posts.lock().unwrap();
    posts.push(new_post.clone());

    HttpResponse::Created().json(new_post)
}

// PUT /posts/{id} - Cập nhật post
pub async fn update_post(
    data: web::Data<AppState>,
    path: web::Path<String>,
    update_data: web::Json<UpdatePost>,
) -> impl Responder {
    let mut posts = data.posts.lock().unwrap();
    let post_id = path.into_inner();

    match posts.iter_mut().find(|p| p.id == post_id) {
        Some(post) => {
            post.update(update_data.into_inner());
            HttpResponse::Ok().json(post)
        },
        None => HttpResponse::NotFound().json(serde_json::json!({
            "error": "Post not found"
        })),
    }
}

// DELETE /posts/{id} - Xóa post
pub async fn delete_post(
    data: web::Data<AppState>,
    path: web::Path<String>,
) -> impl Responder {
    let mut posts = data.posts.lock().unwrap();
    let post_id = path.into_inner();

    let initial_len = posts.len();
    posts.retain(|p| p.id != post_id);

    if posts.len() < initial_len {
        HttpResponse::NoContent().finish()
    } else {
        HttpResponse::NotFound().json(serde_json::json!({
            "error": "Post not found"
        }))
    }
}
```

Tạo `src/main.rs`:

```rust
mod models;
mod handlers;

use actix_web::{web, App, HttpServer};
use handlers::AppState;
use std::sync::Mutex;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let app_state = web::Data::new(AppState {
        posts: Mutex::new(Vec::new()),
    });

    println!("🚀 Server starting at http://127.0.0.1:8080");

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .route("/posts", web::get().to(handlers::get_posts))
            .route("/posts", web::post().to(handlers::create_post))
            .route("/posts/{id}", web::get().to(handlers::get_post))
            .route("/posts/{id}", web::put().to(handlers::update_post))
            .route("/posts/{id}", web::delete().to(handlers::delete_post))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

**Chạy thử:**

```bash
# Chạy server
RUST_LOG=info cargo run

# Test với curl:
# Tạo post mới
curl -X POST http://localhost:8080/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "First Post",
    "content": "Hello from Rust API!",
    "author": "Rust Developer"
  }'

# Lấy tất cả posts
curl http://localhost:8080/posts

# Lấy một post
curl http://localhost:8080/posts/{id}

# Cập nhật post
curl -X PUT http://localhost:8080/posts/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'

# Xóa post
curl -X DELETE http://localhost:8080/posts/{id}
```

## 📖 Giải Thích Code

### 1. Actix-Web Framework

```rust
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/posts", web::get().to(handler))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

- `#[actix_web::main]`: Macro để setup async runtime
- `HttpServer`: HTTP server implementation
- `App`: Application instance với routes và middleware
- Routing: `web::get()`, `web::post()`, etc.

### 2. Shared State

```rust
pub struct AppState {
    pub posts: Mutex<Vec<Post>>,
}

let app_state = web::Data::new(AppState { /* ... */ });
```

- `web::Data`: Thread-safe reference-counted pointer
- `Mutex`: Cho phép mutable access từ nhiều threads
- State được share giữa tất cả request handlers

### 3. JSON Handling

```rust
pub async fn create_post(
    post_data: web::Json<CreatePost>,
) -> impl Responder {
    // post_data tự động deserialize từ JSON
    let new_post = Post::new(/* ... */);
    HttpResponse::Created().json(new_post) // Auto serialize
}
```

- `web::Json<T>`: Extractor cho JSON request body
- `.json()`: Serialize response thành JSON

## 🎨 Bước 3: Version 2 - SQLite Database với SQLx

Tạo database schema `migrations/001_init.sql`:

```sql
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_author ON posts(author);
```

Tạo `.env`:

```env
DATABASE_URL=sqlite:./blog.db
RUST_LOG=info
```

Cập nhật `src/db.rs`:

```rust
use sqlx::{SqlitePool, Row};
use crate::models::{Post, CreatePost, UpdatePost};

pub async fn init_db(database_url: &str) -> Result<SqlitePool, sqlx::Error> {
    let pool = SqlitePool::connect(database_url).await?;

    // Create table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        "#
    )
    .execute(&pool)
    .await?;

    Ok(pool)
}

pub async fn get_all_posts(pool: &SqlitePool) -> Result<Vec<Post>, sqlx::Error> {
    let posts = sqlx::query_as::<_, Post>(
        "SELECT id, title, content, author, created_at, updated_at FROM posts ORDER BY created_at DESC"
    )
    .fetch_all(pool)
    .await?;

    Ok(posts)
}

pub async fn get_post_by_id(pool: &SqlitePool, id: &str) -> Result<Option<Post>, sqlx::Error> {
    let post = sqlx::query_as::<_, Post>(
        "SELECT id, title, content, author, created_at, updated_at FROM posts WHERE id = ?"
    )
    .bind(id)
    .fetch_optional(pool)
    .await?;

    Ok(post)
}

pub async fn create_post(pool: &SqlitePool, post: &Post) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO posts (id, title, content, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(&post.id)
    .bind(&post.title)
    .bind(&post.content)
    .bind(&post.author)
    .bind(&post.created_at.to_rfc3339())
    .bind(&post.updated_at.to_rfc3339())
    .execute(pool)
    .await?;

    Ok(())
}

pub async fn update_post(pool: &SqlitePool, id: &str, update: UpdatePost) -> Result<bool, sqlx::Error> {
    let mut query_parts = vec!["UPDATE posts SET"];
    let mut params: Vec<String> = vec![];

    if let Some(title) = &update.title {
        params.push(format!("title = '{}'", title));
    }
    if let Some(content) = &update.content {
        params.push(format!("content = '{}'", content));
    }

    if params.is_empty() {
        return Ok(false);
    }

    params.push(format!("updated_at = '{}'", chrono::Utc::now().to_rfc3339()));

    let query = format!(
        "{} {} WHERE id = ?",
        query_parts.join(" "),
        params.join(", ")
    );

    let result = sqlx::query(&query)
        .bind(id)
        .execute(pool)
        .await?;

    Ok(result.rows_affected() > 0)
}

pub async fn delete_post(pool: &SqlitePool, id: &str) -> Result<bool, sqlx::Error> {
    let result = sqlx::query("DELETE FROM posts WHERE id = ?")
        .bind(id)
        .execute(pool)
        .await?;

    Ok(result.rows_affected() > 0)
}
```

Cập nhật `src/models.rs`:

```rust
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Post {
    pub id: String,
    pub title: String,
    pub content: String,
    pub author: String,
    #[sqlx(try_from = "String")]
    pub created_at: DateTime<Utc>,
    #[sqlx(try_from = "String")]
    pub updated_at: DateTime<Utc>,
}

// Implement conversion từ String (SQLite) sang DateTime
impl sqlx::Type<sqlx::Sqlite> for DateTime<Utc> {
    fn type_info() -> <sqlx::Sqlite as sqlx::Database>::TypeInfo {
        <String as sqlx::Type<sqlx::Sqlite>>::type_info()
    }
}

impl<'r> sqlx::Decode<'r, sqlx::Sqlite> for DateTime<Utc> {
    fn decode(
        value: <sqlx::Sqlite as sqlx::database::HasValueRef<'r>>::ValueRef,
    ) -> Result<Self, Box<dyn std::error::Error + 'static + Send + Sync>> {
        let s = <String as sqlx::Decode<sqlx::Sqlite>>::decode(value)?;
        Ok(DateTime::parse_from_rfc3339(&s)?.with_timezone(&Utc))
    }
}

// Rest of the models remain the same...
```

Cập nhật `src/handlers.rs`:

```rust
use actix_web::{web, HttpResponse, Responder};
use sqlx::SqlitePool;
use crate::models::{Post, CreatePost, UpdatePost};
use crate::db;

pub async fn get_posts(pool: web::Data<SqlitePool>) -> impl Responder {
    match db::get_all_posts(&pool).await {
        Ok(posts) => HttpResponse::Ok().json(posts),
        Err(e) => {
            log::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch posts"
            }))
        }
    }
}

pub async fn get_post(
    pool: web::Data<SqlitePool>,
    path: web::Path<String>,
) -> impl Responder {
    let post_id = path.into_inner();

    match db::get_post_by_id(&pool, &post_id).await {
        Ok(Some(post)) => HttpResponse::Ok().json(post),
        Ok(None) => HttpResponse::NotFound().json(serde_json::json!({
            "error": "Post not found"
        })),
        Err(e) => {
            log::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch post"
            }))
        }
    }
}

pub async fn create_post(
    pool: web::Data<SqlitePool>,
    post_data: web::Json<CreatePost>,
) -> impl Responder {
    let new_post = Post::new(
        post_data.title.clone(),
        post_data.content.clone(),
        post_data.author.clone(),
    );

    match db::create_post(&pool, &new_post).await {
        Ok(_) => HttpResponse::Created().json(new_post),
        Err(e) => {
            log::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to create post"
            }))
        }
    }
}

pub async fn update_post(
    pool: web::Data<SqlitePool>,
    path: web::Path<String>,
    update_data: web::Json<UpdatePost>,
) -> impl Responder {
    let post_id = path.into_inner();

    match db::update_post(&pool, &post_id, update_data.into_inner()).await {
        Ok(true) => {
            // Fetch updated post
            match db::get_post_by_id(&pool, &post_id).await {
                Ok(Some(post)) => HttpResponse::Ok().json(post),
                _ => HttpResponse::InternalServerError().finish(),
            }
        },
        Ok(false) => HttpResponse::NotFound().json(serde_json::json!({
            "error": "Post not found"
        })),
        Err(e) => {
            log::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to update post"
            }))
        }
    }
}

pub async fn delete_post(
    pool: web::Data<SqlitePool>,
    path: web::Path<String>,
) -> impl Responder {
    let post_id = path.into_inner();

    match db::delete_post(&pool, &post_id).await {
        Ok(true) => HttpResponse::NoContent().finish(),
        Ok(false) => HttpResponse::NotFound().json(serde_json::json!({
            "error": "Post not found"
        })),
        Err(e) => {
            log::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to delete post"
            }))
        }
    }
}
```

Cập nhật `src/main.rs`:

```rust
mod models;
mod handlers;
mod db;

use actix_web::{web, App, HttpServer, middleware};
use dotenv::dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "sqlite:./blog.db".to_string());

    let pool = db::init_db(&database_url)
        .await
        .expect("Failed to initialize database");

    println!("🚀 Server starting at http://127.0.0.1:8080");
    println!("📊 Connected to database: {}", database_url);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            .service(
                web::scope("/api/v1")
                    .route("/posts", web::get().to(handlers::get_posts))
                    .route("/posts", web::post().to(handlers::create_post))
                    .route("/posts/{id}", web::get().to(handlers::get_post))
                    .route("/posts/{id}", web::put().to(handlers::update_post))
                    .route("/posts/{id}", web::delete().to(handlers::delete_post))
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

## 🎨 Bước 4: Version 3 - Validation và Custom Error Handling

Tạo `src/errors.rs`:

```rust
use actix_web::{error::ResponseError, http::StatusCode, HttpResponse};
use std::fmt;

#[derive(Debug)]
pub enum ApiError {
    NotFound(String),
    BadRequest(String),
    InternalServerError(String),
    DatabaseError(String),
}

impl fmt::Display for ApiError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ApiError::NotFound(msg) => write!(f, "Not Found: {}", msg),
            ApiError::BadRequest(msg) => write!(f, "Bad Request: {}", msg),
            ApiError::InternalServerError(msg) => write!(f, "Internal Server Error: {}", msg),
            ApiError::DatabaseError(msg) => write!(f, "Database Error: {}", msg),
        }
    }
}

impl ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ApiError::NotFound(msg) => HttpResponse::NotFound().json(serde_json::json!({
                "error": "not_found",
                "message": msg
            })),
            ApiError::BadRequest(msg) => HttpResponse::BadRequest().json(serde_json::json!({
                "error": "bad_request",
                "message": msg
            })),
            ApiError::InternalServerError(msg) => HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "internal_server_error",
                "message": msg
            })),
            ApiError::DatabaseError(msg) => HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "database_error",
                "message": msg
            })),
        }
    }

    fn status_code(&self) -> StatusCode {
        match self {
            ApiError::NotFound(_) => StatusCode::NOT_FOUND,
            ApiError::BadRequest(_) => StatusCode::BAD_REQUEST,
            ApiError::InternalServerError(_) | ApiError::DatabaseError(_) => {
                StatusCode::INTERNAL_SERVER_ERROR
            }
        }
    }
}

impl From<sqlx::Error> for ApiError {
    fn from(error: sqlx::Error) -> Self {
        ApiError::DatabaseError(error.to_string())
    }
}
```

Cập nhật `src/models.rs` với validation:

```rust
use validator::Validate;

#[derive(Debug, Deserialize, Validate)]
pub struct CreatePost {
    #[validate(length(min = 1, max = 200, message = "Title must be between 1 and 200 characters"))]
    pub title: String,

    #[validate(length(min = 1, max = 10000, message = "Content must be between 1 and 10000 characters"))]
    pub content: String,

    #[validate(length(min = 1, max = 100, message = "Author must be between 1 and 100 characters"))]
    pub author: String,
}

#[derive(Debug, Deserialize, Validate)]
pub struct UpdatePost {
    #[validate(length(min = 1, max = 200, message = "Title must be between 1 and 200 characters"))]
    pub title: Option<String>,

    #[validate(length(min = 1, max = 10000, message = "Content must be between 1 and 10000 characters"))]
    pub content: Option<String>,
}
```

Cập nhật handlers với validation:

```rust
use validator::Validate;
use crate::errors::ApiError;

pub async fn create_post(
    pool: web::Data<SqlitePool>,
    post_data: web::Json<CreatePost>,
) -> Result<HttpResponse, ApiError> {
    // Validate input
    post_data.validate()
        .map_err(|e| ApiError::BadRequest(e.to_string()))?;

    let new_post = Post::new(
        post_data.title.clone(),
        post_data.content.clone(),
        post_data.author.clone(),
    );

    db::create_post(&pool, &new_post).await?;

    Ok(HttpResponse::Created().json(new_post))
}
```

## 🎨 Bước 5: Version 4 - Middleware và Authentication

Tạo `src/middleware.rs`:

```rust
use actix_web::{
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    Error, HttpMessage,
};
use futures_util::future::LocalBoxFuture;
use std::future::{ready, Ready};

// Simple API Key authentication middleware
pub struct ApiKeyAuth;

impl<S, B> Transform<S, ServiceRequest> for ApiKeyAuth
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = ApiKeyAuthMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(ApiKeyAuthMiddleware { service }))
    }
}

pub struct ApiKeyAuthMiddleware<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for ApiKeyAuthMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let api_key = req
            .headers()
            .get("X-API-Key")
            .and_then(|v| v.to_str().ok());

        // Simple validation - in production, check against database
        let is_valid = api_key == Some("secret-api-key-123");

        if !is_valid {
            return Box::pin(async move {
                Err(actix_web::error::ErrorUnauthorized("Invalid API key"))
            });
        }

        let fut = self.service.call(req);
        Box::pin(async move {
            let res = fut.await?;
            Ok(res)
        })
    }
}

// Request ID middleware
pub struct RequestId;

impl<S, B> Transform<S, ServiceRequest> for RequestId
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = RequestIdMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(RequestIdMiddleware { service }))
    }
}

pub struct RequestIdMiddleware<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for RequestIdMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let request_id = uuid::Uuid::new_v4().to_string();
        req.extensions_mut().insert(request_id.clone());

        log::info!("Request {} - {} {}", request_id, req.method(), req.path());

        let fut = self.service.call(req);
        Box::pin(async move {
            let mut res = fut.await?;
            res.headers_mut().insert(
                actix_web::http::header::HeaderName::from_static("x-request-id"),
                actix_web::http::header::HeaderValue::from_str(&request_id).unwrap(),
            );
            Ok(res)
        })
    }
}
```

## 🧪 Testing

Tạo `tests/integration_tests.rs`:

```rust
use actix_web::{test, web, App};
use blog_api::{handlers, models::CreatePost};
use sqlx::SqlitePool;

#[actix_web::test]
async fn test_create_and_get_post() {
    let pool = SqlitePool::connect(":memory:").await.unwrap();

    // Initialize database
    blog_api::db::init_db(":memory:").await.unwrap();

    let app = test::init_service(
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .route("/posts", web::post().to(handlers::create_post))
            .route("/posts", web::get().to(handlers::get_posts))
    ).await;

    // Create post
    let create_req = test::TestRequest::post()
        .uri("/posts")
        .set_json(&CreatePost {
            title: "Test Post".to_string(),
            content: "Test Content".to_string(),
            author: "Test Author".to_string(),
        })
        .to_request();

    let create_resp = test::call_service(&app, create_req).await;
    assert!(create_resp.status().is_success());

    // Get posts
    let get_req = test::TestRequest::get()
        .uri("/posts")
        .to_request();

    let get_resp = test::call_service(&app, get_req).await;
    assert!(get_resp.status().is_success());
}

#[actix_web::test]
async fn test_validation_error() {
    let pool = SqlitePool::connect(":memory:").await.unwrap();

    let app = test::init_service(
        App::new()
            .app_data(web::Data::new(pool))
            .route("/posts", web::post().to(handlers::create_post))
    ).await;

    // Create post with empty title (should fail validation)
    let create_req = test::TestRequest::post()
        .uri("/posts")
        .set_json(&CreatePost {
            title: "".to_string(),
            content: "Test".to_string(),
            author: "Test".to_string(),
        })
        .to_request();

    let resp = test::call_service(&app, create_req).await;
    assert_eq!(resp.status(), 400); // Bad Request
}
```

Chạy tests:

```bash
cargo test
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Database Connection Pool Exhausted

```rust
// ❌ Không release connection
let mut conn = pool.acquire().await?;
// Long-running operation...

// ✅ Sử dụng transaction hoặc scope
{
    let mut conn = pool.acquire().await?;
    // Operation here
} // Connection auto-released
```

### Lỗi 2: JSON Deserialization Fails

```rust
// ❌ Missing field in JSON
{"title": "Test"} // Missing content and author

// ✅ Use Option for optional fields hoặc provide all required fields
#[derive(Deserialize)]
struct CreatePost {
    title: String,
    content: Option<String>, // Optional
}
```

### Lỗi 3: SQL Injection

```rust
// ❌ String interpolation in SQL
let query = format!("SELECT * FROM posts WHERE id = '{}'", user_input);

// ✅ Use parameterized queries
sqlx::query("SELECT * FROM posts WHERE id = ?")
    .bind(user_input)
    .fetch_all(&pool)
    .await?;
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Pagination

Implement cursor-based hoặc offset-based pagination:

```rust
#[derive(Deserialize)]
pub struct PaginationParams {
    page: Option<u32>,
    per_page: Option<u32>,
}

pub async fn get_posts_paginated(
    pool: web::Data<SqlitePool>,
    query: web::Query<PaginationParams>,
) -> Result<HttpResponse, ApiError> {
    let page = query.page.unwrap_or(1);
    let per_page = query.per_page.unwrap_or(10).min(100);
    let offset = (page - 1) * per_page;

    // Implementation...
}
```

### Thử Thách 2: Full-Text Search

Implement search với SQLite FTS5 hoặc external search engine.

### Thử Thách 3: Rate Limiting

```rust
use actix_governor::{Governor, GovernorConfigBuilder};

let governor_conf = GovernorConfigBuilder::default()
    .per_second(2)
    .burst_size(5)
    .finish()
    .unwrap();

App::new()
    .wrap(Governor::new(&governor_conf))
```

### Thử Thách 4: API Documentation

Sử dụng `utoipa` để generate OpenAPI/Swagger docs:

```rust
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(get_posts, create_post),
    components(schemas(Post, CreatePost))
)]
struct ApiDoc;
```

### Thử Thách 5: Caching

Implement Redis caching cho frequently accessed data.

## 📚 Kiến Thức Đã Học

✅ **Web Framework**: Actix-web với routing, middleware
✅ **Database**: SQLx với async queries và migrations
✅ **Validation**: Input validation với validator crate
✅ **Error Handling**: Custom error types và ResponseError trait
✅ **Testing**: Integration tests cho REST APIs
✅ **Authentication**: Middleware pattern cho auth
✅ **Logging**: Structured logging với env_logger
✅ **API Design**: RESTful principles, status codes

## 🔒 Security Best Practices

1. **Input Validation**: Validate all user input
2. **SQL Injection**: Always use parameterized queries
3. **Authentication**: Implement proper auth (JWT, API keys)
4. **Rate Limiting**: Prevent abuse
5. **HTTPS**: Use TLS in production
6. **CORS**: Configure properly cho browser clients
7. **Secrets**: Never commit secrets to git, use env vars

## ⚡ Performance Optimization

1. **Connection Pooling**: Configure pool size appropriately
2. **Indexing**: Add database indexes cho frequently queried fields
3. **Caching**: Cache frequently accessed data
4. **Pagination**: Always paginate large result sets
5. **N+1 Queries**: Avoid với proper SQL joins
6. **Compression**: Enable gzip compression

## 🚀 Deployment

```dockerfile
# Dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bullseye-slim
COPY --from=builder /app/target/release/blog_api /usr/local/bin/
EXPOSE 8080
CMD ["blog_api"]
```

```bash
# Build and run
docker build -t blog-api .
docker run -p 8080:8080 -e DATABASE_URL=sqlite:./blog.db blog-api
```

## 🎯 Bước Tiếp Theo

➡️ **Tiếp theo**: [Real-time Chat Application](chat-app.md)
➡️ **Hoặc**: [Professional CLI Tool](cli-tool.md)
➡️ **Quay lại**: [Multi-threaded Web Server](web-server.md)

---

🎉 **Xuất sắc! Bạn đã xây dựng một production-ready REST API!** 🔌

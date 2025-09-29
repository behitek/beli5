# 📚 Beli5 - Lập Trình Dễ Hiểu

[![Xây dựng với Docusaurus](https://img.shields.io/badge/Xây%20dựng%20với-Docusaurus-blue)](https://docusaurus.io/)
[![Blog ELI5](https://img.shields.io/badge/Nội%20dung-Blog%20ELI5-brightgreen)](https://github.com/behitek/beli5)
[![Phong cách ELI5](https://img.shields.io/badge/Phong%20cách-ELI5%20(Giải%20Thích%20Như%20Bạn%205%20Tuổi)-yellow)](https://github.com/behitek/beli5)
[![Trang Web Live](https://img.shields.io/badge/Trang%20Web%20Live-GitHub%20Pages-success)](https://behitek.github.io/beli5/)

> **Behitek + ELI5: Blog Chia Sẻ Lập Trình Được Giải Thích Như Bạn 5 Tuổi**  
> **Hướng Dẫn Lập Trình Tiếng Việt**: Học Python, Java, C++, và Rust qua những ví dụ vui nhộn và giải thích đơn giản bằng tiếng Việt, được thiết kế dành cho người Việt mới bắt đầu!

## 🎯 Điều Gì Làm Dự Án Này Đặc Biệt?

Dự án này tạo ra **các trang web hướng dẫn riêng biệt và toàn diện** cho từng ngôn ngữ lập trình, tất cả được chia sẻ bằng tiếng Việt và giải thích bằng những ví dụ thân thiện với trẻ em Việt Nam:

- 🐍 **Python**: Như dạy một con rắn thông minh
- ☕ **Java**: Như xây dựng với khối LEGO  
- ⚡ **C++**: Như sử dụng dụng cụ chuyên nghiệp
- 🦀 **Rust**: Như mặc đồ bảo hộ an toàn tối ưu khi lập trình

## 🚀 Bắt Đầu Nhanh

### Yêu Cầu Hệ Thống

- **Node.js** (phiên bản 18.0 trở lên)
- **npm** hoặc **yarn** package manager
- Trình duyệt web để xem trang web

### Cài Đặt

1. **Sao chép repository**
   ```bash
   git clone https://github.com/behitek/beli5.git
   cd beli5
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Khởi động development server**
   ```bash
   npm start
   # hoặc
   yarn start
   ```

4. **Mở trình duyệt**
   - Trang web sẽ tự động mở tại `http://localhost:3000`
   - Bạn sẽ thấy trang chủ với liên kết đến tất cả các ngôn ngữ lập trình

## 📁 Cấu Trúc Dự Án

```
beli5/
├── 📄 README.md                    # File này
├── 📄 docusaurus.config.ts         # Cấu hình chính Docusaurus
├── 📄 package.json                 # Dependencies và scripts
│
├── 📂 docs-python/                 # Nội dung hướng dẫn Python
│   └── 📄 intro.md                 # Giới thiệu Python (con rắn thông minh)
│
├── 📂 docs-java/                   # Nội dung hướng dẫn Java
│   └── 📄 intro.md                 # Giới thiệu Java (ví dụ LEGO)
│
├── 📂 docs-cpp/                    # Nội dung hướng dẫn C++
│   └── 📄 intro.md                 # Giới thiệu C++ (dụng cụ chuyên nghiệp)
│
├── 📂 docs-rust/                   # Nội dung hướng dẫn Rust
│   └── 📄 intro.md                 # Giới thiệu Rust (đồ bảo hộ an toàn)
│
├── 📂 src/                         # React components và pages
│   ├── 📂 components/              # Components tái sử dụng
│   ├── 📂 css/                     # Custom styling
│   └── 📂 pages/                   # Các trang bổ sung
│
├── 📂 static/                      # Static assets
│   └── 📂 img/                     # Hình ảnh và icons
│
├── 📄 sidebars-python.js           # Cấu hình sidebar Python
├── 📄 sidebars-java.js             # Cấu hình sidebar Java
├── 📄 sidebars-cpp.js              # Cấu hình sidebar C++
└── 📄 sidebars-rust.js             # Cấu hình sidebar Rust
```

## 🌟 Tính Năng Chính

### 📚 Nội Dung Blog ELI5
- Tất cả nội dung hướng dẫn được chia sẻ theo phong cách ELI5
- Được thiết kế đặc biệt cho người mới bắt đầu hoàn toàn
- Sử dụng ngôn ngữ đơn giản và ví dụ dễ hiểu
- Thanh thông báo toàn cầu hiển thị phương pháp chia sẻ blog ELI5

### 🧒 Phong Cách ELI5 (Giải Thích Như Bạn 5 Tuổi)
- Các khái niệm lập trình phức tạp được chia nhỏ thành thuật ngữ đơn giản
- Sử dụng các đồ vật và hoạt động quen thuộc để giải thích
- Giọng điệu khuyến khích xuyên suốt tất cả các hướng dẫn
- Các phần "Hỏi Người Lớn Giúp Đỡ" khi học sinh gặp khó khăn

### 📚 Bốn Ngôn Ngữ Lập Trình
Mỗi ngôn ngữ có **không gian hướng dẫn hoàn chỉnh** riêng:

| Ngôn Ngữ | Ví Dụ | Tốt Nhất Cho |
|----------|--------|--------------|
| **Python** 🐍 | Con rắn thông minh | Người mới bắt đầu hoàn toàn, trẻ em |
| **Java** ☕ | Khối xây dựng LEGO | Học có cấu trúc, thanh thiếu niên |
| **C++** ⚡ | Dụng cụ chuyên nghiệp | Người học nâng cao |
| **Rust** 🦀 | Đồ bảo hộ an toàn tối ưu | Lập trình tập trung vào an toàn |

### 🎨 Thiết Kế Thân Thiện Với Trẻ Em
- Bảng màu tươi sáng, hấp dẫn
- Font chữ lớn, dễ đọc
- Emoji và các yếu tố hình ảnh vui nhộn
- Thiết kế responsive cho tất cả các thiết bị
- Hỗ trợ chế độ tối

### 🔍 Tính Năng Hỗ Trợ Học Tập
- **Từ Điển Lập Trình**: Định nghĩa đơn giản các thuật ngữ kỹ thuật
- **Hướng Dẫn Trợ Giúp**: Cách xin giúp đỡ khi bị kẹt
- **Chỉ Báo Độ Khó**: 🟢 Dễ, 🟡 Trung bình, 🔴 Khó
- **Theo Dõi Tiến Độ**: Lộ trình học tập rõ ràng cho từng ngôn ngữ
- **Minh Bạch ELI5**: Thanh thông báo toàn cầu đảm bảo minh bạch về phương pháp chia sẻ blog ELI5

## 🛠️ Các Script Có Sẵn

### Development
```bash
npm start          # Khởi động development server
npm run build      # Build cho production
npm run serve      # Chạy production build locally
npm run clear      # Xóa cache Docusaurus
```

### Deployment
```bash
npm run deploy     # Deploy lên GitHub Pages (nếu được cấu hình)
```

## 📖 Cấu Trúc Hướng Dẫn

Mỗi ngôn ngữ lập trình đều tuân theo cùng một tiến trình học tập:

### 🟢 Cơ Bản Siêu Dễ
- Giới thiệu bằng ví dụ vui nhộn
- Các khái niệm cơ bản được giải thích đơn giản
- Chương trình đầu tiên với hướng dẫn từng bước
- Rất nhiều khuyến khích và thông điệp "đừng lo lắng"

### 🟡 Đang Nóng Lên  
- Các khái niệm trung gian xây dựng trên cơ sở
- Ví dụ phức tạp hơn với giải thích rõ ràng
- Các yếu tố tương tác và bài tập thực hành
- Ứng dụng thực tế được trình bày đơn giản

### 🔴 Thời Gian Thử Thách
- Chủ đề nâng cao cho người học tự tin
- Dự án phức tạp được chia thành các bước có thể quản lý
- Khái niệm chuyên nghiệp được giải thích bằng thuật ngữ trẻ em
- Chuẩn bị cho lập trình thực tế

### 🏆 Dự Án Đặc Thù Theo Ngôn Ngữ
- **Python**: Dự án con rắn thông minh (máy tính, trò chơi)
- **Java**: Dự án máy LEGO (ứng dụng, công cụ)
- **C++**: Dự án dụng cụ chuyên nghiệp (ứng dụng hiệu suất cao)
- **Rust**: Dự án đồ bảo hộ an toàn (hệ thống bảo mật)

## 🎯 Đối Tượng Mục Tiêu

### Đối Tượng Chính
- **Trẻ Em Việt Nam (8-16 tuổi)**: Người mới bắt đầu lập trình hoàn toàn học bằng tiếng Việt
- **Phụ Huynh/Giáo Viên Việt Nam**: Tìm kiếm tài nguyên lập trình thân thiện với trẻ em bằng tiếng Việt
- **Người Lớn Việt Nam Mới Bắt Đầu**: Thích giải thích đơn giản, không đáng sợ bằng tiếng Việt
- **Người Học Rust Việt Nam**: Người nói tiếng Việt quan tâm đến việc học lập trình an toàn bộ nhớ

### Đối Tượng Phụ
- **Nhà Giáo Dục Homeschool Việt Nam**: Tìm kiếm chương trình lập trình có cấu trúc bằng tiếng Việt
- **Chương Trình Sau Giờ Học Việt Nam**: Cần các hoạt động STEM hấp dẫn bằng tiếng Việt
- **Thư Viện Việt Nam**: Cung cấp workshop lập trình cho trẻ em Việt Nam
- **Sinh Viên Lập Trình Hệ Thống Việt Nam**: Muốn giới thiệu nhẹ nhàng về Rust bằng tiếng Việt

## 🚀 Tùy Chọn Deployment

### GitHub Pages
1. Cập nhật `docusaurus.config.ts` với thông tin GitHub của bạn
2. Chạy `npm run deploy`

### Netlify
1. Kết nối GitHub repository của bạn với Netlify
2. Đặt build command: `npm run build`
3. Đặt publish directory: `build`

### Vercel
1. Import GitHub repository của bạn vào Vercel
2. Vercel sẽ tự động phát hiện Docusaurus và cấu hình deployment

## 🤝 Đóng Góp

Chúng tôi hoan nghênh các đóng góp duy trì phong cách ELI5 và cách tiếp cận thân thiện với người mới bắt đầu!

### Hướng Dẫn Nội Dung
- **Sử dụng tiếng Việt đơn giản**: Tránh thuật ngữ kỹ thuật, giải thích bằng tiếng Việt
- **Bao gồm ví dụ Việt Nam**: So sánh các khái niệm lập trình với những điều quen thuộc của người Việt
- **Thêm khuyến khích tiếng Việt**: Nhắc nhở người học bằng tiếng Việt rằng sai lầm là bình thường
- **Minh bạch ELI5**: Nội dung được bao phủ bởi tuyên bố minh bạch ELI5 toàn cầu trong thanh thông báo
- **Kiểm tra với trẻ em Việt**: Nếu có thể, hãy để trẻ em Việt Nam xem xét nội dung
- **Liên quan văn hóa**: Sử dụng ví dụ quen thuộc với người học Việt Nam

### Hướng Dẫn Đặc Biệt Cho Rust
- **An Toàn Trước Tiên**: Nhấn mạnh các tính năng an toàn bộ nhớ của Rust
- **Sử dụng Ví Dụ An Toàn**: So sánh với đồ bảo hộ, hệ thống an toàn
- **Giải Thích "Tại Sao"**: Giúp người học hiểu tại sao các quy tắc của Rust tồn tại
- **Tôn Vinh Compiler**: Đóng khung thông báo lỗi như hướng dẫn hữu ích

## 📄 Giấy Phép

Dự án này được cấp phép theo Giấy phép MIT - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🙏 Lời Cảm Ơn

- **Cộng Đồng Rust**: Vì đã tạo ra một ngôn ngữ lập trình tuyệt vời và an toàn
- **Đội Docusaurus**: Vì nền tảng tài liệu tuyệt vời
- **Công Nghệ Blog Sharing**: Vì làm cho việc chia sẻ kiến thức trở nên khả thi
- **Cộng Đồng Mã Nguồn Mở**: Vì các công cụ và cảm hứng
- **Các Nhà Giáo Dục Trên Thế Giới**: Những người truyền cảm hứng cho các phương pháp học tập thân thiện với trẻ em

## 📞 Hỗ Trợ

### Cho Vấn Đề Kỹ Thuật
- Tạo issue trong GitHub repository
- Bao gồm phiên bản trình duyệt và thông báo lỗi
- Mô tả các bước để tái tạo vấn đề

### Cho Đề Xuất Nội Dung
- Mở GitHub issue với label "content"
- Đề xuất cải tiến cho giải thích hoặc ví dụ
- Báo cáo bất kỳ nội dung nào có thể gây nhầm lẫn cho người mới bắt đầu

### Cho Mục Đích Giáo Dục
- Dự án này miễn phí cho mục đích giáo dục tại các trường học Việt Nam
- Các trường học và thư viện Việt Nam có thể sử dụng và chỉnh sửa nội dung
- Xem xét đóng góp các cải tiến tiếng Việt trở lại cộng đồng
- Phù hợp cho chương trình giáo dục Việt Nam

---

## 🎉 Bắt Đầu Học!

Sẵn sàng bắt đầu cuộc phiêu lưu lập trình với Rust tập trung vào an toàn? 

1. **Chạy development server**: `npm start`
2. **Mở trình duyệt**: Vào `http://localhost:3000`
3. **Chọn ngôn ngữ của bạn**: Chọn Python, Java, C++, hoặc Rust
4. **Bắt đầu với cơ bản**: Bắt đầu với phần giới thiệu
5. **Vui vẻ học tập**: Nhớ rằng, mọi chuyên gia đều từng là người mới bắt đầu!

**Chúc bạn lập trình vui vẻ, các lập trình viên tương lai!** 🚀👨‍💻👩‍💻🦀

---

*📚 README này được viết theo cùng nguyên tắc ELI5 như các hướng dẫn. Nó được thiết kế để hữu ích cho cả người dùng kỹ thuật và các nhà giáo dục tìm kiếm tài nguyên lập trình thân thiện với trẻ em, tập trung vào các phương pháp lập trình an toàn và hiện đại.*
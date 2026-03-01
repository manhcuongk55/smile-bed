# 😊 Smile Bed - Nền tảng Thuê Phòng Trọ Thông Minh

> **Minh bạch thông tin, an tâm lựa chọn.**

**Smile Bed** là nền tảng thuê phòng trọ thông minh dành cho thị trường Việt Nam, giải quyết các vấn đề phổ biến trong thuê phòng trọ: thiếu minh bạch thông tin, khó khăn trong quản lý hợp đồng, và trải nghiệm tìm phòng kém hiệu quả.

---

## 🎯 Ý tưởng & Vấn đề giải quyết

### Thực trạng thị trường phòng trọ Việt Nam
- **Thiếu minh bạch**: Thông tin phòng trọ thường không chính xác, thiếu xác thực
- **An toàn PCCC**: Rất ít nền tảng đánh giá mức độ an toàn phòng cháy chữa cháy
- **Quản lý thủ công**: Chủ nhà vẫn quản lý hợp đồng, hóa đơn, bảo trì bằng tay
- **Chi phí ẩn**: Người thuê thường bất ngờ với tổng chi phí thực (điện, nước, wifi)

### Giải pháp Smile Bed
| Vấn đề | Giải pháp |
|--------|-----------|
| Thông tin không chính xác | Hệ thống **Smile Verified** - xác thực phòng bởi đội ngũ |
| Không biết tổng chi phí | Hiển thị **tổng chi phí dự kiến** (tiền thuê + điện/nước/wifi) |
| An toàn PCCC | **Fire Safety Score** - đánh giá điểm PCCC cho mỗi phòng |
| Quản lý phức tạp | **Lifecycle Management** - tự động hóa từ ký HĐ → hóa đơn → bảo trì |
| Tìm phòng khó khăn | **Smart Discovery** - lọc theo giá, vị trí, tiện ích gần kề |

---

## 🏗️ Kiến trúc hệ thống

```
smile-bed/
├── apps/
│   ├── backend/          # NestJS API Server
│   │   ├── src/
│   │   │   ├── auth/          # Xác thực JWT + bcrypt
│   │   │   ├── discovery/     # Tìm kiếm & lọc phòng
│   │   │   ├── booking/       # Đặt phòng & lịch xem phòng
│   │   │   ├── lifecycle/     # Hóa đơn, bảo trì, chỉ số điện nước
│   │   │   └── marketplace/   # Cho thuê/mua tài sản & dịch vụ
│   │   └── prisma/            # Database schema & seed
│   └── frontend/         # Next.js Web App  
│       └── src/
│           ├── app/           # Pages (SSR)
│           └── components/    # UI Components
├── packages/             # Shared packages
└── turbo.json            # Turborepo config
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Monorepo** | Turborepo |
| **Backend** | NestJS (Node.js) |
| **Frontend** | Next.js 14 (React 19) |
| **Database** | SQLite (dev) / PostgreSQL (prod) |
| **ORM** | Prisma |
| **Auth** | JWT + Passport + bcrypt |
| **Styling** | TailwindCSS |
| **UI Icons** | Lucide React |
| **Animation** | Framer Motion |

---

## 🚀 Tính năng chính

### 1. 🔍 Discovery - Khám phá phòng
- Tìm kiếm phòng với bộ lọc theo **giá**, **khu vực**, **xác thực**
- Hiển thị **điểm an toàn PCCC** cho mỗi phòng
- Badge **"Đã xác thực"** (Smile Verified)
- Hiển thị **tiện ích gần kề** (ga Metro, trung tâm thương mại, ...)
- Tổng chi phí dự kiến minh bạch

### 2. 📅 Booking - Đặt phòng & Xem phòng
- **Đặt lịch xem phòng** trực tuyến (chọn ngày/giờ, ghi chú yêu cầu)
- Tạo **hợp đồng thuê** với thông tin chi tiết
- Quản lý đặt cọc và trạng thái hợp đồng
- Dashboard quản lý lịch xem phòng cho chủ nhà

### 3. 🔄 Lifecycle - Quản lý vòng đời thuê
- **Hóa đơn tự động**: Tạo hóa đơn hàng tháng (tiền nhà + điện + nước)
- **Chỉ số điện/nước**: Ghi nhận chỉ số, tính toán chi phí
- **Yêu cầu bảo trì**: Người thuê gửi yêu cầu sửa chữa kèm hình ảnh
- Theo dõi trạng thái bảo trì (Mới → Đang xử lý → Hoàn thành)

### 4. 🛒 Marketplace - Chợ nội khu
- **Tài sản cho thuê/mua**: Nội thất, thiết bị, đồ gia dụng
- **Dịch vụ**: Dọn dẹp, giặt ủi, bảo vệ, ...
- Quản lý theo tòa nhà hoặc toàn hệ thống

### 5. 🔐 Authentication - Xác thực
- Đăng ký & Đăng nhập bảo mật (bcrypt + JWT)
- Phân quyền: **Super Admin**, **Property Owner**, **Manager**, **Tenant**

---

## 📦 Cài đặt & Chạy

### Yêu cầu
- Node.js >= 18
- npm >= 10

### Bước 1: Clone & Install

```bash
git clone git@github.com:manhcuongk55/smile-bed.git
cd smile-bed
npm install
```

### Bước 2: Cấu hình môi trường

```bash
cp .env.example .env
# Chỉnh sửa file .env theo nhu cầu
```

### Bước 3: Khởi tạo database

```bash
cd apps/backend
npx prisma migrate dev
npx ts-node prisma/seed.ts
```

### Bước 4: Chạy ứng dụng

```bash
# Chạy cả backend & frontend
npm run dev

# Backend: http://localhost:3001
# Frontend: http://localhost:3000
```

---

## 📊 Database Schema

### Các model chính

| Model | Mô tả |
|-------|--------|
| `User` | Người dùng (Owner, Manager, Tenant) |
| `Property` | Tòa nhà / khu trọ |
| `Room` | Phòng trọ (giá, trạng thái, tiện ích) |
| `Tenant` | Hồ sơ người thuê (CMND, ngân sách, ...) |
| `Contract` | Hợp đồng thuê (ngắn/dài hạn) |
| `Invoice` | Hóa đơn hàng tháng |
| `Reading` | Chỉ số điện/nước |
| `MaintenanceRequest` | Yêu cầu bảo trì/sửa chữa |
| `RoomViewing` | Lịch hẹn xem phòng |
| `NearbyPOI` | Tiện ích gần kề |
| `Asset` | Tài sản cho thuê/bán |
| `Service` | Dịch vụ nội khu |

---

## 🗺️ Roadmap

- [ ] **v1.1** - Tích hợp thanh toán trực tuyến (VNPay, Momo)
- [ ] **v1.2** - Chat real-time giữa chủ nhà và người thuê
- [ ] **v1.3** - AI gợi ý phòng phù hợp dựa trên sở thích
- [ ] **v1.4** - Bản đồ tương tác với Google Maps
- [ ] **v2.0** - Mobile app (React Native)

---

## 👥 Đóng góp

Smile Bed là dự án mã nguồn mở. Mọi đóng góp đều được chào đón!

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/ten-tinh-nang`)
3. Commit (`git commit -m 'feat: thêm tính năng mới'`)
4. Push (`git push origin feature/ten-tinh-nang`)
5. Tạo Pull Request

---

## 📄 License

MIT License © 2026 Smile Bed Team

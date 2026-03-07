# CHANGELOG – Smile-bed Frontend

Ghi chú version cho mỗi lần deploy. Format: `vX.Y.Z` (Major.Feature.Patch)

---

## v1.6.0 — Thợ Uy Tín Marketplace (2026-03-07)
**Deploy:** `(pending push)` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 2 files, +500 lines

### Tính năng mới:
- 🔧 **`/tho-uy-tin` – Thợ Uy Tín** (Trusted Repair Worker Marketplace)
  - 5 thợ uy tín: điện, nước, điều hoà, khoá, đồ gia dụng
  - Bảng giá chi tiết + bảo hành rõ ràng (3-6 tháng)
  - Review thật từ cư dân (dựa trên insight thực tế: thợ báo giá láo)
  - 8 danh mục: ⚡ Điện, 🚿 Nước, ❄️ Điều hoà, 🔑 Khoá, 🔌 Gia dụng, 🎨 Sơn, 🧹 Vệ sinh
  - Form đăng yêu cầu sửa chữa (loại sự cố + mức độ khẩn cấp + địa chỉ)
  - Verified badges, response time, distance
  - Search, filter by category, sort by rating/distance/reviews
  - Web Share API: chia sẻ thợ uy tín cho hàng xóm
- 🧭 Navbar: thêm link "🔧 Thợ Uy Tín" (desktop + mobile)

### Insight thực tế:
> Từ cuộc trò chuyện thực: Thợ A sửa bảng mạch 500k bảo hành 6 tháng vs Thợ B đòi 1 triệu bảo hành 1 tháng.
> → Smile giải quyết bằng: giá công khai, review thật, bảo hành minh bạch.

---

## v1.5.0 — Neighborhood Explorer (2026-03-07)
**Deploy:** `acfa891` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 2 files, +595 lines

### Tính năng mới:
- 📍 **`/khu-vuc` – Khám phá Khu vực** (Neighborhood Explorer)
  - Area cards grid: 4 khu vực (Cầu Giấy, Bình Thạnh, Thủ Đức, Đống Đa)
  - 8 tiêu chí tiện ích (ẩm thực, giao thông, gym, mua sắm, giáo dục, an ninh, cây xanh, nightlife)
  - Quiz viral "Khu nào hợp bạn?" – 4 câu hỏi, 30 giây → share kết quả Zalo/Facebook
  - Filter theo thành phố, sort theo rating/giá/reviews
  - Expandable chi tiết tiện ích với score bars
  - Top spots nổi bật mỗi khu vực
  - Web Share API cho viral sharing
- 🧭 Navbar: thêm link "📍 Khu vực" (desktop + mobile)

---

## v1.4.0 — Smile Home Community Dashboard (2026-03-07)
**Deploy:** `f1ced9e` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 4 files, +1313 lines

### Tính năng mới:
- 🏠 **`/smile-home` – Smile Home Dashboard** (5 tabs tương tác)
  - 🏠 Tổng quan: Share banner, bảng tin, BXH trong nhà
  - 🍜 Đặt chung: Join/rời đơn, walker gần nhà
  - 🧹 Việc nhà: Tick hoàn thành → confetti + điểm
  - 📋 Bảng tin: React, đặt thợ qua Smile
  - ⭐ Kiếm điểm: Earn tasks, BXH toàn khu, đổi thưởng
- 3 cơ chế viral: Quỹ chung progress, 2-tier Leaderboard, Invite loop
- Animations: Confetti, coin fly, contribute modal
- CSS riêng 500+ dòng (namespace `sh-`)
- Navigation: Navbar + Dashboard sidebar

---

## v1.3.0 — Share Vui Challenge & Mystery Map (2026-03-07)
**Deploy:** `3445c5a` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 13 files, +1867 lines

### Tính năng mới:
- 🎬 **Share Vui Challenge** (3 trang)
  - `/share-vui` – Feed video trending + filter format + hashtag
  - `/share-vui/submit` – Upload video, chọn format, hashtag
  - `/share-vui/leaderboard` – Podium top 3, bảng xếp hạng, phần thưởng
- 🗺️ **Smile Mystery Map** (2 trang)
  - `/dashboard/mystery-map` – Puzzle board + blind box
  - `/dashboard/mystery-map/exchange` – Sàn đổi mảnh ghép
- Prisma schema: 8 models mới (ChallengeVideo, PuzzlePiece, etc.)
- 2 API routes (mock): `/api/share-vui`, `/api/mystery-map`
- Homepage: 2 CTA sections mới
- CSS animations: card-glow, puzzle-piece, blind-box
- Tailwind: shimmer, bounce-in, glow-pulse, float-up

---

## v1.2.0 — Marketplace + Workspace Vision (trước đó)
**Deploy:** `a947f2a`
- Expanded vision: accommodation + workspace marketplace

## v1.1.0 — Global Footer + AILINKX Partner
**Deploy:** `afefb7a`
- Global footer with AILINKX partner banner

# CHANGELOG – Smile-bed Frontend

Ghi chú version cho mỗi lần deploy. Format: `vX.Y.Z` (Major.Feature.Patch)

---

## v2.0.0 — Social Lead Hunter (2026-03-08)
**Deploy:** `(pending Vercel reconnect)` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 2 files, +410 lines

### 🎯 Tính năng mới:
- **`/dashboard/lead-hunter` – Tìm Khách Tự Động trên MXH**
  - Tab Leads: 7 leads phát hiện từ FB/Zalo groups, match score (85-96%), keyword extraction
  - Tab Nhóm: 6 nhóm theo dõi (520k→8.5k members), trạng thái quét real-time
  - Tab Từ khoá: 8 keywords tracking ("tìm phòng trọ", "cần phòng", "ở ghép"...)
  - Tab Cài đặt: tần suất quét, match threshold, khu vực ưu tiên, thông báo
  - Reply drawer: 3 gợi ý reply tự động cho mỗi lead (personalized theo tên, khu vực, budget)
  - Copy-to-clipboard → paste vào FB/Zalo groups
  - Status tracking: Mới → Đã reply → Đã liên hệ
- 🧭 Dashboard sidebar: thêm "🎯 Tìm Khách MXH"
- 📦 Import fix: `Radar` icon layout

---

## v1.9.0 — Customer Acquisition Tools (2026-03-08)
**Deploy:** `(pending Vercel reconnect)` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 4 files, +650 lines

### Tính năng mới:
- 🔍 **`/tim-tro/[khu-vuc]` – SEO Landing Pages**
  - 4 khu vực: Cầu Giấy, Bình Thạnh, Thủ Đức, Đống Đa
  - Mỗi trang: danh sách phòng, filter giá, amenities, breadcrumbs SEO
  - Lead capture form inline (Tư vấn miễn phí → SĐT + Zalo + yêu cầu)
  - Cross-links giữa các khu vực (internal linking SEO)
  - URL structure: `/tim-tro/cau-giay`, `/tim-tro/binh-thanh`...
  - Google target: "phòng trọ cầu giấy", "nhà trọ bình thạnh"...
- 📋 **`/dashboard/leads` – Lead CRM Dashboard**
  - Pipeline: Mới → Đã liên hệ → Xem phòng → Ký HĐ → Mất
  - 7 leads mẫu với source tracking (FB, Zalo, TikTok, Website, Giới thiệu)
  - Detail drawer: gọi/Zalo, ghi chú, assign sale, cập nhật trạng thái
  - Add lead modal, search/filter theo nguồn + trạng thái
  - KPI: tổng leads, conversion rate, chờ liên hệ
- 🧭 Dashboard sidebar: thêm "📋 Quản lý Khách"

---

## v1.8.0 — Auto Post Bot System (2026-03-08)
**Deploy:** `(pending Vercel reconnect)` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 3 files, +440 lines

### Tính năng mới:
- 🤖 **`/dashboard/auto-post` – Bot Đăng Bài Tự Động**
  - Tab Bot: Quản lý 3 bot (Facebook, Zalo, TikTok) — bật/tắt, lịch đăng, nhóm target
  - Tab Tạo bài: 5 template (cho thuê, hot sale, ở ghép, Zalo, TikTok) × 3 phòng → preview + copy
  - Tab Lịch đăng: Queue bài đã hẹn giờ, trạng thái pending/scheduled
  - Tab Thống kê: 4 KPI (bài đăng, tiếp cận, leads, conversion) + chart 7 ngày + top posts
  - Template variables: {{roomType}}, {{price}}, {{address}}, {{amenities}}, {{phone}}, {{link}}
  - Copy bài → đăng lên FB/Zalo/TikTok groups
- 🧭 Dashboard sidebar: thêm "🤖 Bot Đăng Bài"

### Ý tưởng đang queue (chưa build):
- Night Owl Nest (private night pods, 800k/month, focus quests)
- Smile Campus Hub (school-certified badge, census quest)

---

## v1.7.0 — Smile Future Campaign (2026-03-07)
**Deploy:** `(pending)` → Vercel auto-deploy từ `main`
**Machine:** Antigravity AI
**Files changed:** 4 files, +900 lines

### Chiến dịch "Smile Future – Nhà Trọ Tương Lai"
Target: Mùa nhập học T7-T9/2026 · 50k+ users · 100 phòng miễn phí

#### Phase 1: `/smile-future` – School Match Quiz
- Quiz 5 phút: 5 câu hỏi → gợi ý top 5 trường phù hợp (12+ ĐH HN & HCM)
- Career matching (12 ngành nghề)
- Dữ liệu trường 2026: ĐH QG HN/HCM, Bách khoa, Kinh tế, Y Dược, FPT...
- Share result Zalo/FB/TikTok (#SmileFuture #ChonTruongHopBan)
- Campaign stats: 100 phòng free, 12+ trường, 10k+ bạn bè, 0đ CAC
- Impact stories + partner school tags

#### Phase 2: `/smile-future/help` – Help Profile
- Profile sinh viên khó khăn + câu chuyện hoàn cảnh
- Community voting system (ẩn danh)
- Top 100 vote → tặng phòng 3-6 tháng
- Progress bar tracking (X/100 phòng đã duyệt)
- Apply form: tên, tuổi, trường, story, nhu cầu
- NPO partner section (Ngày Việt, Tony Buổi Sáng)

#### Phase 3: `/smile-future/friends` – Friend Map
- Tab Bạn bè: match by interest/school (match score %)
- Tab Nhiệm vụ: Community relay gamification (confetti + points)
- Tab BXH Trường: Podium top 3 + full ranking (ĐH QG HN vs HCM)
- Invite loop: Mời bạn → +50k quỹ nhà
- Share BXH viral: "Trường bạn hạng mấy?"

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

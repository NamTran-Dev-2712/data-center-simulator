# GDD — Data Center Incident Simulator (v0.4)

> Trạng thái: bản nháp dựng từ ý tưởng đã chốt ở các buổi trước. Mục đánh dấu **[CHỐT?]** là giả định cần ông xác nhận hoặc sửa.

## 1. Tóm tắt
Game 2.5D (mô hình 3D low-poly, camera isometric cố định, kéo + pinch) chạy trên web, mobile-first, thể loại tycoon/simulation. Người chơi điều hành một data center nhỏ: nhận hợp đồng cho thuê công suất, giữ thiết bị chạy ổn, xử lý sự cố, kiếm tiền và mở rộng.

Vòng lặp cốt lõi: **Nhận hợp đồng → cấp công suất → vận hành → xảy ra sự cố → sửa/ứng phó → nhận thanh toán hoặc bị phạt SLA → nâng cấp → hợp đồng lớn hơn.**

## 2. Nền tảng & đối tượng
- Chạy trên trình duyệt, ưu tiên điện thoại (dọc), cảm ứng. Deploy dạng web để kiếm tiền.
- Hình ảnh: 2.5D (mô hình 3D low-poly, camera isometric cố định, kéo + pinch). Chi tiết ở mục 3.8 và `ART_BIBLE.md`.
- Mô hình kiếm tiền (đã chọn hướng, chưa chốt chi tiết): kết hợp **quảng cáo**, **bán vật phẩm/tiền tệ trong game** (có thể gồm vé gọi nhân vật, vé mở rương, mua thời gian/tiền bằng token nạp như kim cương), và **bán bản mở khoá**.
  - **[CHỐT?]** chi tiết, rủi ro: gacha cần kiểm tra luật và điều khoản nền tảng, bán sức mạnh có thể phá cân bằng SLA.
  - **MVP KHÔNG có monetization.**
- Ngôn ngữ: đa ngôn ngữ, bắt đầu với **tiếng Việt (mặc định)** và **tiếng Anh**.
- Người chơi: thích game quản lý/tycoon, phiên chơi ngắn.

## 3. Hệ thống cốt lõi
### 3.1 Công suất (4 trạng thái)
Mỗi tài nguyên có 4 con số: **vật lý** (tổng có), **đã đặt** (cam kết cho hợp đồng), **đang dùng** (thực tế), **có thể bán** (còn lại để nhận hợp đồng mới).
MVP có 2 loại tài nguyên: **điện** và **mạng**. Nhiệt là chỉ số phụ ảnh hưởng tỉ lệ hỏng.

### 3.2 Hợp đồng
Vòng đời: `Offered → Active → Completed | Breached`.
Mỗi hợp đồng có: khách hàng NPC, công suất yêu cầu, thời hạn, giá theo kỳ, mức SLA/uptime cam kết, tiền phạt khi vi phạm, độ phù hợp (làm được ngay / cần nâng cấp / chưa đủ điều kiện).
Gia hạn phụ thuộc chất lượng dịch vụ đã cung cấp.

### 3.3 Chi phí & tài chính
Chi phí vận hành: điện, mạng, lương, bảo trì. Có vốn ban đầu và nên giữ vốn dự phòng. Màn hình tài chính hiển thị thu/chi/lợi nhuận theo kỳ.

### 3.4 Sự cố (Incident Director)
Rủi ro nền × tình trạng thiết bị (tuổi, nhiệt, bảo trì) quyết định khi nào xảy ra sự cố. Có "ngân sách sự cố" và thời gian nghỉ để không bị sự cố liên tục. MVP có 3 loại sự cố **[CHỐT?: ví dụ quá nhiệt, hỏng nguồn rack, đứt/nghẽn mạng]**.

### 3.5 Nhân sự & tự động hóa (sau MVP)
Thuê thêm kỹ thuật viên, kỹ năng, chi phí cố định, tự động hóa một phần. 3 trục tiến trình: Company Level / Tài chính / Vận hành.

### 3.6 Thời gian
Đồng hồ game có tạm dừng, 1x, 2x.

### 3.7 Thế giới & điều hướng
- Thế giới 3D lớn hơn màn hình, nhìn bằng camera trực giao (orthographic: vật ở xa không nhỏ lại) góc isometric cố định, không xoay. Người chơi kéo (drag) để di chuyển camera, hai ngón để phóng to/thu nhỏ (pinch); máy tính dùng chuột kéo và lăn chuột.
- Giới hạn đo từ spike (nhánh `spike/3d-look`): zoom mặc định vừa khít cả phòng (màn dọc thì theo chiều ngang); zoom từ 0.8× đến 4× mức vừa khít; điểm nhìn không ra khỏi biên phòng (±5 ô quanh tâm phòng 10 × 10).
- Phân biệt kéo và chạm: chạm ngắn vào rack = mở panel; kéo quá ngưỡng nhỏ (8 px CSS trong spike) = di chuyển camera, không mở panel.
- MVP vẫn đúng phạm vi mục 4: 1 phòng, 4 rack. Nhưng phòng đó nằm trong thế giới kéo được, không cố định giữa màn hình.
- Nhiều phòng / nhiều khu vực chơi được: để sau MVP (giữ ở mục 5). Từ giờ dữ liệu phòng phải có `roomId` và toạ độ trong thế giới để mở rộng không phải đập đi làm lại.

### 3.8 Hướng hình ảnh
- 2.5D: mô hình 3D low-poly, màu phẳng, bo cạnh nhẹ, ánh sáng mềm + bóng nhẹ, nhân vật thân tròn đầu to. Quy định chi tiết trong `ART_BIBLE.md` (v0.3).
- Giao diện **sáng là mặc định**. Giao diện tối là tuỳ chọn: ghi vào Backlog, không làm ngay.
- Tông: **nghiêm túc, hơi dễ thương** (như mục 8, câu 3).
- Ảnh tham chiếu của chủ dự án chỉ làm mốc phong cách. **Không sao chép** nhân vật, bố cục, giao diện hay tài sản của game khác.

## 4. Phạm vi MVP (đã khoá)
- 1 phòng máy
- 1 kỹ thuật viên (nhân vật điều khiển được)
- 4 rack
- 2 loại tài nguyên (điện, mạng)
- 5 hợp đồng NPC
- 3 loại sự cố
- Lưu game bằng localStorage

## 5. Ngoài phạm vi (làm sau, đừng làm sớm)
Đa người chơi / chợ giữa người chơi (Phase 9), nhiều phòng, cây công nghệ phức tạp, sự kiện thị trường.
Khi thiết kế dữ liệu hợp đồng/công suất/thị trường, để sẵn chỗ cho đa người chơi: NPC dùng cùng mô hình mà người chơi thật sẽ dùng sau này.

## 6. Điều kiện thắng/thua
**[CHỐT?]** Game không có kết thúc cứng ở MVP; thua = phá sản (tiền < 0 kéo dài). Mục tiêu dài hạn = lên cấp công ty.

## 7. Tiêu chí "vui" cho bản MVP
- Trong 5 phút đầu người chơi hiểu và thực hiện được 1 vòng lặp trọn vẹn.
- Mỗi quyết định nhận hợp đồng có đánh đổi rõ (lời nhiều nhưng rủi ro SLA).
- Sự cố tạo căng thẳng nhưng không gây ức chế.

## 8. Câu hỏi còn mở
1. ~~Cách kiếm tiền từ game?~~ **Đã trả lời (v0.2):** quảng cáo + vật phẩm/tiền tệ trong game + bản mở khoá; chi tiết còn [CHỐT?] (xem mục 2).
2. ~~Tên thương hiệu, bối cảnh (công ty/quốc gia hư cấu)?~~ **Đã trả lời (v0.3):** bối cảnh là công ty hư cấu, không gắn quốc gia. Tên thương hiệu tạm dùng "NimbusCore (tên tạm)", chỉ là tạm, chưa quan trọng: **[CHỐT?]**.
3. ~~Giọng điệu: nghiêm túc mô phỏng hay hài hước?~~ **Đã trả lời (v0.3):** nghiêm túc, hơi dễ thương. Không máu, không cháy dữ dội.
4. ~~Ngôn ngữ trong game: Việt, Anh, hay cả hai?~~ **Đã trả lời (v0.2):** đa ngôn ngữ, bắt đầu tiếng Việt (mặc định) và tiếng Anh.

## 9. Nhật ký quyết định
- 2026-10-24 (T1.3, GDD v0.4): đổi hướng hình ảnh từ 2D sang **2.5D** (mô hình 3D low-poly, camera isometric cố định, kéo + pinch), sau khi spike trên nhánh `spike/3d-look` chạy 60 FPS trên Galaxy A14. Bỏ quy tắc "zoom bước nguyên cho pixel art". Thêm mục 3.8 Hướng hình ảnh. Phạm vi MVP (mục 4) giữ nguyên.

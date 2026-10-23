# GDD — Data Center Incident Simulator (v0.1)

> Trạng thái: bản nháp dựng từ ý tưởng đã chốt ở các buổi trước. Mục đánh dấu **[CHỐT?]** là giả định cần ông xác nhận hoặc sửa.

## 1. Tóm tắt
Game 2D web, mobile-first, thể loại tycoon/simulation. Người chơi điều hành một data center nhỏ: nhận hợp đồng cho thuê công suất, giữ thiết bị chạy ổn, xử lý sự cố, kiếm tiền và mở rộng.

Vòng lặp cốt lõi: **Nhận hợp đồng → cấp công suất → vận hành → xảy ra sự cố → sửa/ứng phó → nhận thanh toán hoặc bị phạt SLA → nâng cấp → hợp đồng lớn hơn.**

## 2. Nền tảng & đối tượng
- Chạy trên trình duyệt, ưu tiên điện thoại (dọc), cảm ứng. Deploy dạng web để kiếm tiền (cách kiếm tiền cụ thể: **[CHỐT?]** bán, quảng cáo, hay mua trong game).
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
1. Cách kiếm tiền từ game?
2. Tên thương hiệu, bối cảnh (công ty/quốc gia hư cấu)?
3. Giọng điệu: nghiêm túc mô phỏng hay hài hước?
4. Ngôn ngữ trong game: Việt, Anh, hay cả hai?
# ART BIBLE — Data Center Incident Simulator (v0.1)

> Giá trị dưới đây là điểm khởi đầu đã đề xuất. Khi ông duyệt ảnh thử đầu tiên thì khoá lại và ghi ngày.

## Phong cách
- Pixel art, góc nhìn 3/4 từ trên xuống.
- Tile 32×32. Bảng màu giới hạn 24–32 màu (ghi mã màu vào đây khi chốt).
- Ánh sáng: một hướng cố định (**[CHỐT?]** từ trên-trái). Bóng đổ nhất quán.
- Cảm giác: phòng máy công nghiệp, sạch, đèn LED xanh/đỏ nổi bật để đọc trạng thái nhanh trên màn hình nhỏ.

## Quy tắc đọc được trên điện thoại
- Trạng thái thiết bị phải nhận ra bằng màu LED + icon, không chỉ bằng chi tiết nhỏ.
- Vùng chạm tối thiểu cho nút UI: 44×44 px.

## Prompt gốc cho AI ảnh (mẫu, chỉnh khi thử)
```
pixel art, 32x32 tile, 3/4 top-down view, limited 32-color palette,
single light source from top-left, clean data center server room asset,
<TÊN ASSET>, transparent background, no text, no anti-aliasing, crisp pixels
```

## Quy ước đặt tên file
`category_name_state_frame.png`, chữ thường, gạch dưới. Ví dụ: `rack_idle_01.png`, `tech_walk_down_03.png`, `fx_spark_02.png`.
Đặt trong `public/assets/<category>/`.

## Quy trình mỗi asset
1. AI tạo bản nháp.
2. Dọn viền, ép bảng màu, cắt đúng kích thước (Aseprite / LibreSprite / Pixelorama).
3. Ghép spritesheet (free-tex-packer).
4. Đặt tên + lưu đúng thư mục.
5. Ghép thử vào game (placeholder được thay bằng bản thật).

## Cảnh báo
- Hoạt ảnh nhân vật là phần AI làm kém ổn định nhất: làm 1 sprite đứng → 4 hướng đứng → đi → sửa, từng bước.
- Kiểm tra điều khoản thương mại của công cụ AI ảnh/âm thanh và font trước khi phát hành.
- Chưa có asset thật thì dùng ô vuông màu làm placeholder, đừng chặn tiến độ.

## Danh sách asset tối thiểu
Môi trường: tile sàn, tường, cửa, cáp. Thiết bị: rack (idle/lỗi/sửa), tủ nguồn, điều hòa. Nhân vật: kỹ thuật viên 4 hướng × (đứng, đi, sửa, bê đồ, hoảng). Hiệu ứng: LED, tia lửa, khói, đèn báo động, hơi nóng. UI: icon tiền/điện/nhiệt/SLA/uptime, nút, khung panel, thẻ hợp đồng, font. Âm thanh: quạt nền, cảnh báo, click, tiền.
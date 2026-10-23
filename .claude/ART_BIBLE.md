# ART BIBLE — Data Center Incident Simulator (v0.2)

> Phần có ghi **ĐÃ DUYỆT, khoá 2026-10-24** là giá trị chủ dự án đã duyệt, không tự ý đổi. Phần **[CHỐT?]** là đề xuất, chờ duyệt (thường khi xem ảnh thử đầu tiên); khi duyệt thì ghi ngày khoá.

## Phong cách
- Pixel art, góc nhìn 3/4 từ trên xuống.
- Bảng màu giới hạn: 25 màu đang dùng + 7 màu dự trữ (tối đa 32). Xem mục "Bảng màu".
- Cảm giác: phòng máy công nghiệp, sạch, đèn LED xanh/đỏ nổi bật để đọc trạng thái nhanh trên màn hình nhỏ.
- Giọng điệu (đã chốt trong GDD, không phải quyết định art): nghiêm túc, hơi dễ thương. Không máu, không cháy dữ dội.

## Kích thước & ánh sáng **[CHỐT?]**
- Hướng sáng: từ trên-trái. Bóng đổ nhất quán. **[CHỐT?]**
- Tile: 32×32. **[CHỐT?]**
- Rack: 32×64 (cao 2 tile). **[CHỐT?]**
- Kỹ thuật viên: cao ~48 px, đầu hơi to so với thân (giọng "hơi dễ thương"). **[CHỐT?]**

## Bảng màu (25 màu, ĐÃ DUYỆT, khoá 2026-10-24)
| Hex | Nhóm | Tên gợi nhớ |
|---|---|---|
| `#0F1420` | Trung tính | Đen đêm (viền) |
| `#1B2233` | Trung tính | Xám than |
| `#2A3347` | Trung tính | Xanh đêm |
| `#3D4860` | Trung tính | Thép tối |
| `#5B6882` | Trung tính | Thép |
| `#8793AB` | Trung tính | Thép nhạt |
| `#B9C2D3` | Trung tính | Bạc |
| `#EEF1F7` | Trung tính | Trắng sương |
| `#46506A` | Sàn/tường | Sàn |
| `#34405A` | Sàn/tường | Tường |
| `#3DDC84` | LED xanh | Xanh LED sáng |
| `#1F8F55` | LED xanh | Xanh LED tối |
| `#FF4D4D` | LED đỏ | Đỏ báo động |
| `#A82A35` | LED đỏ | Đỏ tối |
| `#FFB020` | LED vàng cam | Hổ phách |
| `#B36B10` | LED vàng cam | Hổ phách tối |
| `#3FC7EE` | Cyan (mạng, sửa) | Cyan sáng |
| `#1D7FA8` | Cyan (mạng, sửa) | Cyan tối |
| `#FFD84A` | Điện | Vàng điện |
| `#FF7A3D` | Nhiệt | Cam nhiệt |
| `#F0C39A` | Kỹ thuật viên | Da |
| `#C48A63` | Kỹ thuật viên | Bóng da |
| `#3A2A22` | Kỹ thuật viên | Tóc |
| `#2F6FD6` | Kỹ thuật viên | Áo sáng |
| `#1D447F` | Kỹ thuật viên | Áo tối |

Dự trữ: còn 7 ô màu (tối đa 32), **dự trữ, chưa dùng**. Không thêm màu ngoài bảng khi chưa duyệt.

## Bảng trạng thái LED (ĐÃ DUYỆT, khoá 2026-10-24)
Mỗi trạng thái phải có đủ 3 tín hiệu (màu + nhịp + icon), không dựa vào màu đơn lẻ vì người mù màu dễ lẫn xanh/đỏ.

| Trạng thái | Màu | Nhịp | Icon |
|---|---|---|---|
| Bình thường | xanh lá (`#3DDC84`/`#1F8F55`) | sáng đều, nhấp nhẹ chậm | không icon |
| Cảnh báo (nóng, quá tải) | vàng cam (`#FFB020`/`#B36B10`) | nhấp chậm | icon "!" tam giác nổi trên rack |
| Hỏng | đỏ (`#FF4D4D`/`#A82A35`) | nhấp nhanh + đèn báo động quay | icon "✕" tròn nổi trên rack |
| Đang sửa | cyan (`#3FC7EE`/`#1D7FA8`) | quét chạy | icon cờ lê |

LED to tối thiểu 4×4 px, viền tối 1 px (`#0F1420`) quanh LED.

## Quy tắc đọc được trên điện thoại
- Trạng thái thiết bị phải nhận ra bằng màu LED + nhịp + icon, không chỉ bằng chi tiết nhỏ.
- Vùng chạm tối thiểu cho nút UI: 44×44 px.
- Hitbox bấm 44×44 px cho vật thể nhỏ hơn 44 px (vùng bấm lớn hơn hình vẽ). **[CHỐT?]**
- Chữ và nút là HTML/React, không vẽ trong canvas. **[CHỐT?]**

## Thế giới lớn, ghép phòng dạng module
- Tile tường/sàn làm dạng module để ghép phòng to nhỏ tuỳ ý (thế giới kéo thả được, xem GDD mục 3.7).
- Giữ 25 màu ở trên, không thêm màu cho phần này.

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
- Font phải hỗ trợ đủ dấu tiếng Việt (ví dụ: ă, â, ê, ô, ơ, ư, đ và các dấu thanh như ặ, ờ, ữ). Nhiều font pixel chỉ có chữ Latin cơ bản; thử hiển thị một câu tiếng Việt đầy đủ trước khi chọn.
- Chưa có asset thật thì dùng ô vuông màu làm placeholder, đừng chặn tiến độ.

## Danh sách asset tối thiểu
Môi trường: tile sàn, tường, cửa, cáp; dạng module để ghép phòng: tường thẳng, tường góc trong, tường góc ngoài, cửa, sàn lặp được (tileable). Thiết bị: rack (idle/lỗi/sửa), tủ nguồn, điều hòa. Nhân vật: kỹ thuật viên 4 hướng × (đứng, đi, sửa, bê đồ, hoảng). Hiệu ứng: LED, tia lửa, khói, đèn báo động, hơi nóng. UI: icon tiền/điện/nhiệt/SLA/uptime, nút, khung panel, thẻ hợp đồng, font. Âm thanh: quạt nền, cảnh báo, click, tiền.

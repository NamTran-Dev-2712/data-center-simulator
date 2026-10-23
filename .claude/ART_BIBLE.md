# ART BIBLE — Data Center Incident Simulator (v0.3)

> Style guide 3D low-poly (2.5D). Quyết định ngày 2026-10-24, thay thế toàn bộ v0.2. Bản pixel art v0.2 đã bỏ, xem lịch sử git (`git show 525b1e1:.claude/ART_BIBLE.md`).
> Số liệu lấy từ spike trên nhánh `spike/3d-look` (commit `61d7b0c`, file `src/spike3d/themes.ts`, `scene.ts`, `main.ts`).
> Phần ghi **ĐÃ DUYỆT, khoá <ngày>** là giá trị chủ dự án đã duyệt, không tự ý đổi. Phần **[CHỐT?]** là đề xuất, chờ duyệt; khi duyệt thì ghi ngày khoá.

## Phong cách (ĐÃ DUYỆT, khoá 2026-10-24)
- Khối đơn giản, low-poly; **bo cạnh nhẹ**, không cạnh sắc.
- **Màu phẳng** (flat), không texture chi tiết.
- **Ánh sáng mềm + bóng đổ nhẹ.**
- Nhân vật: **thân tròn, đầu to** (tỉ lệ chibi), áo xanh.
- Cảm giác: phòng máy sạch, gọn; LED nổi bật để đọc trạng thái nhanh trên màn hình nhỏ.
- Giọng điệu (chốt trong GDD): nghiêm túc, hơi dễ thương. Không máu, không cháy dữ dội.
- Ảnh tham chiếu của chủ dự án chỉ là mốc phong cách. **Không sao chép** nhân vật, bố cục, giao diện hay tài sản của game khác.
- Giao diện **sáng là mặc định**. Giao diện tối là tuỳ chọn, để ở Backlog (bảng màu tối đã có sẵn bên dưới).

## Camera & kích thước (từ spike)
Đơn vị: 1 đơn vị thế giới = 1 ô sàn.

| Thông số | Giá trị trong spike |
|---|---|
| Loại camera | Trực giao (`OrthographicCamera`): vật ở xa không nhỏ lại |
| Góc nhìn | Đặt lệch `(20, 20, 20)` so với điểm nhìn = isometric chuẩn: xoay 45° quanh trục đứng, nghiêng xuống ≈35,26° |
| Khung nhìn | Cao 12 đơn vị ở zoom 1 (`VIEW_HEIGHT = 12`) |
| Zoom mặc định | Vừa khít cả phòng (màn dọc thì theo chiều ngang), hệ số lề 0.96 |
| Giới hạn zoom | Từ 0.8× đến 4× mức vừa khít |
| Biên kéo | Điểm nhìn nằm trong ±5 (`ROOM_SIZE / 2`) theo trục x và z |
| Ngưỡng chạm/kéo | Di dưới 8 px CSS = chạm; quá ngưỡng = kéo camera |
| Phòng | 10 × 10 ô (`ROOM_SIZE = 10`); chỉ dựng tường sau + tường trái; tường cao 3, dày 0.25; bệ sàn 10.4 × 10.4, dày 0.4 |
| Rack | 0.8 rộng × 2 cao × 1 sâu; 4 khay/rack (khay 0.7 × 0.28 × 0.06); nắp 0.86 × 0.1 × 1.06 |
| LED | 0.18 × 0.18 × 0.05, mỗi khay 1 LED |
| Bo cạnh (bán kính) | rack 0.06 · nắp 0.04 · khay 0.025 · LED 0.03 · tường 0.1 · bệ 0.15 |
| Kỹ thuật viên | Cao ≈1.5 (tới đỉnh tóc); đầu cầu bán kính 0.34, thân dạng viên nang (capsule) |
| Ánh sáng | 1 `HemisphereLight` (sáng nền mềm) + 1 `DirectionalLight` ở `(5, 10, 6)`, có bóng đổ, shadow map 1024 × 1024 |

## Bảng màu (ĐÃ DUYỆT, khoá 2026-10-24)
Ghi đúng dạng trong `themes.ts` (`0x` + 6 ký tự chữ thường) để so khớp từng ký tự với code.

| Vai trò | Khoá trong code | Sáng (`LIGHT`, mặc định) | Tối (`DARK`, tuỳ chọn) |
|---|---|---|---|
| Nền ngoài phòng | `background` | `0xe6eaf2` | `0x0f1420` |
| Sàn / bệ | `floor` | `0xb9b5d0` | `0x46506a` |
| Đường lưới sàn | `grid` | `0xa29ec0` | `0x3d4860` |
| Tường | `wall` | `0xdde2ee` | `0x34405a` |
| Thân rack | `rackBody` | `0x8ea3c2` | `0x2a3347` |
| Nắp rack | `rackTop` | `0x7487a8` | `0x3d4860` |
| Mặt khay | `tray` | `0x3d4860` | `0x5b6882` |
| Ánh sáng trời (hemisphere) | `hemiSky` | `0xffffff` | `0xeef1f7` |
| Ánh sáng đất (hemisphere) | `hemiGround` | `0x9a98b5` | `0x2a3347` |
| Cường độ hemisphere | `hemiIntensity` | `1.5` | `1.6` |
| Cường độ đèn chính | `sunIntensity` | `1.5` | `1.6` |

Kỹ thuật viên (dùng chung cả hai giao diện):

| Vai trò | Khoá | Màu |
|---|---|---|
| Da | `skin` | `0xf0c39a` |
| Tóc, mắt | `hair` | `0x3a2a22` |
| Áo | `shirt` | `0x2f6fd6` |
| Quần | `pants` | `0x1d447f` |

LED (dùng chung): `LED_GREEN` = `0x3ddc84`, `LED_RED` = `0xff4d4d`.

Thêm màu mới phải được duyệt. Màu vàng cam và cyan ở bảng trạng thái dưới đây chưa có trong spike; khi đưa vào code thì dùng đúng giá trị ở bảng đó.

## Bảng trạng thái thiết bị (ĐÃ DUYỆT, khoá 2026-10-24)
Mỗi trạng thái phải có đủ 3 tín hiệu (màu + nhịp + icon), không dựa vào màu đơn lẻ vì người mù màu dễ lẫn xanh/đỏ.

| Trạng thái | Màu | Nhịp | Icon |
|---|---|---|---|
| Bình thường | xanh lá `#3DDC84` | sáng đều, nhấp nhẹ chậm | không icon |
| Cảnh báo (nóng, quá tải) | vàng cam `#FFB020` | nhấp chậm | icon "!" tam giác |
| Hỏng | đỏ `#FF4D4D` | nhấp nhanh + đèn báo động quay | icon "✕" tròn |
| Đang sửa | cyan `#3FC7EE` | quét chạy | icon cờ lê |

- LED đọc được ở mức zoom mặc định. **[CHỐT?]** (Spike S2 trên Galaxy A14: ở zoom vừa khít phòng, LED thấy được nhưng nhỏ; kiểm tra lại ở Phase 3.)
- Icon trạng thái nổi trên rack (luôn quay mặt về camera). **[CHỐT?]**

## Cách dựng asset
1. **Dựng bằng code từ hình khối trước** (hộp, hộp bo góc, viên nang, cầu của Three.js). Chưa có bản đẹp thì dùng khối màu đơn giản, đừng chặn tiến độ.
2. **Mô hình ngoài** chỉ dùng khi giấy phép là **CC0** hoặc **cho phép dùng thương mại**; phải ghi **nguồn + giấy phép**.
3. **Công cụ AI tạo 3D:** kiểm tra điều khoản thương mại trước khi dùng kết quả.
4. **Gemini (AI ảnh) chỉ dùng làm ảnh ý tưởng**, không dùng làm asset.
5. Vật lặp lại dùng instancing, phần tĩnh gộp hình (xem ARCHITECTURE, mục "Hiệu năng 3D").
6. Làm 1 món → ghép thử vào cảnh → rồi mới làm hàng loạt.

## UI
- UI là **HTML/React** đè lên canvas, không vẽ chữ trong canvas.
- Vùng chạm tối thiểu **44 × 44 px CSS**.
- Vật 3D nhỏ (LED, cáp) bấm qua vật chứa nó (ví dụ cả rack) hoặc có vùng bấm lớn hơn hình. **[CHỐT?]**
- Font phải hỗ trợ đủ dấu tiếng Việt (ví dụ: ă, â, ê, ô, ơ, ư, đ và các dấu thanh như ặ, ờ, ữ); thử hiển thị một câu tiếng Việt đầy đủ trước khi chọn.
- Kiểm tra điều khoản thương mại của font và âm thanh trước khi phát hành.

## Thế giới lớn, ghép phòng dạng module
- Sàn và tường dựng theo ô 1 × 1 để ghép phòng to nhỏ tuỳ ý (thế giới kéo được, xem GDD mục 3.7).
- Dùng bảng màu ở trên, không thêm màu cho phần này khi chưa duyệt.

## Cảnh báo
- Hoạt ảnh nhân vật làm từng bước: dựng tĩnh → đi → sửa.

## Danh sách asset tối thiểu (3D)
- **Môi trường:** sàn, tường (thẳng, góc), cửa, cáp.
- **Thiết bị:** rack (4 trạng thái ở bảng trên), tủ nguồn, điều hoà.
- **Nhân vật:** kỹ thuật viên có hoạt ảnh đi và sửa.
- **Hiệu ứng:** LED, tia lửa, khói, đèn báo động.
- **Icon UI:** tiền, điện, nhiệt, SLA, uptime; nút, khung panel, thẻ hợp đồng, font.
- **Âm thanh:** quạt nền, cảnh báo, click, tiền.

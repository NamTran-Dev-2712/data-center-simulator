# TASKS — Data Center Incident Simulator

> Nguồn sự thật về tiến độ. Claude cập nhật file này cuối mỗi bước. Trạng thái: [ ] chưa làm · [~] đang làm · [x] xong.

## Đang ở: Phase 1 — T1.1 xong; việc kế tiếp: T1.2 (prompt gốc cho AI ảnh + thử 1 rack)

### Phase 0: Scope & setup
- [x] T0.1 Chốt các câu hỏi mở trong `GDD.md` mục 8 (ít nhất: cách kiếm tiền, ngôn ngữ trong game).
  - Xong khi: ông trả lời, Claude cập nhật GDD sang v0.2.
- [x] T0.2 Cài môi trường (Node.js LTS, Git, VS Code, Claude Code). Claude hướng dẫn từng lệnh.
  - Xong khi: `node -v`, `git --version` chạy được.
- [x] T0.3 Tạo repo + khởi tạo Vite React TS, cài Phaser, Zustand, Vitest.
  - Xong khi: `npm run dev` mở trang trắng không lỗi; `npm run test` chạy được 1 test mẫu.
- [x] T0.4 Đặt `CLAUDE.md`, `GDD.md`, `ARCHITECTURE.md`, `TASKS.md` vào repo; tạo cấu trúc thư mục theo ARCHITECTURE.
  - Xong khi: Claude Code mở phiên mới, đọc được 4 file và tóm tắt đúng dự án.
- [x] T0.5 Commit đầu tiên + đẩy lên GitHub (làm bản sao lưu).
- [x] T0.6 Sửa đường dẫn tài liệu + kiểm tra kiểu cho tests/
- [x] T0.7 Tạo src/i18n/vi.json, en.json và hàm t(key) tối thiểu có test

### Phase 1: Art bible
- [x] T1.1 Hoàn thiện `ART_BIBLE.md` (palette, góc nhìn, kích thước tile).
- [ ] T1.2 Tạo prompt gốc cho AI ảnh và thử 1 rack.

### Phase 2: Asset tối thiểu
- [ ] T2.1 Tile sàn + tường.
- [ ] T2.2 Rack (idle / lỗi / đang sửa).
- [ ] T2.3 Kỹ thuật viên: 1 sprite đứng → 4 hướng → đi → sửa.
- [ ] T2.4 Hiệu ứng: LED, tia lửa, khói, đèn báo động.
- [ ] T2.5 Icon UI (tiền, điện, nhiệt, SLA, uptime), khung panel, nút, font.
- [ ] T2.6 Âm thanh cơ bản (quạt nền, cảnh báo, click, tiền).
  - Quy tắc: làm 1 asset → ghép thử vào game → rồi mới làm hàng loạt. Kiểm tra giấy phép thương mại.

### Phase 3: Vertical slice (1–2 tuần)
- [ ] Nhân vật đi trong phòng, click rack mở panel, LED nhấp nháy, 1 rack hỏng → bấm sửa → có hoạt ảnh. Chưa có kinh tế.
  - Cổng: nếu nhìn chưa đã mắt, quay lại sửa art trước khi đi tiếp.
- [ ] Camera kéo thả + pinch zoom, có biên; chạm khác kéo

### Phase 4: Lõi mô phỏng (mỗi mục kèm test)
- [ ] Đồng hồ game (tạm dừng/1x/2x)
- [ ] Công suất 4 trạng thái
- [ ] Chi phí vận hành
- [ ] Vòng đời hợp đồng
- [ ] SLA/uptime và phạt

### Phase 5: Kinh tế & hợp đồng
- [ ] Chợ hợp đồng NPC + độ phù hợp, thanh toán theo kỳ, gia hạn, màn hình tài chính

### Phase 6: Incident Director
- [ ] Rủi ro nền × tình trạng thiết bị, ngân sách sự cố, thời gian nghỉ

### Phase 7: Nhân sự, tự động hóa, cấp độ
### Phase 8: Hoàn thiện (tutorial, lưu game, cân bằng, âm thanh, hiệu năng điện thoại, cho người khác chơi thử)
### Phase 9: Thị trường người chơi (chỉ khi single-player đã vui)

## Backlog (ý tưởng chưa làm — không thực hiện cho đến khi được chuyển lên)
- Monetization (quảng cáo có thưởng, mua trong game, mở khoá, ví/xác nhận thanh toán ở server) — sau Phase 9, chỉ khi game đã vui.
- Hệ thống rút thăm (gacha) — cần kiểm tra luật trước.

## Nhật ký quyết định
- Stack: Vite + React + TS + Phaser 3 + Zustand + Vitest.
- MVP: 1 phòng, 1 kỹ thuật viên, 4 rack, 2 tài nguyên, 5 hợp đồng NPC, 3 sự cố.
- 2026-10-24: Dựng khung dự án (Phase 0). Phiên bản: Node.js 22.16.0, Vite 8.3.5, React 19.3.1, TypeScript 6.0.3, Phaser 3.90.0, Zustand 5.0.16, Vitest 5.0.5, oxlint 1.89.0 (template create-vite 9.3.1). Chọn Phaser 3.x (không phải 4.x mới nhất) theo stack đã chốt.
- 2026-10-24: Tài liệu dự án đặt trong `.claude/`, riêng `CLAUDE.md` ở gốc repo.
- 2026-10-24 (T0.1): Kiếm tiền = kết hợp quảng cáo, vật phẩm/tiền tệ trong game (vé gọi nhân vật, vé mở rương, mua thời gian/tiền bằng token nạp), bán bản mở khoá; chưa chốt chi tiết. MVP không có monetization. Ví tiền và xác nhận thanh toán sẽ nằm ở server khi làm.
- 2026-10-24 (T0.1): Ngôn ngữ = đa ngôn ngữ, bắt đầu tiếng Việt (mặc định) và tiếng Anh. Chữ hiển thị nằm trong `src/i18n/*.json`, code chỉ dùng mã khoá. GDD lên v0.2.
- 2026-10-24 (T1.1): ART_BIBLE v0.2. Khoá bảng màu 25 màu (7 ô dự trữ, tối đa 32) và bảng LED 4 trạng thái (màu + nhịp + icon). Hướng sáng, kích thước tile/rack/nhân vật, hitbox 44×44, chữ/nút bằng HTML/React vẫn [CHỐT?].
- 2026-10-24 (T1.1): GDD v0.3. Giọng điệu nghiêm túc, hơi dễ thương; công ty hư cấu không gắn quốc gia, tên tạm "NimbusCore". Thêm mục 3.7: thế giới lớn kéo thả + pinch zoom, chạm khác kéo; dữ liệu phòng có roomId + toạ độ thế giới. Nhiều phòng vẫn để sau MVP.

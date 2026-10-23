# TASKS — Data Center Incident Simulator

> Nguồn sự thật về tiến độ. Claude cập nhật file này cuối mỗi bước. Trạng thái: [ ] chưa làm · [~] đang làm · [x] xong.

## Đang ở: Phase 1 — T1.3 xong; việc kế tiếp: T1.4 (merge spike vào main, gỡ Phaser)

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
- [x] ~~T1.2 Tạo prompt gốc cho AI ảnh và thử 1 rack.~~ **Bỏ**, thay bằng spike 3D (S1, S2 trên nhánh `spike/3d-look`) và T1.3.
- [x] T1.3 Chuyển hướng sang 2.5D (3D low-poly, camera isometric), đổi stack sang Three.js trong tài liệu (GDD v0.4, ART_BIBLE v0.3, ARCHITECTURE, CLAUDE.md, PROMPT_PLAYBOOK).
- [ ] T1.4 Merge spike vào main thành lớp `game/` chính thức, gỡ Phaser.
  - Xong khi: test/build pass; vẫn kéo / pinch / chạm được.
- [ ] T1.5 Kiểm tra bundle size + vẽ theo nhu cầu (không vẽ liên tục khi cảnh đứng yên).

### Phase 2: Bộ dựng 3D tối thiểu (theo danh sách asset trong ART_BIBLE v0.3)
- [ ] T2.1 Sàn, tường (thẳng, góc), cửa, dạng module ghép phòng.
- [ ] T2.2 Rack (bình thường / cảnh báo / hỏng / đang sửa).
- [ ] T2.3 Tủ nguồn, điều hoà, cáp.
- [ ] T2.4 Kỹ thuật viên: dựng tĩnh → hoạt ảnh đi → hoạt ảnh sửa.
- [ ] T2.5 Hiệu ứng: LED, tia lửa, khói, đèn báo động.
- [ ] T2.6 Icon UI (tiền, điện, nhiệt, SLA, uptime), khung panel, nút, font.
- [ ] T2.7 Âm thanh cơ bản (quạt nền, cảnh báo, click, tiền).
  - Quy tắc: làm 1 món → ghép thử vào cảnh → rồi mới làm hàng loạt. Dựng bằng code trước; model ngoài phải CC0 hoặc cho phép thương mại, ghi nguồn.

### Phase 3: Vertical slice (1–2 tuần)
- [ ] Nhân vật đi trong phòng, click rack mở panel, LED nhấp nháy, 1 rack hỏng → bấm sửa → có hoạt ảnh. Chưa có kinh tế.
  - Cổng: nếu nhìn chưa đã mắt, quay lại sửa art trước khi đi tiếp.
  - Cổng: thử trên Galaxy A14 **và** một iPhone (FPS + kéo / pinch / chạm) trước khi đi tiếp.
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
- Giao diện tối làm tuỳ chọn (bảng màu đã có trong ART_BIBLE v0.3).
- Chuyển cảnh nhiều phòng / khu vực trong thế giới lớn.

## Nhật ký quyết định
- Stack: Vite + React + TS + Phaser 3 + Zustand + Vitest.
- MVP: 1 phòng, 1 kỹ thuật viên, 4 rack, 2 tài nguyên, 5 hợp đồng NPC, 3 sự cố.
- 2026-10-24: Dựng khung dự án (Phase 0). Phiên bản: Node.js 22.16.0, Vite 8.3.5, React 19.3.1, TypeScript 6.0.3, Phaser 3.90.0, Zustand 5.0.16, Vitest 5.0.5, oxlint 1.89.0 (template create-vite 9.3.1). Chọn Phaser 3.x (không phải 4.x mới nhất) theo stack đã chốt.
- 2026-10-24: Tài liệu dự án đặt trong `.claude/`, riêng `CLAUDE.md` ở gốc repo.
- 2026-10-24 (T0.1): Kiếm tiền = kết hợp quảng cáo, vật phẩm/tiền tệ trong game (vé gọi nhân vật, vé mở rương, mua thời gian/tiền bằng token nạp), bán bản mở khoá; chưa chốt chi tiết. MVP không có monetization. Ví tiền và xác nhận thanh toán sẽ nằm ở server khi làm.
- 2026-10-24 (T0.1): Ngôn ngữ = đa ngôn ngữ, bắt đầu tiếng Việt (mặc định) và tiếng Anh. Chữ hiển thị nằm trong `src/i18n/*.json`, code chỉ dùng mã khoá. GDD lên v0.2.
- 2026-10-24 (T1.1): ART_BIBLE v0.2. Khoá bảng màu 25 màu (7 ô dự trữ, tối đa 32) và bảng LED 4 trạng thái (màu + nhịp + icon). Hướng sáng, kích thước tile/rack/nhân vật, hitbox 44×44, chữ/nút bằng HTML/React vẫn [CHỐT?].
- 2026-10-24 (T1.1): GDD v0.3. Giọng điệu nghiêm túc, hơi dễ thương; công ty hư cấu không gắn quốc gia, tên tạm "NimbusCore". Thêm mục 3.7: thế giới lớn kéo thả + pinch zoom, chạm khác kéo; dữ liệu phòng có roomId + toạ độ thế giới. Nhiều phòng vẫn để sau MVP.
- 2026-10-24 (T1.3): Hướng hình ảnh đổi sang **2.5D = mô hình 3D low-poly, camera isometric cố định** (trực giao, kéo + pinch). Lớp vẽ đổi **Phaser 3 → Three.js 0.186.1**. GDD lên v0.4, ART_BIBLE lên v0.3.
- 2026-10-24 (T1.3): Kết quả spike `spike/3d-look` trên Galaxy A14: giống ảnh tham chiếu 8/10 (cả sáng và tối), 60 FPS khi đứng yên, thấp nhất 37–52 FPS, 17 draw call; kéo / pinch / chạm ổn. Spike chưa merge (làm ở T1.4).
- 2026-10-24 (T1.3): ART_BIBLE v0.3 thay thế các mục đã khoá của v0.2: pixel art góc 3/4, tile 32×32, rack 32×64, bảng 25 màu, LED 4×4 px, prompt AI ảnh, quy ước tên file png, quy trình spritesheet. Giữ bảng 4 trạng thái thiết bị (màu + nhịp + icon). Gemini chỉ còn làm ảnh ý tưởng.

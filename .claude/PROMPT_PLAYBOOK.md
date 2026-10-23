# PROMPT PLAYBOOK — làm việc với Claude (chat) và Claude Code

## Phân vai
- **Claude trong Project (chat này):** tư vấn, thiết kế, soạn prompt, rà soát kiến trúc, giải thích lỗi.
- **Claude Code (trong repo):** viết và sửa code, chạy lệnh, test.
Ông không cần tự viết prompt cho Claude Code: nhờ Claude trong Project soạn, rồi dán sang.

## Mở đầu mỗi phiên Claude Code
```
Đọc CLAUDE.md, .claude/GDD.md, .claude/ARCHITECTURE.md và .claude/TASKS.md.
Tóm tắt trong 5 dòng: game là gì, đang ở task nào, việc kế tiếp. Chưa viết code.
```

## Mẫu prompt giao việc (điền vào chỗ <...>)
```
Task: <T-số> — <tên việc, 1 câu>
Bối cảnh: <vì sao cần, liên quan phần nào của GDD>
Làm:
- <việc cụ thể 1>
- <việc cụ thể 2>
Không làm: <những thứ dễ bị làm lan ra>
Tiêu chí hoàn thành:
- <điều kiện kiểm tra được 1, ví dụ: test X pass>
- <điều kiện 2, ví dụ: npm run build không lỗi>
Trước khi code: liệt kê file sẽ tạo/sửa. Sau khi xong: báo cáo theo mẫu trong CLAUDE.md và cập nhật TASKS.md.
```

## Ví dụ đã điền
```
Task: T4.2 — Công suất 4 trạng thái
Bối cảnh: lõi mô phỏng, xem GDD mục 3.1.
Làm:
- Tạo src/core/capacity.ts với kiểu Capacity { physical, reserved, used, sellable } cho từng tài nguyên (power, network).
- Hàm reserve(), release(), tính sellable = physical - reserved.
- Test trong tests/capacity.test.ts.
Không làm: không đụng Phaser/React, không làm giao diện.
Tiêu chí hoàn thành:
- Test: không reserve vượt quá sellable; release trả lại đúng; số không bao giờ âm.
- npm run test và npm run build đều pass.
```

## Mẫu báo lỗi (đừng mô tả mơ hồ)
```
Lỗi khi: <ông làm gì>
Mong đợi: <điều đáng ra xảy ra>
Thực tế: <điều đã xảy ra>
Thông báo lỗi (dán nguyên văn, kể cả đoạn đỏ trong terminal / F12 Console):
<dán ở đây>
File vừa sửa gần nhất: <tên file nếu nhớ>
```

## Mẫu nhờ rà soát (cuối mỗi phase)
```
Rà soát kiến trúc sau Phase <n>: có chỗ nào vi phạm ARCHITECTURE.md (core import Phaser/React, luật chơi nằm trong ui/game, dữ liệu hard-code)?
Liệt kê vấn đề theo mức độ, đề xuất sửa, rồi cập nhật ARCHITECTURE.md nếu cấu trúc đã đổi. Chưa sửa code cho đến khi tui đồng ý.
```

## Quy tắc vàng
1. Một task nhỏ mỗi lần, có tiêu chí hoàn thành đo được, rồi commit.
2. Viết test cho `core/` trước khi làm giao diện cho tính năng đó.
3. Thấy Claude định làm nhiều hơn yêu cầu → bảo dừng, ý tưởng đó vào Backlog.
4. Sau mỗi task chạy thử bằng mắt (`npm run dev`), không chỉ tin báo cáo.
5. Commit sau mỗi task chạy được. Có lỗi lớn thì quay về commit trước, đừng vá chồng vá.
6. Phiên dài bị rối: mở phiên mới và dùng lại câu mở đầu ở trên.

## Cách Claude phải trả lời ông (tóm tắt)
Tiếng Việt, đơn giản; một bước một lần; lệnh trong khối code; có prompt soạn sẵn khi cần; kết thúc bằng "Bước tiếp theo:"; nói thật cái gì đã kiểm chứng và cái gì chưa.
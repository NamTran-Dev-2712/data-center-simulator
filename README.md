# Data Center Incident Simulator

Game tycoon 2D chạy trên trình duyệt, ưu tiên điện thoại. Người chơi điều hành một data center nhỏ: nhận hợp đồng cho thuê công suất, giữ thiết bị chạy ổn, xử lý sự cố, kiếm tiền và mở rộng.

Công nghệ: Vite + React + TypeScript, Phaser 3, Zustand, Vitest.

Tài liệu dự án: `CLAUDE.md` (gốc repo) và thư mục `.claude/` (GDD, kiến trúc, tiến độ, art bible, prompt).

## Cách chạy

Cần cài Node.js (bản LTS) trước.

```bash
npm install      # cài thư viện (chạy 1 lần, hoặc khi package.json thay đổi)
npm run dev      # chạy thử, mở http://localhost:5173
npm run test     # chạy test
npm run build    # đóng gói bản chạy thật vào thư mục dist/
npm run lint     # kiểm tra lỗi code
```

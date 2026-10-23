# ARCHITECTURE — Data Center Incident Simulator

## Stack (đã chốt)
| Lớp | Công nghệ | Vai trò |
|---|---|---|
| Build | Vite | Dev server + build |
| UI | React + TypeScript | Panel, menu, màn hình tài chính, thẻ hợp đồng |
| Cảnh game | Phaser 3 | Phòng máy 2D, nhân vật, hiệu ứng |
| State | Zustand | Cầu nối giữa UI và game |
| Test | Vitest | Test logic `core/` |

Phiên bản cụ thể (cài ngày 2026-10-24, xem `package.json`): Node.js 22.16.0, Vite 8.3.5, React 19.3.1, TypeScript 6.0.3, Phaser 3.90.0, Zustand 5.0.16, Vitest 5.0.5 (lint: oxlint 1.89.0, có sẵn trong template create-vite 9.3.1). Không dùng cú pháp từ trí nhớ nếu không chắc phiên bản; kiểm tra tài liệu chính thức.

## Nguyên tắc kiến trúc
1. **`core/` là bộ não.** TypeScript thuần, không import Phaser/React/DOM. Chạy được trong Vitest. Mọi luật chơi nằm ở đây.
2. **`game/` (Phaser) chỉ vẽ và nhận input**, đọc trạng thái từ core, gửi lệnh vào core.
3. **`ui/` (React) chỉ hiển thị và gửi lệnh**, không chứa luật chơi.
4. **Nội dung là dữ liệu.** Hợp đồng, thiết bị, sự cố định nghĩa trong `data/*.json` và được kiểm tra kiểu khi nạp.
5. **Deterministic khi có thể.** Mọi ngẫu nhiên đi qua một bộ sinh số ngẫu nhiên có seed, để test và tái hiện lỗi.
6. **Một chiều dữ liệu:** input → lệnh (command) → core cập nhật state → game/ui đọc state. Không để game và ui sửa state trực tiếp.
7. **State của `core/` là dữ liệu thuần JSON** (không class instance, không hàm) để lưu game dễ dàng và sau này chạy được trên server.

## Cấu trúc thư mục dự kiến
```
/src
  /core            # logic thuần, có test
    clock.ts       # đồng hồ game
    capacity.ts    # công suất 4 trạng thái
    contracts.ts   # vòng đời hợp đồng, SLA
    finance.ts     # thu chi
    incidents.ts   # Incident Director
    rng.ts         # random có seed
    types.ts
  /data            # JSON nội dung
    contracts.json
    equipment.json
    incidents.json
  /game            # Phaser
    scenes/
    entities/
  /ui              # React
    components/
    screens/
  /store           # Zustand, cầu nối core ↔ ui/game
  /save            # lưu/nạp game (localStorage → IndexedDB sau)
/public/assets     # ảnh, âm thanh (xem ART_BIBLE.md)
/tests
```

## Lưu game
Bản lưu có trường `version`. Khi đổi cấu trúc state, thêm hàm migrate. MVP: localStorage; nâng IndexedDB ở Phase 8.

## Chuẩn code
- TypeScript `strict`. Không dùng `any` trừ khi có comment lý do.
- Hàm nhỏ, tên rõ. Code và tên biến bằng tiếng Anh; giải thích cho ông bằng tiếng Việt.
- Mỗi module `core/` có file test cạnh nó hoặc trong `/tests`.

## Hiệu năng (mobile)
Ưu tiên spritesheet/atlas, hạn chế số object cập nhật mỗi frame, kiểm tra trên điện thoại thật từ Phase 3.

## Quyết định đã chốt / chờ chốt
- Chốt: stack ở trên, tách `core/` khỏi Phaser và React.
- Chờ chốt: hosting/deploy, cơ chế kiếm tiền (ảnh hưởng đến backend và analytics).
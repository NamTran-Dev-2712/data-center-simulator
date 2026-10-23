# ARCHITECTURE — Data Center Incident Simulator

## Stack (đã chốt)
| Lớp | Công nghệ | Vai trò |
|---|---|---|
| Build | Vite | Dev server + build |
| UI | React + TypeScript | Panel, menu, màn hình tài chính, thẻ hợp đồng |
| Cảnh game | Three.js | Phòng máy 2.5D (3D low-poly, camera isometric), nhân vật, hiệu ứng |
| State | Zustand | Cầu nối giữa UI và game |
| Test | Vitest | Test logic `core/` |

Phiên bản cụ thể (cài ngày 2026-10-24, xem `package.json`): Node.js 22.16.0, Vite 8.3.5, React 19.3.1, TypeScript 6.0.3, Three.js 0.186.1 (+ `@types/three` 0.186.0; hiện mới cài ở nhánh `spike/3d-look`, vào main ở T1.4), Zustand 5.0.16, Vitest 5.0.5 (lint: oxlint 1.89.0, có sẵn trong template create-vite 9.3.1). Không dùng cú pháp từ trí nhớ nếu không chắc phiên bản; kiểm tra tài liệu chính thức.

## Nguyên tắc kiến trúc
1. **`core/` là bộ não.** TypeScript thuần, không import Three.js/React/DOM. Chạy được trong Vitest. Mọi luật chơi nằm ở đây.
2. **`game/` (Three.js) chỉ vẽ và nhận input**, đọc trạng thái từ core, gửi lệnh vào core.
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
  /game            # lớp vẽ Three.js (chỉ vẽ + nhận input)
    scene/         # dựng phòng, ánh sáng, vòng lặp vẽ
    entities/      # rack, kỹ thuật viên, hiệu ứng
    camera/        # camera isometric, kéo / pinch / chạm
    themes.ts      # bảng màu giao diện (xem ART_BIBLE.md)
  /ui              # React
    components/
    screens/
  /store           # Zustand, cầu nối core ↔ ui/game
  /save            # lưu/nạp game (localStorage → IndexedDB sau)
  /i18n            # file ngôn ngữ
    vi.json        # tiếng Việt (mặc định)
    en.json        # tiếng Anh
/public/assets     # ảnh, âm thanh (xem ART_BIBLE.md)
/tests
```

## Lưu game
Bản lưu có trường `version`. Khi đổi cấu trúc state, thêm hàm migrate. MVP: localStorage; nâng IndexedDB ở Phase 8.

## Đa ngôn ngữ
Mọi chữ hiển thị cho người chơi nằm trong file ngôn ngữ (`src/i18n/vi.json`, `src/i18n/en.json`). Code và `data/*.json` chỉ dùng mã khoá (key), không chứa chữ hiển thị trực tiếp. Ngôn ngữ mặc định: `vi`.

## Chuẩn code
- TypeScript `strict`. Không dùng `any` trừ khi có comment lý do.
- Hàm nhỏ, tên rõ. Code và tên biến bằng tiếng Anh; giải thích cho ông bằng tiếng Việt.
- Mỗi module `core/` có file test cạnh nó hoặc trong `/tests`.

## Hiệu năng 3D (mobile)
- **Instancing** cho vật lặp lại (khay, LED, rack...): nhiều bản sao giống nhau vẽ trong 1 lần (1 draw call).
- **Gộp hình tĩnh** (tường, sàn, các phần của một nhân vật) thành ít mesh nhất có thể.
- **Vẽ theo nhu cầu:** khi không có chuyển động hay hoạt ảnh thì không vẽ liên tục mỗi khung hình (tiết kiệm pin).
- **Đo FPS thật trên điện thoại.** Thiết bị chuẩn thấp: **Galaxy A14**. Mục tiêu tạm: tối thiểu >= 30 FPS, điển hình 60 FPS. **[CHỐT?]**
- **Đo cả kích thước bundle** (file JS sau build) mỗi khi thêm thư viện hoặc asset lớn.
- **Cấm thêm thư viện phụ** (react-three-fiber, drei, thư viện vật lý...) khi chưa hỏi chủ dự án.
- Kết quả spike S2 (Galaxy A14, giao diện sáng/tối): 60 FPS khi đứng yên, thấp nhất 37–52 FPS trong 5 giây, 17 draw call (trước khi tối ưu: 62); file JS trang thử 551 kB (gzip 139 kB).

## Nợ kỹ thuật
- Phaser 3.90.0 vẫn còn trong `package.json` cho đến khi làm T1.4 (merge spike, gỡ Phaser).
- Chưa thử trên iPhone (chỉ mới đo trên Galaxy A14).

## Quyết định đã chốt / chờ chốt
- Chốt: stack ở trên, tách `core/` khỏi Three.js và React. Lớp vẽ đổi từ Phaser 3 sang Three.js ngày 2026-10-24 (xem TASKS.md, nhật ký quyết định).
- Chờ chốt: hosting/deploy, cơ chế kiếm tiền (ảnh hưởng đến backend và analytics).
- Chờ chốt: khi có mua trong game thì ví tiền và xác nhận thanh toán phải nằm ở server, không nằm trong localStorage; chọn dịch vụ ở giai đoạn đó.
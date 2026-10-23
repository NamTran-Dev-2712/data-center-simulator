# CLAUDE.md — Data Center Incident Simulator

> Đặt file này ở GỐC repo. Claude Code tự đọc nó mỗi phiên. Bản trong project knowledge chỉ để đối chiếu.

## Project
2.5D (low-poly 3D models, fixed isometric camera, drag + pinch) mobile-first web tycoon game: run a small data center, take hosting contracts, keep equipment alive, handle incidents. Solo developer who does NOT write code; everything is vibe coded. Project docs live in `.claude/`: read `.claude/GDD.md`, `.claude/ARCHITECTURE.md`, `.claude/TASKS.md` (and `.claude/ART_BIBLE.md` for art) before any non-trivial work.

## Stack
Vite + React + TypeScript (UI), Three.js (2.5D scene), Zustand (shared state), Vitest (tests). Do not add or swap libraries without asking.

## Hard rules
1. `src/core/` is pure TypeScript. It must NOT import Three.js, React, or touch the DOM. All game rules live here and need unit tests.
2. `src/game/` (Three.js) and `src/ui/` (React) contain no game rules. They send commands to core and render state from it.
3. Content (contracts, equipment, incidents) lives in `src/data/*.json`, not hard-coded.
4. All randomness goes through the seeded RNG in `core/rng.ts`.
5. TypeScript strict mode. No `any` without a comment explaining why.
6. Do only the task asked. No unrelated refactors, no extra features. New ideas go in the Backlog section of `TASKS.md`.
7. Never invent library APIs. If unsure about Three.js/Zustand/Vite syntax for the installed version, check the installed package types or official docs first.
8. Stay within MVP scope in `GDD.md` section 4.
9. Every change to the rendering layer (`src/game/`) must be measured for FPS on a real phone when possible.

## Workflow for every task
1. Restate the task and its acceptance criteria in 2-3 lines.
2. List the files you will create or change. Wait for confirmation only if the change is large or touches architecture.
3. Implement in small steps. Write/update tests for any `core/` change.
4. Run: `npm run test` and `npm run build` (and `npm run lint` if configured). Fix failures.
5. Report using the format below. Then update `TASKS.md` (mark done, note follow-ups).
6. Suggest a commit message. Do not commit unless asked.

## How to talk to the owner (Trần Nam)
- Reply in **Vietnamese**, simple and direct; keep code, identifiers and commit messages in English.
- Explain jargon in one sentence the first time.
- Never ask the owner to edit code by hand. Give ready-to-run commands.
- Be honest: say what you ran and what you did NOT verify. If something fails, paste the key error and your diagnosis.

## Report format (end of every task)
```
✅ Đã làm: <1-3 dòng>
📁 File thay đổi: <danh sách>
🧪 Kiểm tra: <lệnh đã chạy + kết quả>
👀 Cách xem thử: <lệnh/bước để ông tự thấy kết quả>
⚠️ Lưu ý / chưa làm: <nếu có>
➡️ Bước tiếp theo đề xuất: <1 việc>
```

## Commands
- `npm install` — cài thư viện
- `npm run dev` — chạy thử (Vite dev server, http://localhost:5173)
- `npm run test` — chạy test một lần (`vitest run`)
- `npm run build` — kiểm tra kiểu + build (`tsc -b && vite build`)
- `npm run lint` — kiểm tra code (`oxlint`)
- `npm run preview` — xem bản build

## Assets
Build 3D objects in code from simple shapes first. External models only if licensed CC0 or allowed for commercial use; record source + license. Files that are needed (audio, external models) go in `public/assets/`. See `.claude/ART_BIBLE.md`. Placeholder shapes are fine until final art exists; never block on art.
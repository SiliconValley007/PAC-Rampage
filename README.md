# PAC-RAMPAGE: MAZE BREAKER

Single-file physics arcade. Open `index.html` or publish the repo root on GitHub Pages. Static only: no backend, no build step, no CDNs.

## Play

- Desktop: WASD/Arrows = move, Space = dash, P/Esc = pause, M = mute
- Touch: left stick = move, DASH = dash, pause button = pause
- Gamepad: left stick / D-pad = move, A = dash, Start = pause
- Hybrid laptop/tablet: touch UI only on coarse/no-hover pointers; keyboard otherwise

## Features

- Impulse physics, circle-vs-tile reflection, momentum-gated destruction
- Mass from pellets, hitbox capped to corridor width
- Rampage, 4 steering ghosts, debris impulses, combo/near-miss scoring
- Pause on blur / tab hide; best score + per-run stats
- Start-screen settings (master/SFX volume, mute, screenshake, haptics, reduced effects), persisted locally
- Adaptive quality (particles / glow / DPR) for 60/120/144 Hz and low-end devices
- Offline PWA (installable, versioned service worker)
- Procedural Web Audio SFX + dynamic music loop (no audio files)

## Controls

| Action     | Keyboard      | Touch        | Gamepad            |
| ---------- | ------------- | ------------ | ------------------ |
| Move       | WASD / Arrows | Left stick   | Left stick / D-pad |
| Dash       | Space         | DASH         | A                  |
| Pause      | P / Esc       | Pause button | Start              |
| Mute       | M             | Settings     | —                  |
| Fullscreen | FS button     | FS button    | —                  |

Menus are keyboard-navigable (Tab / arrows). Honors `prefers-reduced-motion`.

## Offline / PWA

- `manifest.webmanifest` + `sw.js` (HTML network-first, assets stale-while-revalidate)
- Add to Home Screen on Android / install on desktop
- After the first visit, reload works offline from the service worker cache
- Relative asset paths only (safe under `/<repo-name>/`)
- In-app "Update available – Reload" toast when a new worker is waiting

## Releasing

Bump `VERSION` in `sw.js` on every deploy so clients pick up the new cache. Push to the Pages branch; no build step.

## Manual test checklist

- Load title, change settings, reload — settings persist
- Start, move (WASD / stick / gamepad), dash, pause, resume, die, restart, level-up
- Mute (M), fullscreen button, first-run tutorial hint
- Rotate / resize — maze remaps, no stuck input
- Offline reload after first visit; SW update toast appears after a VERSION bump
- Touch + keyboard + gamepad; no console errors; works under `/<repo-name>/`

## Device support

- Safe-area insets for notch / Dynamic Island / home indicator
- `100dvh` + Visual Viewport resize (iOS Safari URL bar / rotate)
- Maze remaps on rotate/resize so playable area matches the screen
- Rampage meter sits under the HUD on phones (clear of joystick/dash); landscape shrinks controls
- Multi-touch: joystick and dash use separate touch ids
- `touch-action: none` on the canvas blocks pinch on the game surface; page zoom is not disabled; audio resumes after iOS backgrounding
- Adaptive DPR (2 / 1.5 / 1), viewport-culled tiles/pellets, object-pooled FX
- Fixed-timestep physics with interpolated render (same feel at 60/120/144 Hz)

## Tech notes

- Vanilla JS + Canvas 2D + Web Audio + Gamepad API
- localStorage wrapped with in-memory fallback
- No network calls other than same-origin static files
- No backend / server APIs / external CDNs

# PAC-RAMPAGE: MAZE BREAKER

Single-file physics arcade. Open `index.html` or publish the repo root on GitHub Pages.

## Play

- Desktop: WASD/Arrows = move, Space = dash, P/Esc = pause
- Touch: left stick = move, DASH = dash, pause button = pause
- Hybrid laptop/tablet: touch UI only on coarse/no-hover pointers; keyboard otherwise

## GitHub Pages

1. Push this repo (root contains `index.html`)
2. Settings → Pages → Deploy from branch → `/` (root)

No build step, no dependencies.

## Device support

- Safe-area insets for notch / Dynamic Island / home indicator
- `100dvh` + Visual Viewport resize (iOS Safari URL bar / rotate)
- Maze remaps on rotate/resize so playable area matches the screen
- Rampage meter sits under the HUD on phones (clear of joystick/dash); landscape shrinks controls
- Multi-touch: joystick and dash use separate touch ids
- Pinch/double-tap zoom blocked; audio resumes after iOS backgrounding
- DPR capped at 2, viewport-culled tiles/pellets, object-pooled FX

## Systems

- Impulse physics, circle-vs-tile reflection, momentum-gated destruction
- Mass from pellets, hitbox capped to corridor width
- Rampage, 4 steering ghosts, debris impulses, combo/near-miss scoring
- Pause on blur / tab hide; high score in localStorage
- Procedural Web Audio SFX: pellets, power, dash, hit, destroy, rampage, near-miss, mine, death, level-up, pause/resume, UI clicks (no audio files)

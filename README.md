# Mayaimi

A real-time medieval fantasy strategy game for iPhone, played in the browser.
Built with Phaser 3.

## Project layout

- `index.html` — fullscreen iPhone shell (viewport lock, home-screen manifest, no scroll/bounce/zoom)
- `manifest.webmanifest` + `assets/icons/` — Add to Home Screen support
- `src/main.js` — Phaser game config
- `src/scenes/` — one file per scene (`WorldMap.js`)
- `src/systems/` — game logic, separate from visuals (`clock.js`, `cameraControls.js`)
- `src/data/` — JSON data files (`regions.json`)
- `assets/` — images, audio

## Build tasks

Build tasks are posted as GitHub Issues. For each one: build it, comment on
the issue with what was done and any problems, then close it.

## Run locally

Serve this folder over HTTP (ES modules need it), e.g.:

```
python3 -m http.server 8000
```

then open http://localhost:8000/.

## Live

Hosted with GitHub Pages.

import { GameClock } from '../systems/clock.js';
import { addCameraControls } from '../systems/cameraControls.js';
import { DPR } from '../systems/display.js';
import { HUD } from './HUD.js';

/** Deterministic PRNG so the placeholder map is stable. */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class WorldMap extends Phaser.Scene {
  constructor() {
    super('WorldMap');
  }

  preload() {
    this.load.json('regions', 'src/data/regions.json');
    this.load.json('locations', 'src/data/locations.json');
    this.load.json('colors', 'src/data/colors.json');
    this.load.json('text', 'src/data/text.json');
    this.load.json('first15', 'src/data/first15.json');
  }

  create() {
    const regions = this.cache.json.get('regions');
    const locations = this.cache.json.get('locations');
    const colors = this.cache.json.get('colors');
    const text = this.cache.json.get('text');
    // Debug hook for automated verification (used by build-task tests).
    window.__mayaimi = window.__mayaimi || {};
    window.__mayaimi.scene = this;
    const T = regions.tileSize;
    const MW = regions.width * T, MH = regions.height * T;

    // --- Placeholder map: one Graphics object, colored tiles ---
    // Colors live in src/data/colors.json (single source of truth).
    const hex = (s) => parseInt(s.replace('#', ''), 16);
    const rand = mulberry32(20261020);
    const grass = colors.map.grass.map(hex);
    const g = this.add.graphics();

    const inEllipse = (tx, ty, f) => {
      const dx = (tx - f.cx) / f.rx, dy = (ty - f.cy) / f.ry;
      return dx * dx + dy * dy <= 1;
    };

    for (let ty = 0; ty < regions.height; ty++) {
      for (let tx = 0; tx < regions.width; tx++) {
        let color = grass[Math.floor(rand() * grass.length)];
        for (const f of regions.features) {
          if (!inEllipse(tx, ty, f)) continue;
          if (f.type === 'lake') color = hex(colors.map.lake);
          else if (f.type === 'dirt') color = hex(colors.map.dirt);
        }
        g.fillStyle(color, 1);
        g.fillRect(tx * T, ty * T, T, T);
        g.lineStyle(1, hex(colors.map.gridLine), colors.map.gridLineAlpha);
        g.strokeRect(tx * T, ty * T, T, T);
      }
    }

    // --- Camera: touch drag pan + pinch zoom, bounded to the map ---
    // Base zoom = DPR so the view shows the same world area as before,
    // but drawn at full device-pixel density. Pinch multiplies on top.
    const cam = this.cameras.main;
    cam.setBounds(0, 0, MW, MH);
    cam.setOrigin(0, 0); // zoom from top-left: (0,0) screen = (0,0) world
    // Camera starts at Vizcaya Hollow (the captain's home), not the map center.
    // Location comes from src/data/locations.json (cx/cy are tile coords).
    const hollow = (locations.locations || []).find((l) => l.id === 'vizcaya-hollow');
    const startX = hollow ? hollow.cx * T + T / 2 : MW / 2;
    const startY = hollow ? hollow.cy * T + T / 2 : MH / 2;
    cam.centerOn(startX, startY);
    cam.setZoom(DPR);
    const controls = addCameraControls(this, cam, { minZoom: 0.4 * DPR, maxZoom: 3.0 * DPR });
    controls.setBounds({ x: 0, y: 0, w: MW, h: MH });

    // Keep the camera viewport matched to the canvas on resize/rotation.
    this.scale.on('resize', (gameSize) => {
      cam.setViewport(0, 0, gameSize.width, gameSize.height);
      cam.setOrigin(0, 0);
      controls.refresh();
    });

    // --- Master game clock (single source of time; HUD only reads it) ---
    this.clock = new GameClock();

    // --- HUD: interface layer on top, own camera, never zooms/scrolls ---
    // (registered here so the SceneManager knows the HUD class)
    // HUD colors + strings come from the data files, passed via launch data.
    if (!this.scene.get('HUD')) this.scene.add('HUD', HUD, false);
    this.scene.launch('HUD', { clock: this.clock, colors: colors.hud, text: text.hud });
  }

  update(_time, delta) {
    this.clock.update(delta);
  }
}

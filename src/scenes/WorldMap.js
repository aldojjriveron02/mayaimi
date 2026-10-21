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
  }

  create() {
    const regions = this.cache.json.get('regions');
    // Debug hook for automated verification (used by build-task tests).
    window.__mayaimi = window.__mayaimi || {};
    window.__mayaimi.scene = this;
    const T = regions.tileSize;
    const MW = regions.width * T, MH = regions.height * T;

    // --- Placeholder map: one Graphics object, colored tiles ---
    const rand = mulberry32(20261020);
    const grass = [0x5d8a4a, 0x548142, 0x639254, 0x4f7d3e];
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
          if (f.type === 'lake') color = 0x3f7fbf;
          else if (f.type === 'dirt') color = 0x9a7b4f;
        }
        g.fillStyle(color, 1);
        g.fillRect(tx * T, ty * T, T, T);
        g.lineStyle(1, 0x000000, 0.08);
        g.strokeRect(tx * T, ty * T, T, T);
      }
    }

    // --- Camera: touch drag pan + pinch zoom, bounded to the map ---
    // Base zoom = DPR so the view shows the same world area as before,
    // but drawn at full device-pixel density. Pinch multiplies on top.
    const cam = this.cameras.main;
    cam.setBounds(0, 0, MW, MH);
    cam.centerOn(MW / 2, MH / 2);
    cam.setZoom(DPR);
    const controls = addCameraControls(this, cam, { minZoom: 0.4 * DPR, maxZoom: 3.0 * DPR });
    controls.setBounds({ x: 0, y: 0, w: MW, h: MH });

    // Keep the camera viewport matched to the canvas on resize/rotation.
    this.scale.on('resize', (gameSize) => {
      cam.setViewport(0, 0, gameSize.width, gameSize.height);
      controls.refresh();
    });

    // --- Master game clock (single source of time; HUD only reads it) ---
    this.clock = new GameClock();

    // --- HUD: interface layer on top, own camera, never zooms/scrolls ---
    // (registered here so the SceneManager knows the HUD class)
    if (!this.scene.get('HUD')) this.scene.add('HUD', HUD, false);
    this.scene.launch('HUD', { clock: this.clock });
  }

  update(_time, delta) {
    this.clock.update(delta);
  }
}

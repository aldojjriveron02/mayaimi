import { DPR } from '../systems/display.js';

/**
 * HUD — the interface layer. Runs on top of WorldMap with its own
 * camera that never zooms or scrolls, so buttons, labels, menus and
 * panels stay fixed on screen no matter what the map camera does.
 * All future UI goes here. It only READS the game clock; the clock
 * itself lives in /src/systems and stays the single source of time.
 *
 * The HUD camera zooms at DPR, so layout stays in normal screen points
 * while drawing at full device-pixel density. Text uses setResolution(DPR)
 * to stay crisp.
 */

/** Read the iPhone safe-area insets (Dynamic Island, home bar) via CSS env(). */
function getSafeArea() {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:0;left:0;visibility:hidden;' +
    'padding-top:env(safe-area-inset-top);padding-left:env(safe-area-inset-left);' +
    'padding-bottom:env(safe-area-inset-bottom);padding-right:env(safe-area-inset-right);';
  document.body.appendChild(el);
  const cs = getComputedStyle(el);
  const r = {
    top: parseFloat(cs.paddingTop) || 0,
    left: parseFloat(cs.paddingLeft) || 0,
    bottom: parseFloat(cs.paddingBottom) || 0,
    right: parseFloat(cs.paddingRight) || 0
  };
  el.remove();
  return r;
}

export class HUD extends Phaser.Scene {
  constructor() {
    super('HUD');
  }

  init(data) {
    this.gameClock = data.clock; // read-only: HUD never writes time
  }

  create() {
    // Debug hook for automated verification.
    window.__mayaimi = window.__mayaimi || {};
    window.__mayaimi.hud = this;

    // HUD camera: DPR zoom -> layout in screen points, drawn at device pixels.
    // Origin (0,0): the visible area starts at the top-left, where HUD items live.
    this.cameras.main.setZoom(DPR);
    this.cameras.main.setOrigin(0, 0);

    const labelStyle = {
      fontFamily: 'monospace', fontSize: '16px', color: '#ffe9b0',
      backgroundColor: 'rgba(0,0,0,0.55)', padding: { x: 8, y: 6 }
    };
    this.clockLabel = this.add.text(0, 0, '', labelStyle).setResolution(DPR).setDepth(100);
    this.renderLabel = this.add.text(0, 0, '', {
      fontFamily: 'monospace', fontSize: '12px', color: '#9fd8a8',
      backgroundColor: 'rgba(0,0,0,0.45)', padding: { x: 8, y: 5 }
    }).setResolution(DPR).setDepth(100);
    this.hint = this.add.text(0, 0, 'Drag to pan · Pinch to zoom', {
      fontFamily: 'monospace', fontSize: '13px', color: '#cfe3c0',
      backgroundColor: 'rgba(0,0,0,0.45)', padding: { x: 8, y: 6 }
    }).setResolution(DPR).setDepth(100);

    this.layout();
    this.scale.on('resize', (gameSize) => {
      this.cameras.main.setViewport(0, 0, gameSize.width, gameSize.height);
      this.cameras.main.setZoom(DPR);
      this.cameras.main.setOrigin(0, 0);
      this.layout();
    });

    this._lastMin = -1;
    this.tweens.add({ targets: this.hint, alpha: 0, delay: 4000, duration: 1200 });
  }

  /** Pin HUD elements inside the safe area. Called on create + resize. */
  layout() {
    const s = getSafeArea();
    this.clockLabel.setPosition(12 + s.left, 12 + s.top);
    this.renderLabel.setPosition(12 + s.left, 52 + s.top);
    this.hint.setPosition(12 + s.left, 84 + s.top);
    // Live proof of the render scale: canvas device pixels / CSS pixels.
    const c = this.game.canvas;
    const n = c.width / (c.clientWidth || 1);
    this.renderLabel.setText('Render: ' + n.toFixed(1) + 'x');
    this._lastMin = -1; // force a redraw after layout
  }

  update() {
    const m = this.gameClock.gameMinutes;
    if (m !== this._lastMin) {
      this._lastMin = m;
      this.clockLabel.setText('🕐 ' + this.gameClock.format());
    }
  }
}

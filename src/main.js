import { WorldMap } from './scenes/WorldMap.js';
import { DPR, gamePixelSize } from './systems/display.js';

// Canvas is sized in DEVICE pixels (window size x DPR) and shown at CSS
// size via zoom 1/DPR — this is what makes rendering actually sharp.
const startSize = gamePixelSize();
const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b1220',
  scale: {
    mode: Phaser.Scale.NONE,
    width: startSize.w,
    height: startSize.h,
    zoom: 1 / DPR
  },
  render: { antialias: true, roundPixels: false },
  disableContextMenu: true,
  scene: [WorldMap]
};

const game = new Phaser.Game(config);

// Re-fit the canvas in device pixels on window resize / rotation.
let resizeTimer = 0;
const refit = () => {
  const { w, h } = gamePixelSize();
  if (w !== game.scale.width || h !== game.scale.height) game.scale.resize(w, h);
};
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(refit, 120);
});
window.addEventListener('orientationchange', () => setTimeout(refit, 300));

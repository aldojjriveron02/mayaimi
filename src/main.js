import { WorldMap } from './scenes/WorldMap.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b1220',
  // Render at the device's real pixel density (capped at 2x: 3x costs
  // too much fill-rate on phones for no visible gain at game-view distance).
  resolution: Math.min(window.devicePixelRatio || 1, 2),
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
  render: { antialias: true, roundPixels: false },
  disableContextMenu: true,
  scene: [WorldMap]
};

new Phaser.Game(config);

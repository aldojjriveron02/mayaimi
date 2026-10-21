import { WorldMap } from './scenes/WorldMap.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b1220',
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

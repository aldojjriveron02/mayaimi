/**
 * display — real device pixels for sharp rendering.
 * Phaser 3 has no "resolution" game config (it would be silently ignored),
 * so sharpness is done properly: the game canvas is sized in DEVICE pixels
 * (window size x DPR) and displayed at CSS size via scale zoom 1/DPR.
 * Cameras then use DPR as their base zoom, so world/HUD units stay in
 * familiar screen points while everything draws at full pixel density.
 */
export const DPR = Math.min(window.devicePixelRatio || 1, 2);

/** Current window size in device pixels. */
export function gamePixelSize() {
  return {
    w: Math.max(1, Math.floor(window.innerWidth * DPR)),
    h: Math.max(1, Math.floor(window.innerHeight * DPR))
  };
}

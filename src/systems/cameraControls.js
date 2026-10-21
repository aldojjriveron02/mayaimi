/**
 * cameraControls — touch + mouse camera for the world map.
 * - One-finger (or mouse) drag: pan
 * - Two-finger pinch: zoom around the pinch midpoint
 * - Mouse wheel: zoom toward the cursor
 * Zoom is clamped to [minZoom, maxZoom] and the camera is
 * kept inside the world bounds.
 */
export function addCameraControls(scene, cam, options = {}) {
  const minZoom = options.minZoom ?? 0.4;
  const maxZoom = options.maxZoom ?? 3.0;

  scene.input.addPointer(2); // room for two touch points + mouse

  const tracked = new Map(); // pointerId -> {x, y}
  let pinchPrev = 0;

  const clampCam = () => {
    const z = Phaser.Math.Clamp(cam.zoom, minZoom, maxZoom);
    cam.setZoom(z);
    const vw = cam.width / z, vh = cam.height / z;
    const bx = cam._bounds || null;
    if (bx) {
      cam.scrollX = Phaser.Math.Clamp(cam.scrollX, bx.x, Math.max(bx.x, bx.x + bx.w - vw));
      cam.scrollY = Phaser.Math.Clamp(cam.scrollY, bx.y, Math.max(bx.y, bx.y + bx.h - vh));
      // If the world is smaller than the view, center it.
      if (vw >= bx.w) cam.scrollX = bx.x + (bx.w - vw) / 2;
      if (vh >= bx.h) cam.scrollY = bx.y + (bx.h - vh) / 2;
    }
  };

  /** Call once with the world rect {x, y, w, h} to bound the camera. */
  const setBounds = (rect) => { cam._bounds = rect; clampCam(); };

  scene.input.on('pointerdown', (p) => {
    tracked.set(p.id, { x: p.x, y: p.y });
    if (tracked.size === 2) {
      const [a, b] = [...tracked.values()];
      pinchPrev = Math.hypot(a.x - b.x, a.y - b.y);
    }
  });

  scene.input.on('pointermove', (p) => {
    if (!tracked.has(p.id)) return;
    const prev = tracked.get(p.id);
    const dx = p.x - prev.x, dy = p.y - prev.y;
    tracked.set(p.id, { x: p.x, y: p.y });

    if (tracked.size === 1) {
      // Single-finger / mouse drag: pan.
      cam.scrollX -= dx / cam.zoom;
      cam.scrollY -= dy / cam.zoom;
      clampCam();
    } else if (tracked.size === 2) {
      // Pinch: zoom around midpoint, plus pan by midpoint drift.
      const [a, b] = [...tracked.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchPrev > 0 && dist > 0) {
        const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
        const worldBefore = cam.getWorldPoint(midX, midY);
        cam.setZoom(Phaser.Math.Clamp(cam.zoom * (dist / pinchPrev), minZoom, maxZoom));
        const worldAfter = cam.getWorldPoint(midX, midY);
        cam.scrollX += worldBefore.x - worldAfter.x;
        cam.scrollY += worldBefore.y - worldAfter.y;
      }
      pinchPrev = dist;
      clampCam();
    }
  });

  const release = (p) => {
    tracked.delete(p.id);
    if (tracked.size < 2) pinchPrev = 0;
  };
  scene.input.on('pointerup', release);
  scene.input.on('pointerupoutside', release);
  scene.input.on('pointercancel', release);

  // Desktop: wheel to zoom toward cursor.
  scene.input.on('wheel', (p, _objs, dx, dy) => {
    const worldBefore = cam.getWorldPoint(p.x, p.y);
    const factor = dy > 0 ? 0.9 : 1.1;
    cam.setZoom(Phaser.Math.Clamp(cam.zoom * factor, minZoom, maxZoom));
    const worldAfter = cam.getWorldPoint(p.x, p.y);
    cam.scrollX += worldBefore.x - worldAfter.x;
    cam.scrollY += worldBefore.y - worldAfter.y;
    clampCam();
  });

  return { setBounds, refresh: clampCam };
}

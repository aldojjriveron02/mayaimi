/**
 * GameClock — the master game clock.
 * Ticks every real second. 1 real minute = 1 in-game hour
 * (so 1 real second = 1 in-game minute).
 */
export class GameClock {
  constructor() {
    this.gameMinutes = 0;   // total in-game minutes elapsed
    this._acc = 0;          // leftover real milliseconds
    this._tickHandlers = [];
  }

  /** Call every frame with the scene's delta (ms). */
  update(deltaMs) {
    this._acc += deltaMs;
    let ticked = false;
    while (this._acc >= 1000) {
      this._acc -= 1000;
      this.gameMinutes += 1;
      ticked = true;
    }
    if (ticked) {
      for (const h of this._tickHandlers) h(this);
    }
  }

  /** Register a callback run once per tick (per in-game minute). */
  onTick(handler) {
    this._tickHandlers.push(handler);
  }

  get day() { return Math.floor(this.gameMinutes / 1440) + 1; }
  get hour() { return Math.floor(this.gameMinutes / 60) % 24; }
  get minute() { return this.gameMinutes % 60; }

  /** "Day 3 · 07:05" */
  format() {
    const p = (n) => String(n).padStart(2, '0');
    return `Day ${this.day} · ${p(this.hour)}:${p(this.minute)}`;
  }
}

// Web Audio API sound synthesizer — no external files needed
// All sounds generated programmatically

let audioCtx = null;
let ambientOsc = null;
let ambientGain = null;

function getCtx() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("[Sound] Web Audio API not supported");
      return null;
    }
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Keyboard click sound
 */
export function playKeypress() {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

/**
 * Command executed beep
 */
export function playCommandBeep() {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.setValueAtTime(900, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

/**
 * Button click
 */
export function playClick() {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
}

/**
 * Hover tick
 */
export function playHover() {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(2000, ctx.currentTime);

  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.02);
}

/**
 * Error buzz
 */
export function playError() {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

/**
 * Success chime
 */
export function playSuccess() {
  const ctx = getCtx();
  if (!ctx) return;

  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.08);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + i * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + i * 0.08 + 0.25
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.08);
    osc.stop(ctx.currentTime + i * 0.08 + 0.3);
  });
}

/**
 * Ambient background hum — start
 */
export function startAmbient() {
  const ctx = getCtx();
  if (!ctx || ambientOsc) return;

  ambientOsc = ctx.createOscillator();
  ambientGain = ctx.createGain();

  ambientOsc.type = "sine";
  ambientOsc.frequency.setValueAtTime(55, ctx.currentTime); // low A

  // Very low volume
  ambientGain.gain.setValueAtTime(0, ctx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);

  // Add subtle LFO for "breathing" effect
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
  lfoGain.gain.setValueAtTime(0.005, ctx.currentTime);

  lfo.connect(lfoGain);
  lfoGain.connect(ambientGain.gain);

  ambientOsc.connect(ambientGain);
  ambientGain.connect(ctx.destination);

  ambientOsc.start();
  lfo.start();
}

/**
 * Ambient background hum — stop
 */
export function stopAmbient() {
  if (ambientOsc && ambientGain && audioCtx) {
    ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    setTimeout(() => {
      if (ambientOsc) {
        ambientOsc.stop();
        ambientOsc = null;
      }
      ambientGain = null;
    }, 600);
  }
}
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

function getContext() {
  const AC = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
  if (!AC) return null;
  ctx ??= new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function getNoise(c: AudioContext) {
  if (noise) return noise;
  const length = Math.floor(c.sampleRate * 0.03);
  noise = c.createBuffer(1, length, c.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return noise;
}

export function playClick() {
  if (typeof window === "undefined") return;
  try {
    const c = getContext();
    if (!c) return;
    const t = c.currentTime;

    const src = c.createBufferSource();
    src.buffer = getNoise(c);
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3500;
    filter.Q.value = 0.9;
    const tickGain = c.createGain();
    tickGain.gain.setValueAtTime(0.5, t); 
    tickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.014);
    src.connect(filter).connect(tickGain).connect(c.destination);
    src.start(t);

    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.03);
    const bodyGain = c.createGain();
    bodyGain.gain.setValueAtTime(0.2, t); 
    bodyGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
    osc.connect(bodyGain).connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  } catch {
  }
}
/**
 * Web Audio API Haptic Synthesizer
 * Zero bandwidth, zero audio files.
 * Generates tactile micro-sound clicks mimicking physical hardware (Apple Taptic Engine).
 */

class HapticAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      this.isMuted = (localStorage.getItem('vox_audio_muted') || localStorage.getItem('reviewiq_audio_muted')) === 'true';
    } catch {}
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('vox_audio_muted', String(muted));
    } catch {}
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play an ultra-subtle tactile transient
   */
  public play(type: 'click' | 'pop' | 'slide' | 'whoosh' | 'laptop' | 'hover' = 'click') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'hover') {
        // Ultra-delicate micro-tick for cursor hovering (12ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.012);

        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

        osc.start(now);
        osc.stop(now + 0.012);
      } else if (type === 'click') {
        // High-precision mechanical key/button click (18ms duration)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.018);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

        osc.start(now);
        osc.stop(now + 0.018);
      } else if (type === 'pop') {
        // Soft bubble pop for toggles and presets (28ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(860, now + 0.025);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

        osc.start(now);
        osc.stop(now + 0.028);
      } else if (type === 'laptop') {
        // Futuristic low-frequency mechanical hinge & chirp (45ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'slide') {
        // Swatch slide / micro-swipe (22ms)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.022);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

        osc.start(now);
        osc.stop(now + 0.022);
      }
    } catch {
      // AudioContext unavailable or blocked by autoplay policy
    }
  }
}

export const haptics = new HapticAudioEngine();


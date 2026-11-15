/**
 * Web Speech Synthesis Engine for VOX AI Executive Audio Briefings
 * Uses native browser SpeechSynthesis API (zero external downloads/bandwidth)
 */

class VoxSpeechEngine {
  private utterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlySpeaking: boolean = false;
  private onStateChangeListeners: Array<(speaking: boolean) => void> = [];

  public subscribe(listener: (speaking: boolean) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== listener);
    };
  }

  private notify(speaking: boolean) {
    this.isCurrentlySpeaking = speaking;
    this.onStateChangeListeners.forEach(l => l(speaking));
  }

  public getIsSpeaking(): boolean {
    return this.isCurrentlySpeaking && typeof window !== 'undefined' && window.speechSynthesis?.speaking;
  }

  public speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Stop ongoing speech
    this.stop();

    // Clean markdown asterisks, hashes, and formatting
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/•/g, ', ')
      .replace(/\n+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick best available natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
    };

    utterance.onerror = () => {
      this.notify(false);
    };

    this.utterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.notify(false);
  }

  public toggle(text: string) {
    if (this.getIsSpeaking()) {
      this.stop();
    } else {
      this.speak(text);
    }
  }
}

export const voxSpeech = new VoxSpeechEngine();

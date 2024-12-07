export class SoundManager {
  private static instance: SoundManager;
  private tapAudio: HTMLAudioElement;
  private successAudio: HTMLAudioElement;
  private isLoaded: { [key: string]: boolean } = {
    tap: false,
    success: false,
  };

  private constructor() {
    this.tapAudio = new Audio('https://panyero.website/wallet-app/assets/sounds/f2.mp3');
    this.successAudio = new Audio('https://panyero.website/wallet-app/assets/sounds/success.mp3');

    this.tapAudio.addEventListener('canplaythrough', () => {
      this.isLoaded.tap = true;
    });

    this.successAudio.addEventListener('canplaythrough', () => {
      this.isLoaded.success = true;
    });
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private async playSound(audio: HTMLAudioElement, type: 'tap' | 'success') {
    try {
      if (!this.isLoaded[type]) {
        await new Promise<void>((resolve) => {
          audio.addEventListener('canplaythrough', () => resolve(), { once: true });
        });
      }
      
      // Reset and play
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  public async playTapSound() {
    await this.playSound(this.tapAudio, 'tap');
  }

  public async playSuccessSound() {
    await this.playSound(this.successAudio, 'success');
  }
}

export const playTapSound = () => {
  SoundManager.getInstance().playTapSound();
};

export const playSuccessSound = () => {
  SoundManager.getInstance().playSuccessSound();
};
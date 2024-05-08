export const musicPlayer = {
    audio: new Audio(),
    currentSong: null,
    isPlaying: false,
    loopStart: 0,
    loopEnd: Infinity,

    play(songUrl, loopStart = 0, loopEnd = Infinity) {
        this.loopStart = loopStart;
        this.loopEnd = loopEnd;

        this.audio.src = songUrl;
        this.audio.play();
        this.isPlaying = true;

        // Monitor the time of the audio to handle looping
        this.audio.addEventListener('timeupdate', () => {
            if (this.audio.currentTime >= this.loopEnd) {
                this.audio.currentTime = this.loopStart;
            }
        });
    },

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.audio.removeEventListener('timeupdate', () => {});
    },

    swapSong(newSongUrl, loopStart = 0, loopEnd = Infinity) {
        this.loopStart = loopStart;
        this.loopEnd = loopEnd;

        if (this.isPlaying) {
            const fadeOutInterval = setInterval(() => {
                if (this.audio.volume > 0.1) {
                    this.audio.volume -= 0.1;
                } else {
                    clearInterval(fadeOutInterval);
                    this.stop();
                    this.playWithFadeIn(newSongUrl);
                }
            }, 100);
        } else {
            this.playWithFadeIn(newSongUrl);
        }
    },

    playWithFadeIn(newSongUrl, loopStart = 0, loopEnd = Infinity) {
        this.loopStart = loopStart;
        this.loopEnd = loopEnd;

        this.audio.volume = 0;
        this.play(newSongUrl);

        const fadeInInterval = setInterval(() => {
            if (this.audio.volume < 1) {
                this.audio.volume = Math.min(1, this.audio.volume + 0.1);
            } else {
                clearInterval(fadeInInterval);
            }
        }, 100);
    },
};
export class FarandulaMusicCollection {
    constructor() {
        this.dictionary = {};
    }

    addSong(key, audioUrl, loopStartTime, loopEndTime) {
        this.dictionary[key] = { audioUrl, loopStartTime, loopEndTime };
    }

    getSong(key) {
        return this.dictionary[key];
    }

    removeSong(key) {
        delete this.dictionary[key];
    }

    getAllSongs() {
        return Object.values(this.dictionary);
    }

    getKeys() {
        return Object.keys(this.dictionary);
    }

    hasSong(key) {
        return key in this.dictionary;
    }
}
import { createSystem, AudioSource } from '@iwsdk/core';

export class MusicSystem extends createSystem({
    // We don't necessarily need a query if we manage global state or a specific entity
    // But we need to find the audio entity
    audioSource: { required: [AudioSource] }
}) {
    init() {
        this.tracks = [
            'backgroundSound1',
            'backgroundSound2',
            'backgroundSound3',
            'backgroundSound4'
        ];
        this.currentTrackIndex = -1;
        this.PLAY_DURATION = 120000; // 2 minutes approx per track fallback if no event
        this.lastSwitchTime = 0;

        // Initial play
        // We defer to update to catch the entity
    }

    update() {
        // Implementation Note:
        // @iwsdk/core AudioSource might not expose "ended" event easily in this version.
        // We will implement a rotation logic based on time or just pick random on start if simple.
        // For "include all", a playlist is best. 
        // We'll iterate the tracks.

        const now = Date.now();
        if (now - this.lastSwitchTime > this.PLAY_DURATION || this.currentTrackIndex === -1) {
            this.playNextTrack();
        }
    }

    playNextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        const trackName = this.tracks[this.currentTrackIndex];

        this.queries.audioSource.entities.forEach(entity => {
            // How to switch src dynamically?
            // Component props update?
            // entity.setProperties({ AudioSource: { src: url } }) ??
            // Using standard SDK pattern:

            // Note: The 'assets' map in World.create defines keys.
            // If AudioSource 'src' refers to the Asset URL, we might need the raw URL.
            // But usually we pass the key if it's preloaded? 
            // In index.js we passed `assets.backgroundSound.url`.
            // Let's assume we need to pass the URL.

            // We need to know the URLs. 
            // I'll hardcode the mapping here or pass it in config.
            // For simplicity, I'll reconstruct the URL.

            // Map trackName to URL
            const urlMap = {
                'backgroundSound1': './background_sound/feel_galaxy_1.mp3',
                'backgroundSound2': './background_sound/feel_galaxy_2.mp3',
                'backgroundSound3': './background_sound/nebula_drift_1.mp3',
                'backgroundSound4': './background_sound/nebula_drift_2.mp3',
            };

            const nextUrl = urlMap[trackName];

            // Update component
            // entity.removeComponent(AudioSource); // might be crude
            // entity.addComponent(AudioSource, { ... })
            // Or try generic setProperties if available?
            // iwsdk entities usually have helper methods.

            // Safest way without docs: Remove and Add component to restart
            const audioComp = entity.getComponent(AudioSource);
            if (audioComp) {
                // If there's a way to set src, good. Defaults to recreating component.
                entity.removeComponent(AudioSource);
            }

            entity.addComponent(AudioSource, {
                src: nextUrl,
                loop: false, // We handle loop via playlist
                autoPlay: true,
                volume: 0.5,
            });
        });

        this.lastSwitchTime = Date.now();
    }
}

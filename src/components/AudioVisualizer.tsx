// components/AudioVisualizer.tsx
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

type AudioVisualizerProps = {
    src: string;
    onEnded?: () => void;
    isPlaying: boolean;
};

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ src, onEnded, isPlaying }) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
        if (!waveformRef.current) return;

        waveSurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#facc15', // Tailwind yellow-300
            progressColor: '#fbbf24',
            barWidth: 3,
            barRadius: 2,
            cursorWidth: 1,
            height: 100,
            normalize: true,
            backend: 'WebAudio',
        });

        waveSurferRef.current.load(src);

        waveSurferRef.current.on('finish', () => {
            onEnded?.();
        });

        return () => {
            waveSurferRef.current?.destroy();
        };
    }, [src, onEnded]);

    useEffect(() => {
        if (isPlaying) {
            waveSurferRef.current?.play();
        } else {
            waveSurferRef.current?.pause();
        }
    }, [isPlaying]);

    return <div ref={waveformRef} className="w-full" />;
};

export default AudioVisualizer;


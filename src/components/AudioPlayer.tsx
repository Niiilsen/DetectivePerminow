import React, {useRef, useEffect, useState} from 'react';
// @ts-ignore
import DetectiveIcon from "@/assets/detective-svgrepo-com.svg?react";

type AudioPlayerProps = {
    onEnded?: () => void;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({onEnded}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);


    const [showSkipBtn, setShowSkipBtn] = useState(!!localStorage.getItem("showSkipBtn"));

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            if (onEnded) {
                onEnded();
            }
            if(!localStorage.getItem("showSkipBtn")) {
                localStorage.setItem("showSkipBtn", "true");
            }
        };

        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [onEnded]);

    const handlePlay = () => {
        audioRef.current?.play();
        setIsPlaying(true);
        setTimeout(() => setShowSkipBtn(true), 10000);
    };

    const handleSkip = () => {
        audioRef.current?.pause();
        onEnded?.();
        if(!localStorage.getItem("showSkipBtn")) {
            localStorage.setItem("showSkipBtn", "true");
        }
    }

    return (
        <div>
            <audio ref={audioRef} src="/Detektiv_Perminow.mp3" preload="auto"/>

            {!isPlaying && (
                <button
                    className="border-yellow-300 border-2 text-yellow-300 px-4 py-2 text-5xl rounded-full font-display hover:cursor-pointer hover:bg-yellow-300 hover:text-black"
                    onClick={handlePlay}>PLAY AUDIO</button>

            )}{isPlaying && (
            <div className="flex flex-col gap-12 items-center justify-center relative">
                <div className="animate-hover">
                <DetectiveIcon className="fill-yellow-300 size-50 animate-pulse"/>
                </div>
                    {showSkipBtn && (
                    <button
                        className="absolute -bottom-25 left-1/2 -translate-x-1/2 border-yellow-300 border-2 text-yellow-300 px-4 py-2 text-3xl rounded-full font-display hover:cursor-pointer hover:bg-yellow-300 hover:text-black"
                        onClick={handleSkip}>SKIP
                    </button>
                )}
            </div>

        )}
        </div>
    );
};

export default AudioPlayer;

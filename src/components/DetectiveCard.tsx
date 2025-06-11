import {type FC, useRef, useState} from "react";
import Card from "./Card.tsx";

// @ts-ignore
import DetectiveIcon from "@/assets/detective-svgrepo-com.svg?react";
import clsx from "clsx";

export interface IDetectiveCard {
 code: string;
 text: string;
 cardIndex: number;
 unlocked: boolean;
 className?: string;
 onUnlocked?: (index: number) => void;
}
const DetectiveCard: FC<IDetectiveCard> = ({code, text, className, unlocked, onUnlocked, cardIndex}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [isUnlocked, setUnlocked] = useState(unlocked);
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const raw = e.target.value;
        const digit = raw.slice(-1); // only the last typed character

        if (!/^\d$/.test(digit)) return;

        e.target.value = digit;

        if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();

            inputContainerRef.current?.classList.toggle('animate-shake', false)
        } else {
            const parsedCode = inputRefs.current.map((ref) => ref?.value);
            const mergedCode = parsedCode.join("");

            loaderRef.current?.classList.toggle('scale-x-100', true)
            loaderRef.current?.classList.remove('opacity-0');

            setTimeout(() => {
                if (mergedCode !== code) {
                    inputContainerRef.current?.classList.toggle('animate-shake', true)
                    for (let i = 0; i < inputRefs.current.length; i++) {
                        if(inputRefs.current[i])
                            { // @ts-ignore
                                inputRefs.current[i].value = "";
                            }
                    }
                    inputRefs.current[0]?.focus()
                } else {
                    setUnlocked(true);
                    onUnlocked?.(cardIndex);
                }

                loaderRef.current?.classList.toggle('scale-x-100', false)
                loaderRef.current?.classList.add('opacity-0')
            }, 1000)


            console.log(mergedCode);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault(); // block pasting multiple characters
    };
    
    return (
        <Card className={clsx('perspective-midrange transform-3d transition-transform duration-1000', isUnlocked ? 'rotate-y-180' : '', className)}>
            <div className="backface-hidden flex flex-col justify-center items-center py-10">
                <DetectiveIcon className="fill-yellow-300 size-40"/>
                <div className="flex gap-4 mt-14" ref={inputContainerRef}>
                    {[0, 1, 2, 3].map((_, i) => (
                        <input
                            key={i}
                            ref={(el) => {
                                inputRefs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            onChange={(e) => handleInput(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                            className=" text-yellow-300 w-13 h-18 border-2 border-yellow-300 rounded-sm caret-yellow-300 placeholder-yellow-300/50 text-5xl p-1 text-center focus:outline-yellow-300 focus:outline-2"
                            placeholder=""
                            autoComplete="one-time-code"
                        />
                    ))}
                </div>
                <div className="w-full mt-4">
                    <div
                        className="h-1.5 bg-yellow-300 w-full origin-left scale-x-0 transition-transform duration-1000"
                        ref={loaderRef}></div>
                </div>
                <div className="font-display text-yellow-300/80 text-4xl uppercase pb-3 absolute right-8 top-4">{cardIndex+1}</div>
            </div>
                <div className="inset-0 absolute flex flex-col justify-center items-center rotate-y-180 bg-neutral-950 rounded-4xl backface-hidden">
                    <div className="font-display text-yellow-300/80 text-4xl uppercase pb-3 absolute right-8 top-4">{cardIndex+1}</div>
                    <p className="p-8 text-yellow-300 text-2xl text-center w-full">{text}</p>
                </div>
        </Card>
    )
}

export default DetectiveCard;
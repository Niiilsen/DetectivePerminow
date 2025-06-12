import {type FC, useState} from "react";
import DetectiveCard, {type IDetectiveCard} from "./components/DetectiveCard.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import AudioPlayer from "@/components/AudioPlayer.tsx";

const detectiveCards: IDetectiveCard[] = [
    {code: '2315', text: "Møt på The Irishman Pub kl 14:00", cardIndex: 0, unlocked: false},
]

const StartScreen: FC = () => {
    const [displayMessage, setDisplayMessage] = useState(true);
    const initializeCards = (): IDetectiveCard[] => {
        return detectiveCards.map((card) => {
            const isUnlocked = localStorage.getItem(card.code.toString());
            console.log(isUnlocked);
            if (isUnlocked) {
                console.log("here")
                return {
                    ...card,
                    unlocked: true
                }
            }

            return card;
        })
    }

    const [cards, setCards] = useState<IDetectiveCard[]>(initializeCards());

    const handleUnlocked = (index: number) => {
        console.log(index);
        setCards((old) => {
            const newArr = [...old];
            newArr[index].unlocked = true;
            localStorage.setItem(newArr[index].code.toString(), 'unlocked');
            return newArr;
        })
    }

    const handleAudioEnded = () => {
        setDisplayMessage(false);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            {displayMessage &&
                <AudioPlayer onEnded={handleAudioEnded}/>
            }

            {!displayMessage &&
                <div className="w-full flex justify-center">
                    <DetectiveCard {...cards[0]} className="max-w-96" onUnlocked={handleUnlocked}/>
                </div>
            }
        </div>
    );
};


export default StartScreen;

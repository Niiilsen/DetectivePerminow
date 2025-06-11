import {type FC, useState} from "react";
import DetectiveCard, {type IDetectiveCard} from "./components/DetectiveCard.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";

const detectiveCards: IDetectiveCard[] = [
    {code: '5529', text: "Møt oss på The Irishman Pub kl 14:00", cardIndex: 0, unlocked: false},
    {code: '0924', text: "Vi så noen som gikk mot heim med en blå boks!", cardIndex: 1, unlocked: false},
    {code: '2399', text: "Den blå boksen er meget gammel og tilhører fortiden", cardIndex: 2, unlocked: false},
    {code: '6969', text: "Man kan ha det mye moro med gammel teknologi", cardIndex: 3, unlocked: false},
    {code: '1961', text: "Gjenstanden har tidligere tilhørt deg", cardIndex: 4, unlocked: false}
]

const StartScreen: FC = () => {

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

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full">
                <Carousel className="my-auto">
                    <CarouselContent>
                        {cards.map((card) => {
                            return (
                                <CarouselItem key={card.code} className="px-6 md:px-12 max-w-128">
                                    <DetectiveCard {...card} className="" onUnlocked={handleUnlocked}/>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <div className={"absolute left-0 right-0 w-full h-20 flex justify-center gap-12 "}>
                    <CarouselPrevious className="relative left-0"/>
                    <CarouselNext className="relative left-0"/>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};


export default StartScreen;

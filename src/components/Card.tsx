import clsx from "clsx";
import type {FC, ReactNode} from "react";

interface ICardProps {
    children: ReactNode;
    className?: string;
}

const Card: FC<ICardProps> = ({children, className}) => {
    return (
        <div className={clsx('border-4 rounded-4xl border-yellow-300 p-8 flex flex-col justify-center items-center min-h-[400px] bg-neutral-950 relative', className)}>
            {children}
        </div>
    )
}

export default Card;
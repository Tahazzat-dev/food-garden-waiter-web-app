import {
    Clock, Clock1,
    Clock10, Clock11, Clock12,
    Clock2, Clock3, Clock4, Clock5, Clock6,
    Clock7, Clock8, Clock9
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Props = {
    showClock?: boolean;
    date: Date;
};

export default function Timer({ showClock = true, date }: Props) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // 1. Get Icon based on the ORDER'S creation hour
    const getOrderClockIcon = () => {
        // Convert 24h to 12h format (0 becomes 12)
        const orderHour = date.getHours() % 12 || 12;

        const icons: Record<number, React.ReactNode> = {
            1: <Clock1 size={16} />, 2: <Clock2 size={16} />, 3: <Clock3 size={16} />,
            4: <Clock4 size={16} />, 5: <Clock5 size={16} />, 6: <Clock6 size={16} />,
            7: <Clock7 size={16} />, 8: <Clock8 size={16} />, 9: <Clock9 size={16} />,
            10: <Clock10 size={16} />, 11: <Clock11 size={16} />, 12: <Clock12 size={16} />
        };

        return icons[orderHour] || <Clock size={16} />;
    };

    const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // 2. Logic for "Time Elapsed" (Date till Now)
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const days = Math.floor(diffInMins / (60 * 24));

    const hours = Math.floor((diffInMins % (60 * 24)) / 60);
    const mins = diffInMins % 60;

    const getTimeLabel = () => {
        if (diffInMins < 1) return "Just now";

        const parts: string[] = [];

        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);

        // Only show minutes if less than a day has passed, 
        // or if it's the only value we have.
        if (mins > 0) {
            parts.push(`${mins}m`);
        }

        return parts.join(" ");
    };

    return (
        <div className="flex items-center gap-1 text-sm font-medium">
            {showClock && (
                <>
                    <span className="">
                        {getOrderClockIcon()}
                    </span>
                    {/* <span className="">
                        {formattedTime}
                    </span> */}
                </>
            )}
            <span className="">
                {getTimeLabel()}
                {/* <RenderText group='shared' variable='ago' /> */}
            </span>
        </div>
    );
}
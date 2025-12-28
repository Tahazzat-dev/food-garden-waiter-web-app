'use client';

import { useEffect, useRef, useState } from 'react';

export function useElementHeight<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(([entry]) => {
            setHeight(entry.contentRect.height);
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return { ref, height };
}

import { useEffect, useState, useCallback } from "react";

export const useScroll = () => {
    const [scrollEnd, setScrollEnd] = useState(false);

    const onScrollLoad = useCallback(() => {
        const scrollHeight = Math.floor(document.documentElement.scrollHeight - document.documentElement.clientHeight);
        const scrollTop = Math.floor(document.documentElement.scrollTop + 1);

        if (scrollHeight - scrollTop <= 0) {
            setScrollEnd(true);
        }
    });

    useEffect(() => {
        window.addEventListener('scroll', onScrollLoad);
        return () => {
            window.removeEventListener('scroll', onScrollLoad);
        }
    }, [scrollEnd]);


    return { scrollEnd, setScrollEnd };
}
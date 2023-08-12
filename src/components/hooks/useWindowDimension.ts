/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import React, {useEffect, useState} from 'react';

type WindowDimentions = {
    width: number;
    height: number;
    isComplete: boolean;
};

const useWindowDimensions = (): WindowDimentions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
        width: 0,
        height: 0,
        isComplete: false
    });
    useEffect(() => {
        function handleResize(): void {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
                isComplete: true
            });
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowDimensions;
};

export default useWindowDimensions;
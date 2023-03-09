import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ start, end }, props) => {
    const canvasRef = useRef(null);
    let touchPoints = [];
    let coordinate = 0;
    const [isDragging, setIsDragging] = useState(false);
    const [translated, setTranslated] = useState(0);

    const addTouchPoint = (shift) => touchPoints.push({ time: new Date().getTime(), shift });

    const handleTouchStart = (event) => {
        if (isDragging) return;
        setIsDragging(true);
        const { pageX, pageY } = event.touches?.[0] ?? event;
        coordinate = pageX;
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
    };

    const handleTouchMove = (event) => {
        if (!isDragging) return;
        const { pageX, pageY } = event.touches?.[0] ?? event;
        addTouchPoint(pageX);
        const delta = pageX - coordinate;
        console.log(delta);
        coordinate = pageX;
    };

    // const draw = (ctx, frameCount) => {
    //     console.log(translated);
    //     ctx.clearRect(translated, 0, 600, 400);
    //     const canvasHeight = ctx.canvas.height;
    //     ctx.moveTo(20, canvasHeight / 2);
    //     ctx.lineTo(20, canvasHeight / 2 - 20);
    //     ctx.stroke();
    // for (let i = 0; i < 1000; i++) {
    //     if (i % 2 === 0) {
    //         ctx.moveTo(i * 20, canvasHeight / 2);
    //         ctx.lineTo(i * 20, canvasHeight / 2 - 20);
    //         ctx.stroke();
    //     } else {
    //         ctx.moveTo(i * 20, canvasHeight / 2);
    //         ctx.lineTo(i * 20, canvasHeight / 2 - 50);
    //         ctx.stroke();
    //     }
    // }
    // };

    return (
        <canvas
            {...props}
            ref={canvasRef}
            onMouseDown={(event) => handleTouchStart(event)}
            onMouseMove={(event) => handleTouchMove(event)}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
        />
    );
};

export default Canvas;

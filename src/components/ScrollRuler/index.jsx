import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ start, end }, props) => {
    const canvasRef = useRef(null);
    let translated = 0;
    let moved = 0;
    let touchPoints = [];
    let coordinate = 0;
    const [isDragging, setIsDragging] = useState(false);
    // const [translated, setTranslated] = useState(0);

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
        coordinate = pageX;
        // setTranslated(delta);
    };

    useEffect(() => {
        draw();
    }, []);

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        translated += 20;
        ctx.translate(-1, 0);
        draw();
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 10000, ctx.canvas.height);
        const canvasHeight = ctx.canvas.height;
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            if (i % 2 === 0) {
                ctx.moveTo(i * 20, canvasHeight / 2);
                ctx.lineTo(i * 20, canvasHeight / 2 - 20);
                ctx.stroke();
            } else {
                ctx.moveTo(i * 20, canvasHeight / 2);
                ctx.lineTo(i * 20, canvasHeight / 2 - 50);
                ctx.stroke();
            }
            ctx.closePath();
        }
    };

    return (
        <>
            <canvas
                {...props}
                ref={canvasRef}
                onMouseDown={(event) => handleTouchStart(event)}
                onMouseMove={(event) => handleTouchMove(event)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            />
            <button onClick={() => clear()}>Clear</button>
        </>
    );
};

export default Canvas;

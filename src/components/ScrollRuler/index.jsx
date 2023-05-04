import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ width, height }, props) => {
    const canvasRef = useRef(null);
    let coordinate = 0;
    const [isDragging, setIsDragging] = useState(false);

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
        if (pageX === coordinate) return;
        const delta = pageX - coordinate;
        coordinate = pageX;
        redraw(delta);
    };

    useEffect(() => {
        draw();
    }, []);

    const redraw = (delta) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.translate(delta > 0 ? 10 : -10, 0);
        window.requestAnimationFrame(draw);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(-100, 0, 10000, ctx.canvas.height);
        const canvasHeight = ctx.canvas.height;
        ctx.font = '10px Arial';
        for (let i = 1; i < 180; i++) {
            ctx.beginPath();
            ctx.fillText(i, i * 20 - 5, canvasHeight / 2 - 60);
            if (i % 2 !== 0) {
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
                width={width}
                height={height}
                ref={canvasRef}
                onMouseDown={(event) => handleTouchStart(event)}
                onMouseMove={(event) => handleTouchMove(event)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            />
        </>
    );
};

export default Canvas;

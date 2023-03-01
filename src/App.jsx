import './App.css';
import Canvas from './components/ScrollRuler';

function App() {
    const draw = (ctx, frameCount) => {
        const canvasHeight = ctx.canvas.height;
        for (let i = 0; i < 1000; i++) {
            if (i % 2 === 0) {
                ctx.moveTo(i * 20, canvasHeight / 2);
                ctx.lineTo(i * 20, canvasHeight / 2 - 20);
                ctx.stroke();
            } else {
                ctx.moveTo(i * 20, canvasHeight / 2);
                ctx.lineTo(i * 20, canvasHeight / 2 - 50);
                ctx.stroke();
            }
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
            <Canvas draw={draw} width='1000' height='500' />
        </div>
    );
}

export default App;

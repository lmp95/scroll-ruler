import './App.css';
import Canvas from './components/ScrollRuler';

function App() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
            <Canvas width='1000' height='500' />
        </div>
    );
}

export default App;

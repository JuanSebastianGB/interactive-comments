import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h3>App</h3>
      <p>this is amazing</p>
    </div>
  );
}

export default App;

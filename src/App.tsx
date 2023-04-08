import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Comments</h1>
      <p>Starting point</p>
    </div>
  );
}

export default App;

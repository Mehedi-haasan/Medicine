import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const fetchData =async()=>{
    const response = await fetch(`http://localhost:4000/api/get/product`)
    const data = await response.json();
    console.log(data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Help from './pages/Help';
import Search from './pages/Search';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'help':
        return <Help />;
      case 'search':
        return <Search />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <nav className="navigation">
        <h1>Art Gallery</h1>
        <ul className="nav-links">
          <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
          <li><button onClick={() => setCurrentPage('search')}>Search</button></li>
          <li><button onClick={() => setCurrentPage('about')}>About</button></li>
          <li><button onClick={() => setCurrentPage('help')}>Help</button></li>
        </ul>
      </nav>

      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

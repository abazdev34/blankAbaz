import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Инвентаризация</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          
					<li><Link to="/ingredient-calculator" onClick={toggleMenu}>Калькулятор</Link></li>
          <li><Link to="/timer" onClick={toggleMenu}>фасолефой паста таймер</Link></li>
          <li><Link to="/timer_2" onClick={toggleMenu}>овоший жарный таймер</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
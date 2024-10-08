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
          <li><Link to="/" onClick={toggleMenu}>Поставка</Link></li>
          <li><Link to="/send" onClick={toggleMenu}>Перевозка</Link></li>
          <li><Link to="/status" onClick={toggleMenu}>Состояние</Link></li>
          <li><Link to="/receive-history" onClick={toggleMenu}>История поставок</Link></li>
          <li><Link to="/send-history" onClick={toggleMenu}>История перевозок</Link></li>
					<li><Link to="/ingredient-calculator" onClick={toggleMenu}>Калькулятор</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
import React from 'react';
import './css/Header.css';

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenuClick}>☰</button>
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;

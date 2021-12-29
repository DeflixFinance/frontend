import * as React from 'react';
import "./TabSelector.css";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button    
    className={`tab-button ${isActive ? "active" : ""}`}
    onClick={onClick}
    style={{}}
  >
    {children}
  </button>
);
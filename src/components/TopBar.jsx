"use client";

import "./TopBar.css";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-track">

        <div className="topbar-content">
          📅 MON–SAT: 8am – 6pm &nbsp;&nbsp;&nbsp;
          💰 Shop With Us &nbsp;&nbsp;&nbsp;
          🚚 Countrywide Deliveries &nbsp;&nbsp;&nbsp;
          📍  Online Store
        </div>
        
        <div className="topbar-content">
          📅 MON–SAT: 8am – 6pm &nbsp;&nbsp;&nbsp;
          💰 Shop With Us &nbsp;&nbsp;&nbsp;
          🚚 Countrywide Deliveries &nbsp;&nbsp;&nbsp;
          📍  Online Store
        </div>

        {/* duplicate for smooth infinite scroll */}
        <div className="topbar-content">
          📅 MON–SAT: 8am – 6pm &nbsp;&nbsp;&nbsp;
          💰 Shop With Us &nbsp;&nbsp;&nbsp;
          🚚 Countrywide Deliveries &nbsp;&nbsp;&nbsp;
          📍  Online Store
        </div>

      </div>
    </div>
  );
}
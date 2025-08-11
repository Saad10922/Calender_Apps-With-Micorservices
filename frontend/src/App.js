import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (offset) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset, 1
    );
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const days = [];
    const firstDay = getFirstDayOfMonth(year, month);
    const totalDays = daysInMonth(year, month);

    // Empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      days.push(
        <div
          key={`day-${day}`}
          className={`day ${isToday ? "today" : ""}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className="App"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f8ff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "#333" }}>Colorful Calendar</h2>
      <section className="calender">  
      <div className="calendar">
        <div className="header">
          <button className="nav-button" onClick={() => changeMonth(-1)}>❮</button>
          <span>
            {currentDate.toLocaleString("default", { month: "long" })} {" "}
            {currentDate.getFullYear()}
          </span>
          <button className="nav-button" onClick={() => changeMonth(1)}>❯</button>
        </div>
        <div className="days-header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <div key={`header-${i}`} className="day header">
              {day}
            </div>
          ))}
        </div>
        <div className="days-container">{renderDays()}</div>
      </div>
      </section>
    </div>
  );
}

export default App;
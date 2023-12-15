// src/components/KanbanBoard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Ticket from "./Ticket";
import "./KanbanBoard.css";

const getPriorityLabel = (priority) => {
  const priorityMap = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };
  return priorityMap[priority];
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState("status");
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const displayTickets = () => {
    let groupedTickets = {};

    tickets.forEach((ticket) => {
      const groupByValue = ticket[groupingOption];
      if (!groupedTickets[groupByValue]) {
        groupedTickets[groupByValue] = [];
      }
      groupedTickets[groupByValue].push(ticket);
    });

    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key].sort((a, b) => {
        if (sortOption === "priority") {
          return b.priority - a.priority;
        } else if (sortOption === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });

    return Object.keys(groupedTickets).map((key) => (
      <div key={key} className="group-container">
        <h3>{key}</h3>
        {groupedTickets[key].map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            getPriorityLabel={getPriorityLabel}
          />
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div className="options-container">
        <label>
          Group By:
          <select onChange={(e) => handleGroupingChange(e.target.value)}>
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <button onClick={displayTickets}>Display</button>
      </div>

      <div className="options-container">
        <label>
          Sort By:
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <div className="kanban-container">{displayTickets()}</div>
    </div>
  );
};

export default KanbanBoard;

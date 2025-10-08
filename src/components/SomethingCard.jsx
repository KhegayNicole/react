import React from "react";
import "./SomethingCard.css";

export default function SomethingCard({ item }) {
  return (
    <li className="card">
      <h3>{item.title}</h3>
      <p>{item.description.slice(0, 100)}...</p>
    </li>
  );
}

import React, { useState } from "react";
import SomethingCard from "./SomethingCard";
import "./SomethingList.css";

export default function SomethingList() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const res = await fetch("https://ghibliapi.vercel.app/films");
    const data = await res.json();
    setItems(data);
  };

  return (
    <div className="list-container">
      <button onClick={fetchData}>Load Data</button>
      <ul>
        {items.map((item) => (
          <SomethingCard key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

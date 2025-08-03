import React, { useState } from "react";
import "./App.css";

export default function Adam() {
  const [bool, setBool] = useState(0);

  const role = ["TAB 1", "TAB 2", "TAB 3", "TAB 4"];
  const contents = [
    "Content 1",
    "Content 2",  
    "Content 3",
    "Content 4"
  ];

  return (
    <div className="lop">
      <h1 className="dra">Tabs Component with React</h1>

      <div className="nop">
        {role.map((tab, index) => (
          <div
            key={index}
            className={`nop ${bool === index ? "tyu" : ""}`}
            onClick={() => setBool(index)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="join">
        <h2>{contents[bool]}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue.
          Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus.
          In sodales pretium ultricies. Maecenas lectus est, sollicitudin consectetur felis nec,
          feugiat ultrices mi.
        </p>
      </div>
    </div>
  );
}
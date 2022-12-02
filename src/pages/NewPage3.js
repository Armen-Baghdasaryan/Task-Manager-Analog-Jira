import React, { useState } from "react";
import "./NewPage3.scss";

const NewPage3 = () => {
  const sections = [
    { id: 1, clazz: "sectionn", order: "queue" },
    { id: 2, clazz: "sectionn", order: "develop" },
    { id: 3, clazz: "sectionn", order: "done" },
  ];

  const [currentItem, setCurrentItem] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);

  function dragStartHandler(e, section) {
    setCurrentItem(e.target);
    setCurrentSection(section);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dragEndHandler(e, section) {}

  function dropHandler(e, section) {
    e.preventDefault();
    setCurrentSection(section);
  }

  currentItem && currentSection && console.log(currentSection.order);

  return (
    <div className="nconttt">
      {sections.map((section) => (
        <div className={section.clazz} key={section.id}>
          <div
            onDragStart={(e) => dragStartHandler(e, section)}
            // onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e, section)}
            onDragOver={(e) => dragOverHandler(e, section)}
            onDrop={(e) => dropHandler(e, section)}
            className="carddd queue"
            draggable
          >
            text
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewPage3;

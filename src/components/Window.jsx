import React from "react";
import ButtonSnippets from "./ButtonSnippets";

function Window({ activeTab }) {
  const content = [
    <ButtonSnippets />,
    "Box-shadow Snippets Content",
    "Card Snippets Content",
    "Dropdown Snippets Content",
    "Input-fields Snippets Content",
    "Radio Snippets Content",
    "Toggle Switches Snippets Content",
  ];

  return (
    <div className="flex-1 p-8 bg-gray-100 pt-20 md:pt-8">
      <h1 className="text-black text-xl mb-8">
        AnimateHub - A one place for all your Frontend CSS needs
      </h1>
      <div>{content[activeTab]}</div>
    </div>
  );
}

export default Window;

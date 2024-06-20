import React from "react";
import ButtonSnippets from "./ButtonSnippets";
import CardSnippets from "./CardSnippets";
import DropdownSnippetCard from "./DropdownSnippets";
import InputFieldSnippets from "./Inputfield";


function Window({ activeTab }) {
  const content = [
    <ButtonSnippets />,
    "Box-shadow Snippets Content",
    <CardSnippets/>,
    <DropdownSnippetCard/>,
    <InputFieldSnippets/>,
    "Radio snippets Content",
    "Toggle Switches Content",
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

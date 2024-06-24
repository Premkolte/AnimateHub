import React from "react";
import ButtonSnippets from "./SnippetComponents/ButtonSnippets";
import CardSnippets from "./SnippetComponents/CardSnippets";
import DropdownSnippetCard from "./SnippetComponents/DropdownSnippets";
import InputFieldSnippets from "./SnippetComponents/InputfieldSnippets";
import CheckboxSnippets from "./SnippetComponents/CheckboxSnippets";
import RadioSnippets from "./SnippetComponents/RadioSnippets";
import LoginSnippets from "./SnippetComponents/LoginSnippets";
import SignupSnippets from "./SnippetComponents/SignupSnippets";
import ToggleSwitchSnippets from "./SnippetComponents/ToggleSwitchSnippets";
import SlideshowSnippets from "./SnippetComponents/SlideShowSnippets";
import BoxShadowSnippets from "./SnippetComponents/BoxShadowSnippets";
import TextSnippets from "./SnippetComponents/TextSnippets";

function Window({ activeTab }) {
  const content = [
    <ButtonSnippets />,
    <BoxShadowSnippets/>,
    <CardSnippets />,
    <DropdownSnippetCard />,
    <InputFieldSnippets />,
    <SignupSnippets/>,
    <LoginSnippets />, // Ensure LoginSnippets component is correctly imported
    <RadioSnippets />,
    <ToggleSwitchSnippets/> ,
    <SlideshowSnippets/>,
    "Text Snippets Content",
    <TextSnippets/>,
    <CheckboxSnippets />, 
  ];

  return (
    <div className="flex-1 p-8 bg-gray-100 pt-20 md:pt-8 overflow-y-auto">
      <h1 className="text-black text-xl mb-8">
        AnimateHub - A one place for all your Frontend CSS needs
      </h1>
      <div>{content[activeTab]}</div>
    </div>
  );
}

export default Window;

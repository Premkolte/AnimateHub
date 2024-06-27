import React from "react";
import ButtonSnippets from "../SnippetComponents/ButtonSnippets";
import CardSnippets from "../SnippetComponents/CardSnippets";
import DropdownSnippetCard from "../SnippetComponents/DropdownSnippets";
import InputFieldSnippets from "../SnippetComponents/InputfieldSnippets";
import CheckboxSnippets from "../SnippetComponents/CheckboxSnippets";
import RadioSnippets from "../SnippetComponents/RadioSnippets";
import LoginSnippets from "../SnippetComponents/LoginSnippets";
import SignupSnippets from "../SnippetComponents/SignupSnippets";
import ToggleSwitchSnippets from "../SnippetComponents/ToggleSwitchSnippets";
import SlideshowSnippets from "../SnippetComponents/SlideShowSnippets";
import BoxShadowSnippets from "../SnippetComponents/BoxShadowSnippets";
import TextSnippets from "../SnippetComponents/TextSnippets";
import SocialSnippets from "../SnippetComponents/SocialSnippets";
import FormSnippets from "../SnippetComponents/FormSnippets";
import ProgressBarSnippets from "../SnippetComponents/ProgressBarSnippets";
import NavbarIconSnippets from "../SnippetComponents/NavbarIconSnippets";
import DarkModeSnippets from "../SnippetComponents/DarkModeSnippets";
import AnimationSnippets from "../SnippetComponents/AnimationSnippets";
import TableSnippets from "../SnippetComponents/TableSnippets";
import ResponsivenessSnippets from "../SnippetComponents/ResponsivenessSnippets";


function Window({ activeTab }) {
  const content = [
    <ButtonSnippets />,
    <BoxShadowSnippets />,
    <CardSnippets />,
    <DropdownSnippetCard />,
    <InputFieldSnippets />,
    <SignupSnippets />,
    <LoginSnippets />,
    <RadioSnippets />,
    <ToggleSwitchSnippets />,
    <SlideshowSnippets />,
    "Page-Loader Content",
    <TextSnippets />,
    <CheckboxSnippets />,
    <SocialSnippets />,
    <FormSnippets />,
    "demo",
    <ProgressBarSnippets />,
    <NavbarIconSnippets />,
    <DarkModeSnippets/>,
    <AnimationSnippets/>,
    <TableSnippets/>,
    <ResponsivenessSnippets/>
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

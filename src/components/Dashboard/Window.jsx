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
import FooterSnippets from "../SnippetComponents/FooterSnippets";
import BadgeSnippets from "../SnippetComponents/BadgeSnippets";
import AvatarImageSnippets from "../SnippetComponents/AvatarImageSnippets";
import ColorPickerSnippets from "../SnippetComponents/ColorPickerSnippets";
import PageLoaderSnippets from "../SnippetComponents/PageLoaderSnippets";
import PaginationSnippets from "../SnippetComponents/PaginationSnippets";
import PillNavigationSnippets from "../SnippetComponents/PillNavigationSnippets";
import PaymentFormSnippets from "../SnippetComponents/PaymentFormSnippets";
import NewsletterSnippets from "../SnippetComponents/NewsLetterSnippets";
import SortSnippets from "../SnippetComponents/SortSnippets";
import CouponSnippets from "../SnippetComponents/CouponSnippets";
// import TabGroup from "../SnippetComponents/TabGroup";
import ShapedSnippets from "../SnippetComponents/ShadeSnippets";
import QuoteSlideshowSnippets from "../SnippetComponents/QuoteSlideSnippets";

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
    <PageLoaderSnippets />,
    <TextSnippets />,
    <CheckboxSnippets />,
    <SocialSnippets />,
    <FormSnippets />,
    "demo",
    <ProgressBarSnippets />,
    <NavbarIconSnippets />,
    <DarkModeSnippets />,
    <AnimationSnippets />,
    <TableSnippets />,
    <ResponsivenessSnippets />,
    <FooterSnippets />,
    <BadgeSnippets />,
    <AvatarImageSnippets />,
    <ColorPickerSnippets />,
    <PaginationSnippets />,
    <PillNavigationSnippets />,
    <PaymentFormSnippets />,
    <NewsletterSnippets />,
    <SortSnippets />,
    <CouponSnippets />,
    // <TabGroup />,
    <ShapedSnippets/>,
    <QuoteSlideshowSnippets/>
  ];

  return (
    <div className="flex-1 p-8 bg-gradient-to-r from-violet-500 via-white-500 to-blue-500 text-white pt-20 md:pt-8 overflow-y-auto min-h-screen pt-4">
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        AnimateHub - A one place for all your Frontend CSS needs
      </h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {content[activeTab]}
      </div>
    </div>
  );
}

export default Window;

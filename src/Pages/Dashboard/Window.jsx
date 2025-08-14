import React from "react";
import ButtonSnippets from "../../components/SnippetComponents/ButtonSnippets";
import CardSnippets from "../../components/SnippetComponents/CardSnippets";
import DropdownSnippetCard from "../../components/SnippetComponents/DropdownSnippets";
import InputFieldSnippets from "../../components/SnippetComponents/InputfieldSnippets";
import CheckboxSnippets from "../../components/SnippetComponents/CheckboxSnippets";
import RadioSnippets from "../../components/SnippetComponents/RadioSnippets";
import LoginSnippets from "../../components/SnippetComponents/LoginSnippets";
import SignupSnippets from "../../components/SnippetComponents/SignupSnippets";
import ToggleSwitchSnippets from "../../components/SnippetComponents/ToggleSwitchSnippets";
import SlideshowSnippets from "../../components/SnippetComponents/SlideShowSnippets";
import BoxShadowSnippets from "../../components/SnippetComponents/BoxShadowSnippets";
import TextSnippets from "../../components/SnippetComponents/TextSnippets";
import SocialSnippets from "../../components/SnippetComponents/SocialSnippets";
import FormSnippets from "../../components/SnippetComponents/FormSnippets";
import ProgressBarSnippets from "../../components/SnippetComponents/ProgressBarSnippets";
import NavbarIconSnippets from "../../components/SnippetComponents/NavbarIconSnippets";
import DarkModeSnippets from "../../components/SnippetComponents/DarkModeSnippets";
import AnimationSnippets from "../../components/SnippetComponents/AnimationSnippets";
import TableSnippets from "../../components/SnippetComponents/TableSnippets";
import ResponsivenessSnippets from "../../components/SnippetComponents/ResponsivenessSnippets";
import FooterSnippets from "../../components/SnippetComponents/FooterSnippets";
import BadgeSnippets from "../../components/SnippetComponents/BadgeSnippets";
import AvatarImageSnippets from "../../components/SnippetComponents/AvatarImageSnippets";
import ColorPickerSnippets from "../../components/SnippetComponents/ColorPickerSnippets";
import PageLoaderSnippets from "../../components/SnippetComponents/PageLoaderSnippets";
import PaginationSnippets from "../../components/SnippetComponents/PaginationSnippets";
import PillNavigationSnippets from "../../components/SnippetComponents/PillNavigationSnippets";
import PaymentFormSnippets from "../../components/SnippetComponents/PaymentFormSnippets";
import NewsletterSnippets from "../../components/SnippetComponents/NewsLetterSnippets";
import SortSnippets from "../../components/SnippetComponents/SortSnippets";
import CouponSnippets from "../../components/SnippetComponents/CouponSnippets";
import ShapedSnippets from "../../components/SnippetComponents/ShadeSnippets";
import QuoteSlideshowSnippets from "../../components/SnippetComponents/QuoteSlideSnippets";
import AnimatedIconSnippets from "../../components/SnippetComponents/AnimationIcon";
import CountdownTimeSnippets from "../../components/SnippetComponents/CountDownSnippets";
import TextAreaSnippets from "../../components/SnippetComponents/TextAreaSnippets";
import PricingSnippets from "../../components/SnippetComponents/PricingSnippets";
import LoginPageSnippets from "../../components/SnippetComponents/LoginPageSnippets";

import TabGroup from "../../components/SnippetComponents/TabGroup";

import ProfileCardSnippets from "../../components/SnippetComponents/ProfileCardSnippets";

import NeonButton from "../../components/SnippetComponents/NeonButton";
import ExpandingSearchBar from "../../components/SnippetComponents/ExpandingSearchBar";
import AccordianSnippets from "../../components/SnippetComponents/AccordianSnippets";
import ModalSnippets from "../../components/SnippetComponents/ModalSnippets";
import TooltipSnippets from "../../components/SnippetComponents/TooltipSnippets";
function Window({ activeTab }) {
  const content = [
    // Please add your components alphabetically in both button and this file and in same palce for perfect rendering
    <AccordianSnippets />,
    <AnimatedIconSnippets />,
    <AnimationSnippets />,
    <AvatarImageSnippets />,
    <BadgeSnippets />,
    <BoxShadowSnippets />,
    <ButtonSnippets />,
    <CardSnippets />,
    <CheckboxSnippets />,
    <ColorPickerSnippets />,
    <CountdownTimeSnippets />,
    <CouponSnippets />,
    <DarkModeSnippets />,
    <DropdownSnippetCard />,
    <ExpandingSearchBar />,
    <FooterSnippets />,
    <FormSnippets />,
    <InputFieldSnippets />,
    <LoginSnippets />,
    <ModalSnippets />,
    <NavbarIconSnippets />,
    <NeonButton />,
    <NewsletterSnippets />,
    <PageLoaderSnippets />,
    <PaginationSnippets />,
    <PaymentFormSnippets />,
    <PillNavigationSnippets />,
    <PricingSnippets />,
    <ProfileCardSnippets />,
    <ProgressBarSnippets />,
    <QuoteSlideshowSnippets />,
    <RadioSnippets />,
    <ResponsivenessSnippets />,
    <ShapedSnippets />,
    <SignupSnippets />,
    <SlideshowSnippets />,
    <SocialSnippets />,
    <SortSnippets />,
    <TabGroup />,
    <TableSnippets />,
    <TextAreaSnippets />,
    <TextSnippets />,
    <ToggleSwitchSnippets />,
    <TooltipSnippets />,
    <LoginPageSnippets />,
  ];

  return (
    <div className="flex-1 p-6 md:p-8 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white overflow-y-auto min-h-screen pt-20 md:pt-16">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center leading-tight text-secondary-900 dark:text-white">
        <span className="text-[#2563eb] dark:text-[#c084fc]">AnimateHub</span> — A one place for all your Frontend CSS needs
      </h1>

      <div
        className="bg-[#eff6ff] dark:bg-secondary-800 text-secondary-900 dark:text-white p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] max-w-4xl mx-auto "
      >
        {content[activeTab]}
      </div>
    </div>
  );
}

export default Window;

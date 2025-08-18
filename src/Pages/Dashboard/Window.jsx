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

// The function now accepts the new props from the Dashboard
function Window({ activeTab, activeFilter, searchQuery }) {
  const content = [
    // The props are now passed down to every component
    <AccordianSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <AnimatedIconSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <AnimationSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <AvatarImageSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <BadgeSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <BoxShadowSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ButtonSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <CardSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <CheckboxSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ColorPickerSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <CountdownTimeSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <CouponSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <DarkModeSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <DropdownSnippetCard activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ExpandingSearchBar activeFilter={activeFilter} searchQuery={searchQuery} />,
    <FooterSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <FormSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <InputFieldSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <LoginSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ModalSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <NavbarIconSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <NeonButton activeFilter={activeFilter} searchQuery={searchQuery} />,
    <NewsletterSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <PageLoaderSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <PaginationSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <PaymentFormSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <PillNavigationSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <PricingSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ProfileCardSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ProgressBarSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <QuoteSlideshowSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <RadioSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ResponsivenessSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ShapedSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <SignupSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <SlideshowSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <SocialSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <SortSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <TabGroup activeFilter={activeFilter} searchQuery={searchQuery} />,
    <TableSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <TextAreaSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <TextSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <ToggleSwitchSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <TooltipSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
    <LoginPageSnippets activeFilter={activeFilter} searchQuery={searchQuery} />,
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
import React, { Suspense, lazy, useState, useEffect } from "react";
import HeroParticles from "../../components/HeroParticles/HeroParticles";

import {
  Sparkles,
  Zap,
  Code,
  Palette,
  Monitor,
  Layers,
  ArrowRight,
} from "lucide-react";

// ======================
// CODE SNIPPET STRING
// ======================
const heroParticlesCode = `
import HeroParticles from "@/components/HeroParticles/HeroParticles";

export default function Example() {
  return (
    <div style={{ position: "relative", height: "420px" }}>
      <HeroParticles
        particleCount={120}
        interactive
        trails
        speedMultiplier={2}
      />
    </div>
  );
}
`.trim();

// ======================
// CODE BLOCK COMPONENT
// ======================
function CodeBlock({ code }) {
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className="mt-8 relative">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 px-3 py-1 text-xs rounded-md 
        bg-purple-600 text-white hover:bg-purple-700 transition"
      >
        Copy
      </button>

      <pre className="bg-[#0b0f1a] text-gray-200 text-sm rounded-xl p-5 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ======================
// LAZY LOADED SNIPPETS
// ======================
const ButtonSnippets = lazy(() => import("../../components/SnippetComponents/ButtonSnippets"));
const CardSnippets = lazy(() => import("../../components/SnippetComponents/CardSnippets"));
const DropdownSnippetCard = lazy(() => import("../../components/SnippetComponents/DropdownSnippets"));
const InputFieldSnippets = lazy(() => import("../../components/SnippetComponents/InputfieldSnippets"));
const CheckboxSnippets = lazy(() => import("../../components/SnippetComponents/CheckboxSnippets"));
const RadioSnippets = lazy(() => import("../../components/SnippetComponents/RadioSnippets"));
const LoginSnippets = lazy(() => import("../../components/SnippetComponents/LoginSnippets"));
const SignupSnippets = lazy(() => import("../../components/SnippetComponents/SignupSnippets"));
const ToggleSwitchSnippets = lazy(() => import("../../components/SnippetComponents/ToggleSwitchSnippets"));
const SlideshowSnippets = lazy(() => import("../../components/SnippetComponents/SlideShowSnippets"));
const BoxShadowSnippets = lazy(() => import("../../components/SnippetComponents/BoxShadowSnippets"));
const TextSnippets = lazy(() => import("../../components/SnippetComponents/TextSnippets"));
const SocialSnippets = lazy(() => import("../../components/SnippetComponents/SocialSnippets"));
const FormSnippets = lazy(() => import("../../components/SnippetComponents/FormSnippets"));
const ProgressBarSnippets = lazy(() => import("../../components/SnippetComponents/ProgressBarSnippets"));
const NavbarIconSnippets = lazy(() => import("../../components/SnippetComponents/NavbarIconSnippets"));
const DarkModeSnippets = lazy(() => import("../../components/SnippetComponents/DarkModeSnippets"));
const AnimationSnippets = lazy(() => import("../../components/SnippetComponents/AnimationSnippets"));
const TableSnippets = lazy(() => import("../../components/SnippetComponents/TableSnippets"));
const ResponsivenessSnippets = lazy(() => import("../../components/SnippetComponents/ResponsivenessSnippets"));
const FooterSnippets = lazy(() => import("../../components/SnippetComponents/FooterSnippets"));
const BadgeSnippets = lazy(() => import("../../components/SnippetComponents/BadgeSnippets"));
const AvatarImageSnippets = lazy(() => import("../../components/SnippetComponents/AvatarImageSnippets"));
const ColorPickerSnippets = lazy(() => import("../../components/SnippetComponents/ColorPickerSnippets"));
const PageLoaderSnippets = lazy(() => import("../../components/SnippetComponents/PageLoaderSnippets"));
const PaginationSnippets = lazy(() => import("../../components/SnippetComponents/PaginationSnippets"));
const PillNavigationSnippets = lazy(() => import("../../components/SnippetComponents/PillNavigationSnippets"));
const PaymentFormSnippets = lazy(() => import("../../components/SnippetComponents/PaymentFormSnippets"));
const NewsletterSnippets = lazy(() => import("../../components/SnippetComponents/NewsLetterSnippets"));
const SortSnippets = lazy(() => import("../../components/SnippetComponents/SortSnippets"));
const CouponSnippets = lazy(() => import("../../components/SnippetComponents/CouponSnippets"));
const ShapedSnippets = lazy(() => import("../../components/SnippetComponents/ShadeSnippets"));
const QuoteSlideshowSnippets = lazy(() => import("../../components/SnippetComponents/QuoteSlideSnippets"));
const AnimatedIconSnippets = lazy(() => import("../../components/SnippetComponents/AnimationIcon"));
const CountdownTimeSnippets = lazy(() => import("../../components/SnippetComponents/CountDownSnippets"));
const TextAreaSnippets = lazy(() => import("../../components/SnippetComponents/TextAreaSnippets"));
const PricingSnippets = lazy(() => import("../../components/SnippetComponents/PricingSnippets"));
const TabGroup = lazy(() => import("../../components/SnippetComponents/TabGroup"));
const ProfileCardSnippets = lazy(() => import("../../components/SnippetComponents/ProfileCardSnippets"));
const NeonButton = lazy(() => import("../../components/SnippetComponents/NeonButton"));
const ExpandingSearchBar = lazy(() => import("../../components/SnippetComponents/ExpandingSearchBar"));
const AccordianSnippets = lazy(() => import("../../components/SnippetComponents/AccordianSnippets"));
const ModalSnippets = lazy(() => import("../../components/SnippetComponents/ModalSnippets"));
const TooltipSnippets = lazy(() => import("../../components/SnippetComponents/TooltipSnippets"));

// ======================
// LOADING SPINNER
// ======================
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
  </div>
);

// ======================
// ERROR BOUNDARY
// ======================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-16 text-red-500">
          Something went wrong while loading this component.
        </div>
      );
    }
    return this.props.children;
  }
}

// ======================
// MAIN WINDOW COMPONENT
// ======================
function Window({ activeTab }) {
  const getComponent = (index) => {
    const components = [
      () => <AccordianSnippets />,
      () => <AnimatedIconSnippets />,
      () => <AnimationSnippets />,
      () => <AvatarImageSnippets />,
      () => <BadgeSnippets />,
      () => <BoxShadowSnippets />,
      () => <ButtonSnippets />,
      () => <CardSnippets />,
      () => <CheckboxSnippets />,
      () => <ColorPickerSnippets />,
      () => <CountdownTimeSnippets />,
      () => <CouponSnippets />,
      () => <DarkModeSnippets />,
      () => <DropdownSnippetCard />,
      () => <ExpandingSearchBar />,
      () => <FooterSnippets />,
      () => <FormSnippets />,

      // 🔥 HERO PARTICLES (WITH CODE)
      () => (
        <div>
          <div style={{ position: "relative", height: "420px" }}>
            <HeroParticles particleCount={120} interactive trails />
          </div>
          <CodeBlock code={heroParticlesCode} />
        </div>
      ),

      () => <InputFieldSnippets />,
      () => <LoginSnippets />,
      () => <ModalSnippets />,
      () => <NavbarIconSnippets />,
      () => <NeonButton />,
      () => <NewsletterSnippets />,
      () => <PageLoaderSnippets />,
      () => <PaginationSnippets />,
      () => <PaymentFormSnippets />,
      () => <PillNavigationSnippets />,
      () => <PricingSnippets />,
      () => <ProfileCardSnippets />,
      () => <ProgressBarSnippets />,
      () => <QuoteSlideshowSnippets />,
      () => <RadioSnippets />,
      () => <ResponsivenessSnippets />,
      () => <ShapedSnippets />,
      () => <SignupSnippets />,
      () => <SlideshowSnippets />,
      () => <SocialSnippets />,
      () => <SortSnippets />,
      () => <TabGroup />,
      () => <TableSnippets />,
      () => <TextAreaSnippets />,
      () => <TextSnippets />,
      () => <ToggleSwitchSnippets />,
      () => <TooltipSnippets />,
    ];

    return components[index]?.() || components[0]();
  };

  return (
    <div className="flex-1 p-10">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {getComponent(activeTab)}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Window;

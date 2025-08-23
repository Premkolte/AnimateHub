import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Code,
  Palette,
  Monitor,
  Layers,
  ArrowRight,
} from "lucide-react";
import ColorPalettePicker from "../Profile/PalettesPage";

// Lazy load components for better performance
const ButtonSnippets = lazy(() =>
  import("../../components/SnippetComponents/ButtonSnippets")
);
const CardSnippets = lazy(() =>
  import("../../components/SnippetComponents/CardSnippets")
);
const DropdownSnippetCard = lazy(() =>
  import("../../components/SnippetComponents/DropdownSnippets")
);
const InputFieldSnippets = lazy(() =>
  import("../../components/SnippetComponents/InputfieldSnippets")
);
const CheckboxSnippets = lazy(() =>
  import("../../components/SnippetComponents/CheckboxSnippets")
);
const RadioSnippets = lazy(() =>
  import("../../components/SnippetComponents/RadioSnippets")
);
const LoginSnippets = lazy(() =>
  import("../../components/SnippetComponents/LoginSnippets")
);
const SignupSnippets = lazy(() =>
  import("../../components/SnippetComponents/SignupSnippets")
);
const ToggleSwitchSnippets = lazy(() =>
  import("../../components/SnippetComponents/ToggleSwitchSnippets")
);
const SlideshowSnippets = lazy(() =>
  import("../../components/SnippetComponents/SlideShowSnippets")
);
const BoxShadowSnippets = lazy(() =>
  import("../../components/SnippetComponents/BoxShadowSnippets")
);
const TextSnippets = lazy(() =>
  import("../../components/SnippetComponents/TextSnippets")
);
const SocialSnippets = lazy(() =>
  import("../../components/SnippetComponents/SocialSnippets")
);
const FormSnippets = lazy(() =>
  import("../../components/SnippetComponents/FormSnippets")
);
const ProgressBarSnippets = lazy(() =>
  import("../../components/SnippetComponents/ProgressBarSnippets")
);
const NavbarIconSnippets = lazy(() =>
  import("../../components/SnippetComponents/NavbarIconSnippets")
);
const DarkModeSnippets = lazy(() =>
  import("../../components/SnippetComponents/DarkModeSnippets")
);
const AnimationSnippets = lazy(() =>
  import("../../components/SnippetComponents/AnimationSnippets")
);
const TableSnippets = lazy(() =>
  import("../../components/SnippetComponents/TableSnippets")
);
const ResponsivenessSnippets = lazy(() =>
  import("../../components/SnippetComponents/ResponsivenessSnippets")
);
const FooterSnippets = lazy(() =>
  import("../../components/SnippetComponents/FooterSnippets")
);
const BadgeSnippets = lazy(() =>
  import("../../components/SnippetComponents/BadgeSnippets")
);
const AvatarImageSnippets = lazy(() =>
  import("../../components/SnippetComponents/AvatarImageSnippets")
);
const ColorPickerSnippets = lazy(() =>
  import("../../components/SnippetComponents/ColorPickerSnippets")
);
const PageLoaderSnippets = lazy(() =>
  import("../../components/SnippetComponents/PageLoaderSnippets")
);
const PaginationSnippets = lazy(() =>
  import("../../components/SnippetComponents/PaginationSnippets")
);
const PillNavigationSnippets = lazy(() =>
  import("../../components/SnippetComponents/PillNavigationSnippets")
);
const PaymentFormSnippets = lazy(() =>
  import("../../components/SnippetComponents/PaymentFormSnippets")
);
const NewsletterSnippets = lazy(() =>
  import("../../components/SnippetComponents/NewsLetterSnippets")
);
const SortSnippets = lazy(() =>
  import("../../components/SnippetComponents/SortSnippets")
);
const CouponSnippets = lazy(() =>
  import("../../components/SnippetComponents/CouponSnippets")
);
const ShapedSnippets = lazy(() =>
  import("../../components/SnippetComponents/ShadeSnippets")
);
const QuoteSlideshowSnippets = lazy(() =>
  import("../../components/SnippetComponents/QuoteSlideSnippets")
);
const AnimatedIconSnippets = lazy(() =>
  import("../../components/SnippetComponents/AnimationIcon")
);
const CountdownTimeSnippets = lazy(() =>
  import("../../components/SnippetComponents/CountDownSnippets")
);
const TextAreaSnippets = lazy(() =>
  import("../../components/SnippetComponents/TextAreaSnippets")
);
const PricingSnippets = lazy(() =>
  import("../../components/SnippetComponents/PricingSnippets")
);
const TabGroup = lazy(() =>
  import("../../components/SnippetComponents/TabGroup")
);
const ProfileCardSnippets = lazy(() =>
  import("../../components/SnippetComponents/ProfileCardSnippets")
);
const NeonButton = lazy(() =>
  import("../../components/SnippetComponents/NeonButton")
);
const ExpandingSearchBar = lazy(() =>
  import("../../components/SnippetComponents/ExpandingSearchBar")
);
const AccordianSnippets = lazy(() =>
  import("../../components/SnippetComponents/AccordianSnippets")
);
const ModalSnippets = lazy(() =>
  import("../../components/SnippetComponents/ModalSnippets")
);
const TooltipSnippets = lazy(() =>
  import("../../components/SnippetComponents/TooltipSnippets")
);

// Enhanced Loading Component with modern design
const LoadingSpinner = () => {
  const [loadingText, setLoadingText] = useState("Loading component");

  useEffect(() => {
    const texts = [
      "Loading component",
      "Preparing preview",
      "Almost ready",
      "Finalizing",
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 animate-pulse"></div>

      {/* Loading animation */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-pulse"></div>

        {/* Inner spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 dark:border-t-purple-400 rounded-full animate-spin"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>

        {/* Orbiting dots */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <div className="w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
          <div className="w-2 h-2 bg-purple-400 dark:bg-blue-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>

      {/* Loading text with animation */}
      <div className="text-center space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-500 dark:text-purple-400 animate-pulse" />
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-all duration-300">
            {loadingText}
          </p>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-500 dark:bg-purple-400 rounded-full animate-bounce"></div>
            <div
              className="w-1 h-1 bg-blue-500 dark:bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 h-1 bg-blue-500 dark:bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Crafting the perfect preview experience for you
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

// Enhanced Error Boundary with better design
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="text-center max-w-lg mx-auto">
            {/* Error illustration */}
            <div className="relative mb-8">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-3xl flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75"></div>
              <div
                className="absolute -bottom-1 -left-2 w-3 h-3 bg-red-300 rounded-full animate-ping opacity-50"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              We encountered an issue while loading this component. Don't worry,
              it happens to the best of us! Let's get this sorted out.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  })
                }
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Monitor className="w-4 h-4" />
                Refresh Page
              </button>
            </div>

            {/* Developer details (only in development) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  🔍 Developer Details
                </summary>
                <pre className="mt-3 text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded-lg overflow-auto max-h-40 text-red-700 dark:text-red-300 font-mono">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component mapping with error boundaries and suspense
function Window({ activeTab, activeFilter, searchQuery }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getComponent = (index) => {
    const commonProps = { activeFilter, searchQuery };

    const components = [
      () => <AccordianSnippets {...commonProps} />,
      () => <AnimatedIconSnippets {...commonProps} />,
      () => <AnimationSnippets {...commonProps} />,
      () => <AvatarImageSnippets {...commonProps} />,
      () => <BadgeSnippets {...commonProps} />,
      () => <BoxShadowSnippets {...commonProps} />,
      () => <ButtonSnippets {...commonProps} />,
      () => <CardSnippets {...commonProps} />,
      () => <CheckboxSnippets {...commonProps} />,
      () => <ColorPickerSnippets {...commonProps} />,
      () => <CountdownTimeSnippets {...commonProps} />,
      () => <CouponSnippets {...commonProps} />,
      () => <DarkModeSnippets {...commonProps} />,
      () => <DropdownSnippetCard {...commonProps} />,
      () => <ExpandingSearchBar {...commonProps} />,
      () => <FooterSnippets {...commonProps} />,
      () => <FormSnippets {...commonProps} />,
      () => <InputFieldSnippets {...commonProps} />,
      () => <LoginSnippets {...commonProps} />,
      () => <ModalSnippets {...commonProps} />,
      () => <NavbarIconSnippets {...commonProps} />,
      () => <NeonButton {...commonProps} />,
      () => <NewsletterSnippets {...commonProps} />,
      () => <PageLoaderSnippets {...commonProps} />,
      () => <PaginationSnippets {...commonProps} />,
      () => <PaymentFormSnippets {...commonProps} />,
      () => <PillNavigationSnippets {...commonProps} />,
      () => <PricingSnippets {...commonProps} />,
      () => <ProfileCardSnippets {...commonProps} />,
      () => <ProgressBarSnippets {...commonProps} />,
      () => <QuoteSlideshowSnippets {...commonProps} />,
      () => <RadioSnippets {...commonProps} />,
      () => <ResponsivenessSnippets {...commonProps} />,
      () => <ShapedSnippets {...commonProps} />,
      () => <SignupSnippets {...commonProps} />,
      () => <SlideshowSnippets {...commonProps} />,
      () => <SocialSnippets {...commonProps} />,
      () => <SortSnippets {...commonProps} />,
      () => <TabGroup {...commonProps} />,
      () => <TableSnippets {...commonProps} />,
      () => <TextAreaSnippets {...commonProps} />,
      () => <TextSnippets {...commonProps} />,
      () => <ToggleSwitchSnippets {...commonProps} />,
      () => <TooltipSnippets {...commonProps} />,
    ];

    const ComponentFunction = components[index] || components[0];
    return ComponentFunction();
  };

  return (
    <div
      className={`flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30 overflow-y-auto transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 1px, transparent 0), 
                           radial-gradient(circle at 75px 75px, rgba(147, 51, 234, 0.1) 1px, transparent 0)`,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 p-6 md:p-8 lg:p-12">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 space-y-6">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-full border border-blue-200/50 dark:border-purple-700/50 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Live Component Preview
            </span>
          </div>

          {/* Main Title with enhanced typography */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                AnimateHub
              </span>
            </h1>

            <div className="flex items-center justify-center gap-3 text-lg md:text-xl text-gray-600 dark:text-gray-400">
              <Code className="w-5 h-5 text-blue-500 dark:text-purple-400" />
              <span className="font-medium">Your Frontend CSS Playground</span>
              <Palette className="w-5 h-5 text-purple-500 dark:text-blue-400" />
            </div>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: Layers, text: "Ready-to-use Components" },
              { icon: Zap, text: "Copy & Paste" },
              { icon: Sparkles, text: "Modern Design" },
            ].map(({ icon: Icon, text }, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50"
              >
                <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Component Container */}
        <div className="max-w-7xl mx-auto">
          <div className="relative group">
            {/* Main container */}
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {/* Container header */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 via-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:via-gray-800/50 dark:to-gray-700/50 border-b border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center justify-between">
                  {/* Left side - Status indicator */}
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Component Preview
                      </span>
                    </div>
                  </div>

                  {/* Right side - Additional info */}
                  <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Monitor className="w-4 h-4" />
                    <span>Live Preview</span>
                  </div>
                </div>
              </div>

              {/* Component content area */}
              <div className="p-8 md:p-12 min-h-[500px] bg-gradient-to-br from-white via-gray-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900/50">
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner />}>
                    <div className="transition-all duration-300 hover:scale-[1.002]">
                      {getComponent(activeTab)}
                    </div>
                  </Suspense>
                </ErrorBoundary>
              </div>

              {/* Decorative bottom gradient */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-12"></div>
      </div>

      {/* Floating animation elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-br from-pink-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
}

export default Window;

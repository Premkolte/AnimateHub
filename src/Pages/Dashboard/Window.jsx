import React, { Suspense, lazy } from "react";

// Lazy load components for better performance
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

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600 dark:text-gray-400">Loading component...</span>
  </div>
);

// Error Boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="text-red-500 text-2xl mb-2">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Unable to load this component. Please try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component mapping with error boundaries and suspense
function Window({ activeTab, activeFilter, searchQuery }) {
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
      () => <TooltipSnippets {...commonProps} />
    ];

    // Ensure we have a valid component for the given index
    const ComponentFunction = components[index] || components[0];
    return ComponentFunction();
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white overflow-y-auto min-h-screen pt-20 md:pt-16">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center leading-tight text-secondary-900 dark:text-white">
        <span className="text-[#2563eb] dark:text-[#c084fc]">AnimateHub</span> — A one place for all your Frontend CSS needs
      </h1>
      <div className="bg-[#eff6ff] dark:bg-secondary-800 text-secondary-900 dark:text-white p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] max-w-4xl mx-auto">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            {getComponent(activeTab)}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Window;

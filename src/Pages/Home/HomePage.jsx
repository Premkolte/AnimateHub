import React from "react";
import TemplatesSection from "./TemplatesSection";
import FeaturesSection from "./FeaturesSection";
import TestimonialSection from "./Testimonial";
import Subscribe from "./Subscribe";
import PricingSection from "./Pricing";
import HeroSection from "./HeroSection";
import Contributors from "./Contributors";

const HomePage = () => {

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center min-h-screen relative z-10 backdrop-blur-md bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 pt-2 pb-16">
        <HeroSection />

        {/* Features */}
        <FeaturesSection />

        {/* Templates */}
        <TemplatesSection />

        {/* Testimonials */}
        <TestimonialSection />

        {/* Pricing */}
        <PricingSection />

        {/* Subscription */}
        <Subscribe />

        {/* Contributors */}
        <Contributors />

      </div>
    </>
  );
};

export default HomePage;

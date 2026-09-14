'use client';

import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import FeatureBadges from '@/components/home/FeatureBadges';
import ServicesCatalog from '@/components/home/ServicesCatalog';
import PriceCalculator from '@/components/home/PriceCalculator';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import BundlesSection from '@/components/home/BundlesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import ProcessStepsSection from '@/components/home/ProcessStepsSection';
import GuaranteesSection from '@/components/home/GuaranteesSection';
import ComparisonSection from '@/components/home/ComparisonSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import FaqSection from '@/components/home/FaqSection';
import InquiriesSection from '@/components/home/InquiriesSection';

export default function HomePage() {
  return (
    <>
      {/* Section 1: 3D Hero Showcase */}
      <HeroSlider />

      {/* Section 2 & 3: Quick Features + Trust Stats Bar + Value Proposition */}
      <FeatureBadges />

      {/* Section 4: Main E-Commerce Catalog Grid */}
      <ServicesCatalog />

      {/* Section 5: Interactive Calculator Widget */}
      <PriceCalculator />

      {/* Section 6: How It Works (4 Steps) */}
      <HowItWorksSection />

      {/* Section 7: Foundation Bundles */}
      <BundlesSection />

      {/* Section 8: Portfolio Showcase Gallery & Detail Modals */}
      <PortfolioSection />

      {/* Section 8.5: Purchasing & Delivery Process (3 Steps) */}
      <ProcessStepsSection />

      {/* Section 8.6: Service Guarantees & SLA (4 Guarantee Cards) */}
      <GuaranteesSection />

      {/* Section 8.7: Direct Service Store Comparison Matrix */}
      <ComparisonSection />

      {/* Section 9: Customer Reviews & Ratings */}
      <ReviewsSection />

      {/* Section 10: FAQ Accordion (6 Items) */}
      <FaqSection />

      {/* Section 11: Luxury CTA Banner with COBALT20 & WhatsApp */}
      <InquiriesSection />
    </>
  );
}

"use client";

import StrangerThingsHero from "@/components/StrangerThingsHero";
import CliffScrollAnimation from "@/components/CliffScrollAnimation";
import EventsShowcase from "@/components/EventsShowcase";
import Footer from "@/components/SiteFooter";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] text-[#F0E5D5]">
      {/* UPSIDE DOWN HERO SECTION */}
      <StrangerThingsHero />

      {/* MAN ON CLIFF SCROLL ANIMATION — Apple-style frame sequence */}
      <CliffScrollAnimation />

      {/* EVENTS SHOWCASE */}
      <EventsShowcase />

      {/* SITE FOOTER */}
      <Footer />
    </main>
  );
}

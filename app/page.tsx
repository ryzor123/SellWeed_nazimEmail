import { GlobalNav } from "@/components/global-nav"
import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { ImpactVerification } from "@/components/impact-verification"
import { MFSTransparencyBar } from "@/components/mfs-transparency-bar"
import { BlueZonesMap } from "@/components/blue-zones-map"
import { NetworkSection } from "@/components/network/network-section"
import { EconomySection } from "@/components/economy/economy-section"
import { GiggerPhoneMockup } from "@/components/economy/gigger-phone-mockup"
import { ResilienceSection } from "@/components/resilience/resilience-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <HeroSection />
      <BentoGrid />
      <ImpactVerification />
      <MFSTransparencyBar />
      <BlueZonesMap />
      <NetworkSection />
      <EconomySection />
      <GiggerPhoneMockup />
      <ResilienceSection />
      <Footer />
    </main>
  )
}

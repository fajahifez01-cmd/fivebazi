import { calculateBaZi } from "@/lib/bazi";
import PremiumReport from "@/components/PremiumReport";
import type { PremiumReading } from "@/lib/premiumReading";
import sampleData from "@/lib/sample-premium-reading.json";

export const metadata = {
  title: "Premium Report Preview — FiveBaZi",
  robots: { index: false, follow: false },
};

/**
 * Internal preview of the $9.9 Premium Destiny Report layout.
 * Uses the PoC output captured against the test chart (Yang Metal Gēng).
 * Linked from nowhere; reachable only by typing the URL.
 */
export default function SamplePremiumPage() {
  const chart = calculateBaZi({
    year: 1990,
    month: 5,
    day: 15,
    hour: 12,
    minute: 0,
    isMale: true,
  });

  return (
    <PremiumReport
      chart={chart}
      name="Harry"
      reading={sampleData as PremiumReading}
      awakenedPortraitPath={`/portraits/${chart.dayMaster.slug}-male-awakened.jpeg`}
    />
  );
}

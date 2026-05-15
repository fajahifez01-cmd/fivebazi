import PremiumReportClient from "@/components/PremiumReportClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your Premium Destiny Report — FiveBaZi",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default async function PremiumReportPage({ params }: PageProps) {
  const { orderId } = await params;
  return <PremiumReportClient orderId={orderId} />;
}

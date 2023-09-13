import { PageHeader, PageHero, MainContent } from "@/components/homepage";

export default function Page(): JSX.Element {
  return (
    <main className="h-screen">
      <PageHeader />
      <PageHero />
      <MainContent />
    </main>
  );
}

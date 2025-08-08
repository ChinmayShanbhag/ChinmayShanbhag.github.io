import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

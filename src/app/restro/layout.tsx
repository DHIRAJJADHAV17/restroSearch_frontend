import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

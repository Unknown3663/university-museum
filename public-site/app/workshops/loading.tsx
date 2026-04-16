import CollectionSkeleton from "../components/CollectionSkeleton";
import Navbar from "../components/Navbar";
import SignatureLogo from "../components/SignatureLogo";
import Footer from "../components/Footer";

export default function WorkshopsLoading() {
  return (
    <main className="relative min-h-screen w-full flex flex-col">
      <SignatureLogo />
      <div className="fixed inset-0 h-full w-full -z-10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#334155_0%,#111827_42%,#020617_100%)]" />
      </div>
      <Navbar />
      <div className="flex-1 px-3 pb-0 pt-24 sm:px-4 sm:pt-28 md:px-6 md:pt-32 lg:px-8">
        <CollectionSkeleton titleWidthClassName="w-56 sm:w-72" />
      </div>
      <Footer />
    </main>
  );
}

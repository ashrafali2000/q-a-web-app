import HeroSection from "@/components/video";
import Image from "next/image";

export default function Video() {
  return (
    <div className="bg-cover bg-center h-screen" style={{backgroundImage: "url('/bg.avif')"}}>
      <HeroSection />
    </div>
  );
}

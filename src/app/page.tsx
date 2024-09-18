import Accordion from "@/components/questions";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/bg.avif')" }}
    >
      <div>
        <Accordion />
      </div>
    </div>
  );
}

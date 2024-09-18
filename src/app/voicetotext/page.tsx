"use client";
import "regenerator-runtime/runtime";
import Text from "@/components/voicetotext";
export default function VoiceToSpeech() {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/bg.avif')" }}
    >
      <Text />
    </div>
  );
}

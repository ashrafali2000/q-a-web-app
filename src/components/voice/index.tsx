"use client";
// import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useRef, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
export default function HeroSection() {
  const [speakText, setSpeakText] = useState("");
  const audioref = useRef<any>();
  const [voiceData, setVoiceData] = useState(false);
  const [customAudio, setCustomAudio] = useState<any>("/4.wav");
  const [textToSpeak, setTextToSpeak] = useState("");
  const myFunc = () => {
    setVoiceData(false);
  };
  // const { speak, onEnd } = useSpeechSynthesis();
  const handleSpeak = (text: any) => {
    setTextToSpeak(text);
  };

  console.log("customAudio-->", customAudio);
  const [arrays, setArrayStore] = useState<any>([
    // {
    //   title: "What inspired you to create Gran Caramino Tequila1?",
    //   voice: "/4.wav",
    // },
  ]);
  // const questionList = [
  //   {
  //     title: "What inspired you to create Gran Caramino Tequila?",
  //     voice: "/voice1.wav",
  //   },
  //   {
  //     title:
  //       "Can you tell me more about the flavors and aromas of your Cristalino tequila?",
  //     voice: "/2.wav",
  //   },
  //   {
  //     title: "What sets your Añejo tequila apart from others on the market?",
  //     voice: "/3.wav",
  //   },
  //   {
  //     title:
  //       "What makes Gran Caramino unique compared to other tequilas on the market?",
  //     voice: "/4.wav",
  //   },
  //   {
  //     title:
  //       "Can you describe the flavor profile of the Cristalino tequila and what sets it apart?",
  //     voice: "/5.wav",
  //   },
  //   {
  //     title:
  //       "How did you come up with the idea for the special blend of Añejo tequila, and what do you feel it brings to the table in terms of taste experience?",
  //     voice: "/6.wav",
  //   },
  // ];
  // const updatesong = (customAudio: any) => {
  //   setCustomAudio(customAudio);
  //   if (audioref.current) {
  //     audioref.current.pause();
  //     audioref.current.load();
  //     audioref.current.play();
  //   }
  // };
  useEffect(() => {
    if (audioref.current) {
      audioref.current.pause();
      audioref.current.load();
      if (customAudio) {
        audioref.current.src = customAudio;
        audioref.current.play();
      }
    }
  }, [customAudio]);

  // const updatesong = (customAudio: string) => {
  //   setCustomAudio(customAudio);
  // };
  console.log("arraysFromVoice---->", arrays);
  // const addQuestionToStore = (question: any) => {
  //   if (!questionList.some((q: any) => q.title === question.title)) {
  //     const check = questionList.filter((q) => q.title === question);
  //     setArrayStore((prev: any) => [...prev, check[0]]);
  //   }
  // };

  const [userInput, setUserInput] = useState("");
  const [voiceIndex, setVoiceIndex] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    setUserInput(value);
  };
  // const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  //  const generateAudio = () => {
  //    const audioData = generateAudioBlob(text);

  //    if (audioData instanceof Blob) {
  //      setAudioBlob(audioData);
  //    }
  //  };
  //Button Handler
  // const askHandler = async () => {
  //   try {
  //     const response = await axios.post("api/chat", { userInput });
  //     if (response) {
  //       const myResponse = response.data.response;
  //       if ("speechSynthesis" in window) {
  //         const synthesis = window.speechSynthesis;
  //         const utterance = new SpeechSynthesisUtterance(myResponse);
  //         synthesis.speak(utterance);
  //         const audioBlob = new Blob([myResponse], { type: "audio/wav" });
  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         const audio = document.createElement("audio");
  //         audio.src = audioUrl;
  //         console.log("audioUrl---->", audioUrl);
  //         setArrayStore((prev: any) => [
  //           ...prev,
  //           { title: userInput, voice: audioUrl },
  //         ]);
  //       } else {
  //         alert("Web Speech API not supported in your browser");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("error----->", error);
  //   }
  // };
  const askHandler = async (e: any) => {
    if (e.keyCode === 13) {
      try {
        const response = await axios.post("api/chat", { userInput });
        if (response.data.response) {
          setVoiceData(true);
          setUserInput("");
          setVoiceIndex(arrays.length + 1);
          const myResponse = response.data.response;
          // setSpeakText(myResponse)
          // speak({ text: myResponse, onEnd: myFunc });
          // onEnd(myFunc);

          if ("speechSynthesis" in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(myResponse);
            synthesis.speak(utterance);

            await new Promise((resolve) => {
              utterance.onstart = resolve;
            });

            utterance.onend = () => {
              setVoiceData(false);
            };
            const audioData = new Uint8Array(
              new TextEncoder().encode(utterance.text)
            );

            // Create Blob from audio data
            const audioBlob = new Blob([audioData], { type: "audio/wav" });

            // Create URL for the Blob
            const audioUrl = URL.createObjectURL(audioBlob);

            // Add the audio URL to the array
            setArrayStore((prev: any) => [
              ...prev,
              {
                key: arrays.length + 1,
                title: userInput,
                voice: audioUrl,
                desc: myResponse,
              },
            ]);
          } else {
            alert("Web Speech API not supported in your browser");
          }
        }
      } catch (error) {
        setVoiceData(false);
        console.log("error----->", error);
      }
    }
    // else{
    //   try {
    //     const response = await axios.post("api/chat", { userInput });
    //     if (response.data.response) {
    //       setVoiceData(true);
    //       setVoiceIndex(arrays.length + 1);
    //       const myResponse = response.data.response;

    //       speak({ text: myResponse, onEnd: myFunc });

    //       setArrayStore((prev: any) => [
    //         ...prev,
    //         {
    //           key: arrays.length + 1,
    //           title: userInput,
    //           voice: "",
    //           desc: myResponse,
    //         },
    //       ]);
    //     }
    //   } catch (error) {
    //     setVoiceData(false);
    //     console.log("error----->", error);
    //   }

    // }
  };

  return (
    <div className="bg-[#1f3b4d] max-w-md mx-auto border-8 border-black rounded-2xl text-black text-xs md:text-md ">
      <div className="  mx-auto text-black text-xs md:text-md">
        <div className=" py-2">
          <div className="h-[500px] py-3 flex flex-col gap-5 overflow-y-scroll ">
            <div className="float-left flex items-center gap-1 -mb-2 ">
              <img
                src="/avatar.jpeg"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p className="p-2 w-60 md:w-80 bg-gray-600 text-white cursor-pointer">
                Hi kevin here! What&#39;s up?{" "}
              </p>
            </div>
            {arrays.map((data: any, indx: any) => (
              <div key={indx} className=" flex flex-col gap-3 px-3">
                <div className="self-end">
                  <p className="p-2 bg-gray-800 text-white cursor-pointer w-60 md:w-80">
                    {data.title}
                  </p>
                </div>
                {indx + 1 === voiceIndex && voiceData ? (
                  <div className="flex items-center gap-1">
                    <img
                      src="/avatar.jpeg"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    {/* <audio controls className="">
                      <source
                        src={data.voice}
                        type="audio/wav"
                        className="myAudio"
                      />
                    </audio> */}
                    <ScaleLoader color="#36d7b7" height={40} width={10} />
                  </div>
                ) : indx + 1 === data.key ? (
                  <div className="flex items-center gap-1">
                    <img
                      src="./avatar.jpeg"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    {/* <audio controls className="">
                      <source
                        src={data.voice}
                        type="audio/wav"
                        className="myAudio"
                      />
                    </audio> */}
                    <div className="my-1">
                      <p className="p-2 bg-gray-600 text-white cursor-pointer w-60 md:w-80">
                        {data.desc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <img
                      src="./avatar.jpeg"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="my-1">
                      <p className="p-2 bg-gray-600 text-white cursor-pointer w-60 md:w-80">
                        {data.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* <div className=" bg-gray-500 ">
            <div className=" h-24 text-lg overflow-y-scroll flex flex-col px-4 py-3 gap-4">
              {questionList.map((p, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setQstn(p.title);
                    updatesong(p.voice);
                    addQuestionToStore(p.title);
                  }}
                  className="p-2 bg-gray-200 cursor-pointer "
                >
                  {p.title}
                </p>
              ))}
            </div>
          </div> */}

          {/* New Code */}
          <div className="bg-gray-500  max-w-md mx-auto  ">
            <div className="flex flex-col px-3 py-3 gap-4  ">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="shadow pr-5 text-base text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ring-green-500 focus:ring-2 "
                  value={userInput}
                  onKeyDown={askHandler}
                  onChange={handleChange}
                />
                {/* <button
                  onClick={() => {
                  }}
                  className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-5 text-base lg:px-8 rounded-xl"
                >
                  Ask
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

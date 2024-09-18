"use client";
import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
export default function HeroSection() {
  const videoref = useRef<any>();
  const [qstn, setQstn] = useState(
    "What inspired you to create Gran Caramino Tequila?"
  );
  const [arrays, setArrayStore] = useState<any>([
    // {
    //   title: "What inspired you to create Gran Caramino Tequila?",
    //   video: "/video(1).mp4",
    // },
  ]);
  const [customVideo, setCustomVideo] = useState(true);

  const updatevideo = (customVideo: any) => {
    setCustomVideo(customVideo);
    console.log("customVideo ----> ", customVideo);
    if (videoref.current) {
      videoref.current.load();
      videoref.current.play();
    }
  };

  const questionList = [
    {
      title: "What inspired you to create Gran Caramino Tequila?",
      video: "/video(6).mp4",
    },
    {
      title:
        "Can you tell me more about the flavors and aromas of your Cristalino tequila?",
      video: "/video(2).mp4",
    },
    {
      title: "What sets your Añejo tequila apart from others on the market?",
      video: "/video(3).mp4",
    },
    {
      title:
        "What makes Gran Caramino unique compared to other tequilas on the market?",
      video: "/video(4).mp4",
    },
    {
      title:
        "Can you describe the flavor profile of the Cristalino tequila and what sets it apart?",
      video: "/5.mp4",
    },
    {
      title:
        "How did you come up with the idea for the special blend of Añejo tequila, and what do you feel it brings to the table in terms of taste experience?",
      video: "/6.mp4",
    },
  ];

  const addQuestionToStore = (question: any) => {
    if (!questionList.some((q: any) => q.title === question.title)) {
      const check = questionList.filter((q) => q.title === question);
      setArrayStore((prev: any) => [...prev, check[0]]);
    }
  };
  const [userInput, setUserInput] = useState("");

  const askHandler = async (e: any) => {
    if (e.keyCode === 13) {
      try {
        const response = await axios.post("api/chat", { userInput });
        if (response.data.response) {
          setUserInput("");
          setCustomVideo(false);
          // setVoiceIndex(arrays.length + 1);
          const myResponse = response.data.response;
          if ("speechSynthesis" in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(myResponse);
            synthesis.speak(utterance);

            // Wait for speech synthesis to complete
            await new Promise((resolve) => {
              utterance.onstart = resolve;
            });

            utterance.onend = () => {
              // Assuming you want to set voiceData to false after speech synthesis is done
              // setVoiceData(false);
              setCustomVideo(true);
            };
            // Directly use the SpeechSynthesisUtterance object
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
        // setVoiceData(false);
        console.log("error----->", error);
      }
    }
  };
  const handleChange = (e: any) => {
    const value = e.target.value;
    setUserInput(value);
  };
  return (
    <div className="bg-[#1f3b4d] max-w-md mx-auto border-8 border-black rounded-2xl text-black text-xs md:text-md ">
      {/* Video */}
      {/* <div className="py-8 max-w-lg">
        <video
          autoPlay
          controls
          ref={videoref}
          className="h-full w-full rounded-lg"
        >
          <source src={customVideo} type="video/mp4" />
        </video>
      </div> */}
      {/* Questions */}
      {/* <div className="py-5 flex flex-col gap-4 max-w-4xl">
        {questionList.map((data, index) => (
          <p
            key={index}
            onClick={() => updatevideo(data.video)}
            className="py-3 text-sm cursor-pointer md:text-base px-4 bg-gray-200 text-gray-900 hover:bg-white border"
          >
            {data.title}
          </p>
        ))}
      </div> */}

      {/* ///New UI*/}
      <div className=" border-4  rounded-2xl text-black text-xs md:text-md">
        <div className="">
          <div className="py-1 max-w-xl mx-auto">
            {customVideo ? (
              // <video autoPlay loop muted className="h-60 w-[500px]  rounded-lg">
              //   <source src={"/video(1).mp4"} type="video/mp4" />
              // </video>
              <div className="h-60 w-full flex justify-center items-center">
                <Image
                  src={"/tequalla.PNG"}
                  alt="tequllaimage"
                  width={500}
                  height={500}
                  className="h-52 md:h-60 w-[350px]"
                />
              </div>
            ) : (
              <video autoPlay loop muted className="h-60 w-[500px]  rounded-lg">
                <source src={"/video(1).mp4"} type="video/mp4" />
              </video>
            )}
          </div>

          <div className="h-[250px] flex flex-col gap-3 items-end overflow-y-scroll ">
            {arrays.map((data: any, indx: any) => (
              <div key={indx} className="my-1">
                <p className="p-2 bg-gray-800 text-white cursor-pointer w-60  mx-auto  md:w-80">
                  {data.title}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="border-4 bg-gray-500">
            <div className=" h-24 text-lg overflow-y-scroll flex flex-col px-4 py-3 gap-4">
              {questionList.map((p, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setQstn(p.title);
                    updatevideo(p.video);
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
                    askHandler();
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

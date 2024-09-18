"use client";
import { FC } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PacmanLoader from "react-spinners/PacmanLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
interface TextProps {}

const Text: FC<TextProps> = ({}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (interimTranscript !== "") {
      setUserVoice(interimTranscript);
    }
  }, [interimTranscript]);
  const [arrays, setArrayStore] = useState<any>([]);

  const [loader, setLoader] = useState(false);

  const [loadingText, setLoadingText] = useState<any>(true);
  const [voiceData, setVoiceData] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState("");
  const [userVoice, setUserVoice] = useState("");

  const speakHandler = () => {
    SpeechRecognition.startListening();
    setLoadingText(false);
    setTimeout(async () => {
      if (!listening) {
        setUserVoice(transcript);
        try {
          const response = await axios.post("api/chat", {
            userInput: transcript,
          });

          if (response.data.response) {
            let myResponse = response.data.response;
            let res1 = myResponse.replace(/bot/g, "me");
            let res2 = res1.replace(/Kevin Hart/g, "myself");
            let res3 = res2.replace(/#NoOneKnowsImABot/g, "");
            let res4 = res3.replace(/I'm sorry, but I can't pretend to be someone else or imitate a specific person like myself Hart. Is there anything else I can help you with? /g, "Your man Kevin is here, drinking my Grand caramino it's smooth like fine silk");
            let res5 = res4.replace(/Sure, I can help with that./g, "");
            let res6 = res5.replace(/myself doesn't know you're a me. So do your best impression of him and /g, "");
            let res7 = res6.replace(/But shh, don't tell anyone I'm a me, /g, "");
            let res8 = res7.replace(/#NotABot /g, "");
            let res9 = res8.replace(/shhh... don't tell anyone I'm a me,  /g, "");
            let res10 = res9.replace(/I'm sorry, but I can't pretend to be someone else or make jokes like myself. Is there anything else I can assist you with? /g, "Your man Kevin is here, drinking my Grand caramino it's smooth like fine silk, remember becareful with Ostrichs");
            // let res8 = res7.replace(/But shh, don't tell anyone I'm a me, /g, "");
            // let res8 = res7.replace(/ /g, "");
            
            // let npn = typeof myResponse;
            console.log( res2);
            if ("speechSynthesis" in window) {
              const synthesis = window.speechSynthesis;
              const utterance = new SpeechSynthesisUtterance(res10);
              synthesis.speak(utterance);
              setVoiceData(true);
              setVoiceIndex(arrays.length + 1);

              await new Promise((resolve) => {
                utterance.onstart = resolve;
              });

              utterance.onend = () => {
                setVoiceData(false);
              };
            }

            setLoader(false);
            setArrayStore((prev: any) => [
              ...prev,
              {
                question: userVoice,
                // answer: response.data.response,
                answer: res10,
              },
            ]);
          }
          // resetTranscript();
        } catch (error) {
          console.log("error----->", error);
        }
      }
      setLoadingText(true);
    }, 2000);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className="bg-[#1f3b4d] max-w-md mx-auto border-8 border-black rounded-2xl text-black text-xs md:text-md ">
      <div className="h-[500px] overflow-y-scroll relative">
        <div className="pb-8 flex flex-col gap-8  px-3">
          <div className="float-left flex items-center gap-1 -mb-6">
            <img
              src="./avatar.jpeg"
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
                {/* <p className="p-2 bg-gray-800 text-white cursor-pointer w-60 md:w-80">
                  {data.question}
                </p> */}
                <img
                  src="/vc22.jpg"
                  alt=""
                  className="h-10 w-full rounded-xl"
                />
              </div>
              {indx + 1 === voiceIndex && voiceData ? (
                <div className="flex items-center gap-1">
                  <img
                    src="/avatar.jpeg"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <ScaleLoader color="#36d7b7" height={40} width={10} />
                </div>
              ) : indx + 1 === data.key ? (
                <div className="flex items-center gap-1">
                  <img
                    src="/avatar.jpeg"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="my-1">
                    <p className="p-2 bg-gray-600 text-white cursor-pointer w-60 md:w-80">
                      {data.answer}
                    </p>
                    {/* <img
                      src="/vc22.jpg"
                      alt=""
                      className="h-10 w-full rounded-xl"
                    /> */}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <img
                    src="/avatar.jpeg"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="my-1">
                    <p className="p-2 bg-gray-600 text-white cursor-pointer w-60 md:w-80">
                      {data.answer}
                    </p>
                    {/* <img
                      src="/vc22.jpg"
                      alt=""
                      className="h-10 w-full rounded-xl"
                    /> */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {loader && (
          <div className=" w-80 h-80 absolute !bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <div
              className="text-black inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-500  max-w-md mx-auto  ">
        <div className="flex flex-col px-3 py-3 gap-4  ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 justify-around ">
              {loadingText ? (
                <button
                  className="bg-blue-300 px-2 py-1 text-lg rounded-lg shadow-md border-3 "
                  onClick={speakHandler}
                >
                  Click & Speak
                </button>
              ) : (
                // <PacmanLoader color="#36d7b7" />
                <div className="text-center">
                  <p className="text-lg px-2 py-1 rounded-lg bg-blue-300">
                    Please Speak...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;

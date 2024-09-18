"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
const Accordion = () => {
  const [arrays, setArrayStore] = useState<any>([
    // {
    //   question1: "What inspired you to create Gran Caramino Tequila?",
    //   ans1: [
    //     "I wanted to create a tequila that embodies luxury and exceptional taste. Sooooo, Gran Caramino was born",
    //     " Kevin Hart Gran Caramino Tequila? My Tequila! It all started with a dream and a pinch of how do I make this taste “absolutely” amazing?",
    //   ],
    // },
  ]);

  const listAns1 = [
    " I wanted to create a tequila that embodies luxury and exceptional taste. Sooooo, Gran Caramino was born",
    " Kevin Hart Gran Caramino Tequila? My Tequila! It all started with a dream and a pinch of how do I make this taste “absolutely” amazing?",
  ];
  const listAns2 = [
    "Our Cristalino tequila is so very smooth, has a complex flavor profile with hints of oak and agave.",
    "Imagine Cristalino as the James Bond of tequilas  smooth, mysterious, and always leaves you wanting more!",
  ];
  const listAns3 = [
    "Our Añejo stands out for its unique blend of American oak, French oak, and excognac cask aging, resulting in a silkysmooth taste unlike any other.",
    "Our Añejo? It's like a fancy tango of flavors  aging in oak barrels and a touch of excognac cask for that smooth, silky finish!",
  ];
  const listAns4 = [
    "Gran Caramino stands out with its blend of charm, like me, and sophistication, like me, giving you a taste experience like no other.",
    "Gran Caramino? It&#39;s like the tequila version of a Hollywood blockbuster bold, smooth, and leaves you wanting a sequel!",
  ];
  const listAns5 = [
    "Cristalino tequila dances on your palate with a smoothness that whispers elegance, making every sip such a delightful journey. ",
    "Tasting Cristalino is like finding a pot of gold at the end of a rainbow  smooth, magical, and makes you feel like a tequila wizard!",
  ];
  const listAns6 = [
    "The idea behind our Añejo blend? It's like creating a symphony of flavors - the result is a silky-smooth tequila that's as unique as it is delicious.",
    "Our Añejo blend is the tequila equivalent of a gourmet meal aged to perfection, with a hint of 'mmm, that's delicious; in every sip!",
  ];

  const qstnAnswer = [
    {
      question1: "What inspired you to create Gran Caramino Tequila?",
      ans1: [
        "I wanted to create a tequila that embodies luxury and exceptional taste. Sooooo, Gran Caramino was born",
        " Kevin Hart Gran Caramino Tequila? My Tequila! It all started with a dream and a pinch of how do I make this taste “absolutely” amazing?",
      ],
    },
    {
      question1:
        "Can you tell me more about the flavors and aromas of your Cristalino tequila?",
      ans1: [
        "Our Cristalino tequila is so very smooth, has a complex flavor profile with hints of oak and agave.",
        "Imagine Cristalino as the James Bond of tequilas  smooth, mysterious, and always leaves you wanting more!",
      ],
    },
    {
      question1:
        "What sets your Añejo tequila apart from others on the market?",
      ans1: [
        "Our Añejo stands out for its unique blend of American oak, French oak, and ex-cognac cask aging, resulting in a silky-smooth taste unlike any other.",
        "Our Añejo? It's like a fancy tango of flavors - aging in oak barrels and a touch of ex-cognac cask for that smooth, silky finish!",
      ],
    },
    {
      question1:
        "What makes Gran Caramino unique compared to other tequilas on the market?",

      ans1: [
        "Gran Caramino stands out with its blend of charm, like me, and sophistication, like me, giving you a taste experience like no other.",
        "Gran Caramino? It&#39,s like the tequila version of a Hollywood blockbuster bold, smooth, and leaves you wanting a sequel!",
      ],
    },
    {
      question1:
        "Can you describe the flavor profile of the Cristalino tequila and what sets it apart?",

      ans1: [
        "Cristalino tequila dances on your palate with a smoothness that whispers elegance, making every sip such a delightful journey. ",
        "Tasting Cristalino is like finding a pot of gold at the end of a rainbow  smooth, magical, and makes you feel like a tequila wizard!",
      ],
    },
    {
      question1:
        "How did you come up with the idea for the special blend of Añejo tequila, and what do you feel it brings to the table in terms of taste experience?",

      ans1: [
        "The idea behind our Añejo blend? It's like creating a symphony of flavors - the result is a silky-smooth tequila that's as unique as it is delicious.",
        "Our Añejo blend is the tequila equivalent of a gourmet meal aged to perfection, with a hint of 'mmm, that's delicious, in every sip!",
      ],
    },
  ];

  // {
  //   for (let i = 0; i < qstnAnswer.length; i++) {
  //     console.log(qstnAnswer[i].question1);
  //   }
  // }

  const questionList = [
    "What inspired you to create Gran Caramino Tequila?",
    "Can you tell me more about the flavors and aromas of your Cristalino tequila?",
    "What sets your Añejo tequila apart from others on the market?",
    "What makes Gran Caramino unique compared to other tequilas on the market?",
    "Can you describe the flavor profile of the Cristalino tequila and what sets it apart?",
    "How did you come up with the idea for the special blend of Añejo tequila, and what do you feel it brings to the table in terms of taste experience?",
  ];
  const answerList = [
    [
      " I wanted to create a tequila that embodies luxury and exceptional taste. Sooooo, Gran Caramino was born",
      " Kevin Hart Gran Caramino Tequila? My Tequila! It all started with a dream and a pinch of how do I make this taste “absolutely” amazing?",
    ],
    [
      "Our Cristalino tequila is so very smooth, has a complex flavor profile with hints of oak and agave.",
      "Imagine Cristalino as the James Bond of tequilas  smooth, mysterious, and always leaves you wanting more!",
    ],
    [
      "Our Añejo stands out for its unique blend of American oak, French oak, and excognac cask aging, resulting in a silkysmooth taste unlike any other.",
      "Our Añejo? It's like a fancy tango of flavors  aging in oak barrels and a touch of excognac cask for that smooth, silky finish!",
    ],
    [
      "Gran Caramino stands out with its blend of charm, like me, and sophistication, like me, giving you a taste experience like no other.",
      "Gran Caramino? It&#39,s like the tequila version of a Hollywood blockbuster bold, smooth, and leaves you wanting a sequel!",
    ],
    [
      "Cristalino tequila dances on your palate with a smoothness that whispers elegance, making every sip such a delightful journey. ",
      "Tasting Cristalino is like finding a pot of gold at the end of a rainbow  smooth, magical, and makes you feel like a tequila wizard!",
    ],
    [
      "The idea behind our Añejo blend? It's like creating a symphony of flavors - the result is a silky-smooth tequila that's as unique as it is delicious.",
      "Our Añejo blend is the tequila equivalent of a gourmet meal aged to perfection, with a hint of 'mmm, that's delicious, in every sip!",
    ],
  ];
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(
    "What inspired you to create Gran Caramino Tequila?"
  );
  const ramd = Math.round(Math.random());
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ans4, setAns4] = useState("");
  const [ans5, setAns5] = useState("");
  const [ans6, setAns6] = useState("");
  // const check = qstnAnswer.filter((q) => q.question1 === question);
  // console.log("check.................", check[0]);

  // console.log("arrays.................", arrays);
  useEffect(() => {
    setAns1(listAns1[ramd]);
    setAns2(listAns2[ramd]);
    setAns3(listAns3[ramd]);
    setAns4(listAns4[ramd]);
    setAns5(listAns5[ramd]);
    setAns6(listAns6[ramd]);
  }, [ans1, ans2, ans3, ans4, ans5, ans6]);
  // useEffect(() => )
  const addQuestionToStore = (question: any) => {
    if (!qstnAnswer.some((q: any) => q.question1 === question.p)) {
      const check = qstnAnswer.filter((q) => q.question1 === question);
      setArrayStore((prev: any) => [...prev, check[0]]);
    }
  };
  const [loader, setLoader] = useState(false);
  const [userInput, setUserInput] = useState("");
  const handleChange = (e: any) => {
    const value = e.target.value;
    setUserInput(value);
  };

  const [ansindex, setAnsIndex] = useState<any>(null);
  const check = qstnAnswer.filter((q) => q.question1 === ansindex);
  // console.log("justcheck --->",check && check[0].ans1[ramd]);
  const loaderHandler = () => {
    setLoader(true);
    // setTimeout(() => {
    //   setLoader(false);
    // }, 2000);
  };

  //Button Handler
  const askHandler = async (e: any) => {
    // console.log("userInput ----->", userInput);
    if (e.keyCode === 13) {
      try {
        const response = await axios.post("api/chat", { userInput });
        // console.log("response----->", response);
        if (response) {
          setLoader(false);
          setUserInput("");
          setArrayStore((prev: any) => [
            ...prev,
            { question: userInput, answer: response.data.response },
          ]);
        }
      } catch (error) {
        console.log("error----->", error);
      }
    }
  };

  return (
    <div className="bg-[#1f3b4d] max-w-md mx-auto border-8 border-black rounded-2xl text-black text-xs md:text-md ">
      <div className="">
        <div className="">
          <div className="h-[500px] overflow-y-scroll relative">
            <div className="pb-8 flex flex-col gap-8  px-3">
              <div className="float-left flex items-center gap-1 -mb-6">
                <img
                  src="./avatar.jpeg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <p className="p-2 w-60 md:w-80 bg-gray-600 text-white cursor-pointer">
                  Hi Kevin here! What&#39;s up?{" "}
                </p>
              </div>
              {arrays.map((data: any, indx: any) => (
                <div key={indx} className="my-4">
                  <div className="flex flex-col gap-4">
                    <div className="self-end">
                      <p className="p-2 bg-gray-800 text-white cursor-pointer w-60 md:w-80">
                        {data.question}
                      </p>
                    </div>
                    {/* {arrays[arrays.length - 1] ? (
                    <>
                      {!loader ? (
                        <div className="float-left flex items-center gap-1">
                          <img
                            src="./avatar.jpeg"
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                          <p className="p-2 w-40 md:w-80 bg-gray-600 text-white cursor-pointer">
                            {data.ans1[ramd]}
                          </p>
                        </div>
                      ) : (
                        <div className="flex space-x-1   max-w-sm px-5 ">
                          <span className="sr-only">Loading...</span>
                          <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
                        </div>
                      )}
                    </>
                  ) : ( */}
                    <div className="float-left flex items-center gap-1">
                      <img
                        src="./avatar.jpeg"
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="p-2 w-60 md:w-80 bg-gray-600 text-white cursor-pointer">
                        {data.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {loader && (
              <div className="bg-gray-200 w-80 h-80 absolute !bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
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
            {/* <button className="bg-indigo-600 text-white font-bold py-3 px-5">
              Text
            </button> */}

            {/* {loader ? (
              <div className="flex space-x-1   max-w-sm px-5 ">
                <span className="sr-only">Loading...</span>
                <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
              </div>
            ) : null} */}
            <div className="flex flex-col px-3 py-3 gap-4  ">
              {/* {qstnAnswer.map((p, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setQuestion(p.question1);
                    addQuestionToStore(p.question1);
                    setLoader(true);
                    setAnsIndex(p.question1);
                  }}
                  className="p-2 bg-gray-200 cursor-pointer "
                >
                  {p.question1}
                </p>
              ))} */}
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
                    askHandler(), loaderHandler();
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
};

export default Accordion;

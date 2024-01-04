"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
    // const box = document.getElementById("box");
    // const textChange = document.getElementById("text-change");

    const randomNumber = Math.random() * 3000 + 3000;

    const [start, setStart] = useState(true);
    const [isStarted, setIsStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const startTimer = () => {
        console.log("Clicked");
        console.log("Time is: ", randomNumber);
        setTimeRemaining(0);
        setStart(true);
        setTimeout(() => {
            setIsTimerRunning(true);
            setStart(false);
        }, randomNumber);
    };

    useEffect(() => {
        if (isTimerRunning && timeRemaining < 5) {
            const intervalId = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime + 0.01);
                console.log(timeRemaining);
            }, 10);

            return () => clearInterval(intervalId);
        }
    }, [isTimerRunning, timeRemaining]);

    return (
        <>
            <div className="flex flex-col items-center gap-4 h-[100vh] justify-center bg-slate-900">
                {start ? (
                    <button
                        type="button"
                        onClick={() => {
                            startTimer();
                            setIsStarted(true);
                        }}
                        className={`bg-white w-96 h-96 text-2xl font-bold rounded-sm`}
                    >
                        {!isStarted && "Click me to get started"}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            setIsTimerRunning(false);
                            setShowModal(true);
                            console.log(
                                "You clicked the button",
                                timeRemaining.toString().slice(0, 3),
                                "Seconds"
                            );
                        }}
                        className={`bg-red-500 w-96 h-96  rounded-sm text-2xl text-white font-bold`}
                    ></button>
                )}

                <div className="text-4xl text-white font-bold">
                    {isStarted && start ? (
                        <div>
                            Click the box when it turns{" "}
                            <span className="text-red-500"> red</span>, click
                            the box!
                        </div>
                    ) : !start ? (
                        "Click now"
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div
                className={`${
                    showModal
                        ? "opacity-100 duration-500 transition-all translate-y-4"
                        : "opacity-0"
                } absolute top-2 translate-y-0 left-[35%] p-4 rounded-sm bg-white `}
            >
                <div className="text-2xl font-medium">
                    You clicked the button{" "}
                    <span className="font-bold">
                        {timeRemaining.toString().slice(0, 4)}
                    </span>{" "}
                    seconds.
                </div>
                <div className="flex justify-evenly mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="rounded-md font-medium  px-4 py-1 border"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setStart(true);
                            setIsStarted(false);
                            setTimeRemaining(0);
                            setIsTimerRunning(false);
                            setShowModal(false);
                        }}
                        className="rounded-md font-medium bg-green-700 text-white px-4 py-1 border"
                    >
                        Play again
                    </button>
                </div>
            </div>
        </>
    );
}

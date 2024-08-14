import React from "react";
import { assets } from "../assets/assets"; // Adjust path as necessary
import StyledButton from "./StyledButton";
import Lottie from 'react-lottie';
import animationData1 from '../assets/animation1.json'; // Adjust path as necessary

const Contentt = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData1, // Use the imported animation data here
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <section
      className="relative h-screen text-white bg-center bg-cover"
      style={{ backgroundImage: `url(${assets.degree})` }}
    >
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 py-12 bg-black bg-opacity-50">
        <div className="max-w-lg pl-8">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Best Online Courses
          </h2>
          <p className="mb-4 text-2xl md:text-3xl">
            Get educated online
          </p>
          <p className="mb-6 text-2xl md:text-3xl">
            From Your Home
          </p>
          <p className="mb-4 text-lg md:text-xl">
            Unlock your potential with our
          </p>
          <p className="mb-8 text-lg md:text-xl">
            expert-led courses and hands-on experience.
          </p>
          <div className="space-x-4">
            <button className="relative h-[50px] w-40 overflow-hidden border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full">
              <span className="relative z-10">Read More</span>
            </button>
            <StyledButton text="Join Now" />
          </div>
        </div>
      </div>
      <div className="absolute w-1/3 transform -translate-y-1/2 right-40 top-1/2">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </section>
  );
};

export default Contentt;

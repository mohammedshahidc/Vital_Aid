import React from 'react';

function About() {
  return (
    <div className="bg-sky-50 h-auto md:h-[520px] w-full relative pt-6">
      <div className="flex items-center justify-center bg-white w-full md:h-60 shadow-md sm: h-36">
        <div className="flex flex-row gap-8 md:flex-row md:gap-60 ">
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl md:text-5xl font-bold text-lime-500">50+</span>
            <span className="md:text-xl font-semibold text-lime-500">Blood Donors</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl md:text-5xl font-bold text-lime-500">150+</span>
            <span className="text-sm md:text-xl text-lime-500  font-semibold">Patient Support</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl md:text-5xl font-bold text-lime-500">20+</span>
            <span className="md:text-xl text-lime-500  font-semibold">Doctors</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-2xl md:text-5xl font-bold text-lime-500">100+</span>
            <span className="md:text-xl text-lime-500 font-semibold">Volunteers</span>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center mx-14 my-14 pb-4'>
        <div className='text-lime-600 md:text-3xl font-serif'>
        it is charitable health organization dedicated to bridging the gap between those in need and those
        who can help. Our mission is to provide timely medical support, connect patients with blood donors,
        supply essential medical equipment, and offer expert guidance from qualified doctors. With the compassionate
        assistance of our volunteers, we ensure that help reaches those who need it
        </div>
       
      </div>
    </div>
  );
}

export default About;

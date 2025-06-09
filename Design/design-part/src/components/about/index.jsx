import React from 'react'
import about from '../../../public/img/about.jpg';
import about2 from '../../../public/img/about2.jpg';
import Image from 'next/image'

const About = () => {
    return (
        <div className='py-20 w-full h-full bg-white'>

            <div className='text-center w-3/5 mx-auto flex justify-content-center flex-col'>

                <h1 className='bg-[#F5F6E4] text-[#5b74a7] text-center w-1/6 py-3 mx-auto text-[12px] font-semibold mb-5'>ABOUT US</h1>

                <div className='text-5xl font-semibold text-black tracking-normal mt-5' >
                    CREATE  YOUR  STORY IN  A  PLACE
                    <div className='inline relative'>
                        <div className='bg-[#e3ef53] w-[95%] h-[22%] absolute bottom-4 left-2 -z-50 leading-24'></div>
                        <span className='leading-24'>WHERE  DREAMS  </span>
                    </div>
                    AND  REALITY  MERGE.
                </div>

            </div>

            <div className='flex justify-between items-center mx-12 my-10 '>

                <div className="relative ">
                    {/* Decorative Element */}
                    <div className="bg-[#f3f5d0] w-[100px] h-[100px] absolute -top-8 -left-8 z-0"></div>

                    {/* Content */}
                    <div className="relative h-[305px] w-[340px] bg-black p-12 z-10 text-white">
                        <h1 className="underline underline-offset-2 text-xl font-semibold">OUR MISSION :</h1>
                        <p className="pt-4 text-base leading-7">
                            <span className="underline underline-offset-2 text-[#e3ef53]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span> do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est ante in nibh mauris cursus mattis molestie a iaculis.
                        </p>
                    </div>
                </div>


                <div className='w-1/2'>
                    <div className='py-4 px-6 bg-[#e3ef53] font-semibold w-1/3 mx-auto mt-2 text-black text-md text-center'>
                        Contact Our Agent
                    </div>
                    <div className='mt-24 px-28'>
                        <Image src={about} alt='background' className='mx-auto'></Image>
                    </div>
                </div>

                <div className='relative h-[305px] w-[340px] p-12  bg-[#F5F6E4]'>
                    <div className='absolute -right-25 -top-24 -z-50 '>
                        <Image src={about2} alt='background'></Image>
                    </div>
                    <div>
                        <h1 className='underline underline-offset-2 text-xl font-semibold text-black'>OUR VISSION :</h1>
                        <p className='pt-4 text-base leading-7 text-[#272829]'>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span className='underline underline-offset-2 font-semibold'> Est ante in nibh mauris cursus mattis molestie a iaculis.</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
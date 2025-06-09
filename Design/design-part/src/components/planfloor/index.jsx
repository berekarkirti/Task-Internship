// 'use client'

// import Image from 'next/image'
// import React, { useState } from 'react'
// import bgYellow from '../../../public/images/bgYellow.png'
// import plan from '../../../public/images/plan.png'
// import myplan1 from '../../../public/images/myplan1.jpg'
// import myplan2 from '../../../public/images/myplan2.jpg'
// import myplan3 from '../../../public/images/myplan3.jpg'
// import myplan4 from '../../../public/images/myplan4.jpg'
// import myplan5 from '../../../public/images/myplan5.jpg'

// const floorTab = [
//     {
//         id: 1,
//         title: 'BASEMENT',
//         img: myplan1,
//         squareFeet: '2,537',
//         parking: 2,
//         halfBaths: 4,
//         fullBaths: 2,
//         bedroom: 5
//     },
//     {
//         id: 2,
//         title: 'GROUND FLOOR',
//         img: myplan2,
//         squareFeet: '2,537',
//         parking: 2,
//         halfBaths: 4,
//         fullBaths: 2,
//         bedroom: 5
//     },
//     {
//         id: 3,
//         title: '1ST FLOOR',
//         img: myplan3,
//         squareFeet: '2,537',
//         parking: 2,
//         halfBaths: 4,
//         fullBaths: 2,
//         bedroom: 5
//     },
//     {
//         id: 4,
//         title: '2ND FLOOR',
//         img: myplan4,
//         squareFeet: '2,537',
//         parking: 2,
//         halfBaths: 4,
//         fullBaths: 2,
//         bedroom: 5
//     },
//     {
//         id: 5,
//         title: 'ROOFTOP',
//         img: myplan5,
//         squareFeet: '2,537',
//         parking: 2,
//         halfBaths: 4,
//         fullBaths: 2,
//         bedroom: 5
//     }
// ];

// const Plan = () => {
//     const [activeTab, setActiveTab] = useState(floorTab[0]);

//     return (
//         <div className='w-full h-full relative bg-[#F5F6E4] my-24 py-28 -z-10'>
//             <Image src={bgYellow} fill className='object-cover' alt='background' />
//             <div className='max-w-7xl mx-auto'>
//                 <div className='text-center w-3/5 mx-auto flex flex-col'>  
//                     <h1 className='bg-white text-[#5b74a7] text-center w-1/6 py-4 mx-auto text-xs font-semibold mb-5'>
//                         FLOOR PLANS
//                     </h1>
//                     <div className='text-6xl font-semibold'>
//                         SPILON SQUAT
//                         <div className='inline relative'>
//                             <div className='bg-[#e3ef53] w-[95%] h-[22%] absolute bottom-4 left-5 -z-50'></div>
//                             <span> PROPERTY </span>
//                         </div>
//                         FLOOR PLANS
//                     </div>
//                 </div>

//                 <div className='flex justify-between mt-10 mx-20 text-center'>
//                     {floorTab.map(tab => (
//                         <button 
//                             key={tab.id} 
//                             className={`border text-lg w-[210px] h-[60px] py-4 cursor-pointer transition-all 
//                                 ${activeTab.id === tab.id ? 'bg-[#e3ef53] font-bold' : 'hover:bg-[#e3ef53]'}`}
//                             onClick={() => setActiveTab(tab)}
//                         >
//                             {tab.title}
//                         </button>
//                     ))}
//                 </div>
//                 <div className='flex justify-between mt-20'>
//                     <div>
//                         <Image src={plan} alt='img1' />
//                     </div>
//                     <div className='bg-[#e3ef53] h-full p-8 border'>
//                         <div>
//                             <Image src={activeTab.img} alt='floor plan' />
//                         </div>
//                         <div className='space-y-5 py-8'>
//                             <div className='flex justify-between items-center'>
//                                 <span className='text-md font-semibold'>SQUARE FEET</span>
//                                 <h2 className='text-3xl font-semibold'>{activeTab.squareFeet}</h2>
//                             </div>
//                             <div className='flex justify-between'>
//                                 <span className='text-md font-semibold'>CAR PARKING</span>
//                                 <h2 className='text-3xl font-semibold'>{activeTab.parking}</h2>
//                             </div>
//                             <div className='flex justify-between'>
//                                 <span className='text-md font-semibold'>HALF BATHS</span>
//                                 <h2 className='text-3xl font-semibold'>{activeTab.halfBaths}</h2>
//                             </div>
//                             <div className='flex justify-between'>
//                                 <span className='text-md font-semibold'>FULL BATHS</span>
//                                 <h2 className='text-3xl font-semibold'>{activeTab.fullBaths}</h2>
//                             </div>
//                             <div className='flex justify-between'>
//                                 <span className='text-md font-semibold'>BED ROOM</span>
//                                 <h2 className='text-3xl font-semibold'>{activeTab.bedroom}</h2>
//                             </div>
//                         </div>
//                         <div className='bg-black text-white w-full py-4 text-center font-semibold'>Started Now</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Plan;

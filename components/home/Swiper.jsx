"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { swiperData } from '../../assets/swiper/swiperData';
import { FaCaretRight } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";




const SwiperTab = () => {
    return (
        <div className='relative'>

            <Swiper
                className='relative'
                modules={[Navigation, Pagination, Scrollbar, Autoplay, Parallax]}
                parallax={true}
                spaceBetween={10}
                slidesPerView={3}
                loop={true}
                navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
            // autoplay={{ delay: 3000 }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    swiperData.map((item, idx) => (
                        <SwiperSlide>
                            <div className='px-6 py-12 gap-6 flex flex-col bg-neutral-100 rounded-2xl'>
                                <div className='text-blue-500 flex bg-neutral-200 w-fit p-2 rounded-full'>
                                    {item.icon}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-2xl font-semibold'>{item.title}</p>
                                    <p className='text-neutral-500'>{item.description}</p>
                                </div>
                                <button className='text-blue-500 flex items-center gap-4'>
                                    {item.buttonText}
                                    <FaCaretRight />
                                </button>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className="flex justify-between gap-6 mt-10 items-center">
                <FaArrowCircleLeft size={30} className='custom-prev text-blue-500 cursor-pointer' />
                <div className='swiper-pagination flex items-center justify-center w-fit h-fit ' />
                <FaArrowCircleRight size={30} className='custom-next text-blue-500 cursor-pointer' />
            </div>

        </div>
    )
}

export default SwiperTab
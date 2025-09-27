'use client'
import React from 'react'
import image1 from '../../../../public/assets/BannerImage/BannerImg-1.jpg'
import image2 from '../../../../public/assets/BannerImage/BannerImg-2.jpg'
import image3 from '../../../../public/assets/BannerImage/BannerImg-3.jpg'
import image4 from '../../../../public/assets/BannerImage/BannerImg-4.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

export default function Banner() {
    return (
        <div>
            <Carousel autoPlay={true} interval={4000} infiniteLoop={true} emulateTouch={true} dynamicHeight={true} showThumbs={false}>
                <div>
                    <Image
                        src={image1}
                        width={600}
                        height={600}
                        alt='image-1'
                        className='object-cover w-full h-[600px]'
                    />
                </div>
                <div>
                    <Image
                        src={image2}
                        width={600}
                        height={600}
                        alt='image-1'
                        className='object-cover w-full h-[600px]'
                    />
                </div>
                <div>
                    <Image
                        src={image3}
                        width={600}
                        height={600}
                        alt='image-1'
                        className='object-cover w-full h-[600px]'
                    />
                </div>
                <div>
                    <Image
                        src={image4}
                        width={600}
                        height={600}
                        alt='image-1'
                        className='object-cover w-full h-[600px]'
                    />
                </div>
            </Carousel>
        </div>
    )
}

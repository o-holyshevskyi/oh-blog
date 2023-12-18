import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from 'react-responsive-carousel'; 
import './styles/carousel.min.css';

interface CarouselProps {
    children: React.ReactChild[];
}

export default function Carousel({ children }: CarouselProps) { 
    return ( 
        <div className='card'>
            <ReactCarousel
                className={`react-carousel`}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                swipeable={true}
                emulateTouch={true}
            > 
                {children}
            </ReactCarousel> 
        </div> 
    );
};
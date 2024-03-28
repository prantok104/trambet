import React from 'react';
import Image from "next/image";
import LoadingImage from "@/public/favicon.png";
const LoaderPage = () => {
  return (
    <div className='loading-page-start'>
        <Image src={LoadingImage} alt="loading image" />
    </div>
  )
}

export default LoaderPage
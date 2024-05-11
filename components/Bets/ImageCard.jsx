import Image from 'next/image'
import React from 'react'

const ImageCard = ({imagePath="https://placehold.co/60x60", team}) => {
  // console.log(team)
  return (
    <div className="bet-card-image text-center">
      <Image
        src={imagePath}
        width={30}
        height={30}
        alt="Team name"
        unoptimized
        style={{ borderRadius: "50%", padding: "2px", background: "#090F1E" }}
      />
      <h6 className="df-font mt-2">{team?.name}</h6>
    </div>
  );
};

export default ImageCard
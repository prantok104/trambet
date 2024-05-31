import { method } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HttpClientCall } from "../HTTPClient";

const ImageCard = ({
  imagePath = "https://placehold.co/60x60",
  team,
  imagelist,
}) => {
  const [image, setImage] = useState("https://placehold.co/60x60");
  const teamImage = (teamId, imagelists) => {
    console.log(imagelists, teamId);
    //Filter iamge from imageList 
    const base64Data = imagelists
        .filter(image => image.id == teamId).map(image => image.base64);

    if (base64Data.length > 0) {
      let imgUrl = `data:image/png;base64,${base64Data[0]}`;

      setImage(imgUrl);
    }
  };
  
  useEffect(() => {
    teamImage(team?.id, imagelist);
  }, []);
  return (
    <div className="bet-card-image text-center">
      <Image
        src={image}
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

export default ImageCard;

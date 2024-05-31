import { method } from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HttpClientCall } from "../HTTPClient";

const ImageCard = ({
  imagePath = "https://placehold.co/60x60",
  team,
  category,
}) => {
  const [image, setImage] = useState("https://placehold.co/60x60");
  const teamImage = async (teamId, cat) => {
    if (teamId && cat) {
      const res = await HttpClientCall({
        method: "GET",
        endpoint: "leaugeLogo/" + cat + "/" + teamId,
        includeAuth: false,
        data: [],
      });

      if (res.status) {
        let base64Data = res?.data[0]?.base64;
        // Create a data URL
        let imageUrl = `data:image/jpeg;base64,${base64Data}`;
        setImage(imageUrl);
      }
    }
  };
  useEffect(() => {
    teamImage(team?.id, category);
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

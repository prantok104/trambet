import React from 'react'
const ImageTitle = ({ image ="breadcrumb.jpg", title = "title" }) => {
  return (
    <div
     class="image-with-title"
      style={{
        backgroundImage: `url('/${image}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        width: "100%",
        height: "130px",
      }}
    >
      {title}
    </div>
  );
};

export default ImageTitle
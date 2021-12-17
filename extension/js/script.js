var ContentScript = (function () {
  const images = document.querySelectorAll("img");

  let imageArray = [];
  let emptyAlt = [];
  let imagesAlt = [];

  const getImages = () => {
    images.forEach((image) => {
      image.style = "border: 8px solid red";
      imageArray.push(image);
    });
  };

  const sortImages = () => {
    imageArray.filter((image) => {
      const altText = image.getAttribute("alt");
      !altText ? emptyAlt.push(image) : imagesAlt.push(image);
    });
  };

  getImages();
  sortImages();

  console.log(emptyAlt);
  console.log(imagesAlt);
})();

const images = document.getElementsByTagName('img');
console.log(images);

// create altWriteButtons on images
const altWriteButton = document.createElement('button');
altWriteButton.classList.add('altwrite__button');
altWriteButton.innerHTML = `edit <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><path d="M420,693c17.5,1.2,35.3-4,49.6-15.8l4.8-1.5L322.7,523.9l-1.5,4.8c-11.8,14.3-17.1,32.1-15.9,49.6l-53.8,168.5L420,693z M969.4,78.6l-49.6-49.6c-27.4-27.4-71.9-27.4-99.3,0L772.4,77l148.9,148.9l48.1-48.1C996.9,150.4,996.9,106,969.4,78.6z M870.2,277.1L721.2,128.2L375.3,474.1L524.2,623L870.2,277.1z M852.4,921.4H78V147.1h493.6V79H80.2C41.4,79,10,110.5,10,149.2v772.2c0,38.8,31.4,70.2,70.2,70.2h772.2c38.8,0,70.2-31.4,70.2-70.2V430h-70.2V921.4z"/></g>
</svg>`;

document.body.appendChild(altWriteButton);

for (const image of images) {
	image.after(altWriteButton.cloneNode(true));
}

altWriteButton.addEventListener('click', handleAltWriteButtonClick);

function handleAltWriteButtonClick(event) {
	console.log(event);
	event.stopPropagation();
}

const imgs = document.querySelectorAll('img');

let imageArray = [];
let emptyAlt = [];
let imagesAlt = [];

const getImages = () => {
	imgs.forEach((image) => {
		image.style = 'border: 8px solid red';
		imageArray.push(image);
	});
};

const sortImages = () => {
	imageArray.filter((image) => {
		const altText = image.getAttribute('alt');
		!altText ? emptyAlt.push(image) : imagesAlt.push(image);
	});
};

getImages();
sortImages();

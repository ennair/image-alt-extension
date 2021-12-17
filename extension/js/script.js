const baseURL = 'https://us-central1-altwrite-1dae9.cloudfunctions.net/webApi/rest/';
const getURL = baseURL + 'getAlt/';
const postURL = baseURL + 'saveAlt/';

async function getAltText(filename) {
	const urlString = `${getURL}${filename}`;

	let response = await fetch(urlString, {
		method: 'GET',
		mode: 'cors',
	});

	let responseJson = await response.json();
	return responseJson;
}

async function postAltText(filename, altText) {
	const urlString = `${postURL}${filename}`;

	let response = await fetch(urlString, {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
			imgAlt: altText,
		}),
	});

	let responseJson = await response.json();
	return responseJson;
}

const initButtons = () => {
	const images = document.getElementsByTagName('img');
	console.log(images);

	// create altWriteButtons on images

	const altWriteButton = document.createElement('button');
	altWriteButton.classList.add('altwrite__button');
	altWriteButton.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><path d="M420,693c17.5,1.2,35.3-4,49.6-15.8l4.8-1.5L322.7,523.9l-1.5,4.8c-11.8,14.3-17.1,32.1-15.9,49.6l-53.8,168.5L420,693z M969.4,78.6l-49.6-49.6c-27.4-27.4-71.9-27.4-99.3,0L772.4,77l148.9,148.9l48.1-48.1C996.9,150.4,996.9,106,969.4,78.6z M870.2,277.1L721.2,128.2L375.3,474.1L524.2,623L870.2,277.1z M852.4,921.4H78V147.1h493.6V79H80.2C41.4,79,10,110.5,10,149.2v772.2c0,38.8,31.4,70.2,70.2,70.2h772.2c38.8,0,70.2-31.4,70.2-70.2V430h-70.2V921.4z"/></g>
</svg>`;

	for (const image of images) {
		const button = altWriteButton.cloneNode(true);
		const altText = image.getAttribute('alt');
		const imageUrl = image.getAttribute('src');

		image.parentNode.classList.add('altwrite--relative');
		image.after(button);
		handleModalAction(button, altText, imageUrl);
	}
};

const initModal = (button, altText, imageUrl) => {
	const modalContainer = document.createElement('div');
	const modalText = document.createElement('h1');
	const inputForm = document.createElement('form');
	const input = document.createElement('input');
	const sendButton = document.createElement('button');
	const offsets = button.getBoundingClientRect();
	const top = offsets.top;
	const left = offsets.left;

	modalText.classList.add('altwrite__modal-title');
	modalText.innerHTML = 'Verbeter de alt-text van deze afbeelding';

	modalContainer.appendChild(modalText);
	modalContainer.classList.add('altwrite__modal-container');
	modalContainer.style.top = `${top}px`;
	modalContainer.style.left = `${left + 20}px`;
	modalContainer.appendChild(inputForm);

	input.classList.add('altwrite__modal-input');
	input.value = altText;

	sendButton.classList.add('altwrite__modal-send-button');
	sendButton.innerHTML = 'Verstuur';

	inputForm.appendChild(input);
	inputForm.appendChild(sendButton);

	inputForm.addEventListener('submit', (event) => {
		event.preventDefault();
		alert(`form submitted: ${imageUrl} -> ${input.value}`);
		editAltText(imageUrl, input.value);
	});

	document.body.appendChild(modalContainer);

	modalContainer.addEventListener('focusout', (event) => {
		modalContainer.hidden = true;
	});
};

const handleModalAction = (button, altText, imageUrl) => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		initModal(button, altText, imageUrl);
	});
};

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

initButtons();
getImages();
sortImages();

const editAltText = (button, altText) => {
	const image = button.previousSibling;
	console.log(image);
};

const reviseAltText = async () => {
	console.log(' a');
	if (window.location.href === 'https://www.nu.nl/binnenland/6173682/om-vervolgt-twee-agenten-voor-geweld-tijdens-coronademonstratie-malieveld.html') {
		console.log(' a');
		let targetImg = document.querySelector('img[src="https://media.nu.nl/m/3mfxa4xadouj_xwd640.jpg/om-vervolgt-twee-agenten-voor-geweld-tijdens-coronademonstratie-malieveld.jpg"]');
		newAlt = (await getAltText('om-vervolgt-twee-agenten-voor-geweld-tijdens-coronademonstratie-malieveld.jpg')).imgNewAlt;
		console.log(newAlt);
		targetImg.setAttribute('alt', newAlt);
		console.log(' a');
	}
}
reviseAltText();
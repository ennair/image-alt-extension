const baseURL = 'https://us-central1-altwrite-1dae9.cloudfunctions.net/webApi/rest/';
const getURL = baseURL + 'getAlt/';
const postURL = baseURL + 'saveAlt/';

async function getAltText(fileName) {
	const urlString = `${getURL}`;

	let response = await fetch(getURL, {
		method: 'GET',
		bod,
	});
	return;
}

async function postAltText() {
	return;
}

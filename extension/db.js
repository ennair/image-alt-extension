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

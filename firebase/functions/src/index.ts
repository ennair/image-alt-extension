import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use('/rest', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended:false}));

const database = admin.firestore();

export const webApi = functions.https.onRequest(main);

const imgAltsCollection = 'imgAlts';
interface ImgAlt {
    imgUrl: string,
    imgNewAlt: string
}

const altRequestsCollection = 'altRequests';
interface AltRequest {
    imgUrl: string,
    altRequestOpen: boolean;
}

// https://us-central1-altwrite-1dae9.cloudfunctions.net/webApi/rest/saveAlt
app.post('/saveAlt', async(req, res) => {
    const imgAlt:ImgAlt = {
        imgUrl: req.body['imgUrl'],
        imgNewAlt: req.body['imgNewAlt']
    }

    // todo: check if this was a requested alt, if so, close the request.
    // todo: check if this image already had an alt, if so, don't add.

    await database.collection(imgAltsCollection).add(imgAlt);
    res.status(201).send(`Created a new alt for image '${imgAlt.imgUrl}', written as: ${imgAlt.imgNewAlt}`);
});

// https://us-central1-altwrite-1dae9.cloudfunctions.net/webApi/rest/requestAlt
app.post('/requestAlt', async(req, res) => {
    const altRequest:AltRequest = {
        imgUrl: req.body['imgUrl'],
        altRequestOpen: true
    }

    // todo: check if this image already was requested, if so, don't add.

    await database.collection(altRequestsCollection).add(altRequest);
    res.status(201).send(`Opened a new alt request for image '${altRequest.imgUrl}'`);
});

// app.get('/getAlt/:imgUrl', (req, res) => {
//     // todo: return an image alt based on the imageUrl.
//     firebaseHelper.firestore
//         .getDocument(database, altsCollection, req.params.imgUrl)
//         .then(doc => res.status(200).send(doc))
//         .catch(error => res.status(400).send(`Cannot get alt: ${error}`));
// })
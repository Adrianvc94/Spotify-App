require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPGRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random()) * possible.length);
    }

    return text;
}

const statekey = 'spotify_auth_state';


app.get('/login', (req, res) => {

    const state = generateRandomString(16);

    res.cookie(statekey, state);

    const scope = 'user-read-private user-read-email';

    const queryParams = querystring.stringify({
        client_id : CLIENT_ID,
        response_type : 'code',
        redirect_uri : REDIRECT_URI,
        state : state,
        scope : scope
    });
    
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});





app.listen(port, () => {
    console.log(`Express app listening http://localhost:${port}`);
});
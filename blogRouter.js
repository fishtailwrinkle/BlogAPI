const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models'); 

BlogPosts.create(
	'Bitcoin trading starts on the huge CME exchange', 'Bitcoin has moved another step towards mainstream investing with the start of trading on the huge Chicago Mercantile Exchange financial futures market.', ' Satoshi Nakamoto');
BlogPosts.create(
	`Bitcoin's secretive creator could become the world's first trillionaire`, `We don't know the true identity of Satoshi Nakamoto, the creator of Bitcoin. We don't know if Nakamoto is a singular person or a group of people. We don't even know if Nakamoto is alive or dead.`, 'Mashable');


module.exports = router;
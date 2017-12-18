const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models'); 

BlogPosts.create(
	'Bitcoin trading starts on the huge CME exchange', 'Bitcoin has moved another step towards mainstream investing with the start of trading on the huge Chicago Mercantile Exchange financial futures market.', ' Satoshi Nakamoto');
BlogPosts.create(
	`Bitcoin's secretive creator could become the world's first trillionaire`, `We don't know the true identity of Satoshi Nakamoto, the creator of Bitcoin. We don't know if Nakamoto is a singular person or a group of people. We don't even know if Nakamoto is alive or dead.`, 'Mashable');

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted BlogPost \`${req.params.id}\``);
	res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if (req.params.id !== req.body.id) {
		const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
		console.error(message);
		return res.status(400).send(message);
	}

	console.log(`Updating BlogPost \`${req.params.id}\``);
	const item = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author	
	});
	res.status(204).end();
});

module.exports = router;
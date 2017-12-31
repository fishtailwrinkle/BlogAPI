const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server'); 

const should = chai.should();

chai.use(chaiHttp);

describe('Blog Posts', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	// GET
	it('should list items on GET', function() {
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');

				const expectedKeys = ['title', 'content', 'author', 'publishDate'];
				res.body.forEach(function(item) {
					item.should.be.a('object');	
					item.should.include.keys(expectedKeys);
				});
			});
	});

	// POST
	it('should add an item on POST', function() {
		const newItem = {title: 'Bitcoin\'s Real 2018 Bottleneck', content: 'After a year of explosive price growth, forks, failed forks and more, there is much that can be said about bitcoin in 2017.', author: 'Coindesk', publishDate: '20171226'};	
		return chai.request(app)
			.post('/blog-posts')
			.send(newItem)
			.then(function(res) {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
				res.body.id.should.not.be.null;
				res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
			});
	});

	// PUT
	it('should update items on PUT', function() {
		const newItem = {
			title: 'How high will Litecoin go in 2018 and should I buy it?', 
			content: 'Bitcoin may be the original cryptocurrency, but its largest competitors have been gaining significant ground against it in recent months.', 
			author: 'Telegraph', 
			publishDate: '20171230'
		};

		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				newItem.id = res.body[0].id;
				return chai.request(app)
					.put(`/blog-posts/${newItem.id}`)
					.send(newItem);
			})
			.then(function(res) {
				res.should.have.status(204);
			}); 
	});

	// Delete
	it('should remove items on DELETE', function() {
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				return chai.request(app)
					.delete(`/blog-posts/${res.body[0].id}`);
			})
			.then(function(res) {
				res.should.have.status(204);
			});
	});
});





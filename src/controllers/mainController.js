const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");                   
const priceFinal = (price, discount) => toThousand(price - (discount * price / 100).toFixed(0));

const controller = {
	index: (req, res) => {
		// Do the magic
		res.render('index', {
			visited: products.filter((product) => product.category === 'visited'),
			inSale: products.filter((product) => product.category === 'in-sale'),
			toThousand,
			priceFinal,
		})
	},
	search: (req, res) => {
		// Do the magic

		if(req.query.keywords.trim() !== '') {
			let resultSearch = products.filter((product) => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()));
			res.render('results', {
				resultSearch,
				priceFinal,
				keywords: req.query.keywords,
			});
		} else{
			res.redirect('/')
		}
	},
};

module.exports = controller;

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");     
const guardarJSON = () => fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf-8')
const priceFinal = (price, discount) => toThousand(price - (discount * price / 100).toFixed(0));
const checkId = (id,dataBase) => (id && !!dataBase.find(product => product.id === id));



const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
	   res.render('products', {
		  products,
		  toThousand,
		  priceFinal,
	   });
	},
 
	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
	   const idValido = parseInt(req.params.id);
	   if (checkId(idValido, products)) {
		  let productDetail = products.find((producto) => producto.id === idValido);
 
		  res.render('detail', {
			 productDetail,
			 products,
			 toThousand,
			 priceFinal,
		  });
	   } else {
		  res.redirect('/')
	   }
	},
 
	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	   res.render('product-create-form');
	},
 
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	   let newProduct = {
		  id: products[products.length - 1].id + 1,
		  name: req.body.name,
		  price: +req.body.price,
		  discount: +req.body.discount,
		  category: req.body.category,
		  description: req.body.description,
		  image: 'default-image.png',
	   };
	   products.push(newProduct);
	   guardarJSON();
	   res.redirect(`/products`);
	},
 
	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	   let product = products.find((product) => product.id === +req.params.id);
	   res.render('product-edit-form', {
		  product,
	   });
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	   products.forEach((product) => {
		  if (product.id === +req.params.id) {
			 product.name = req.body.name;
			 product.price = +req.body.price;
			 product.discount = +req.body.discount;
			 product.category = req.body.category;
			 product.description = req.body.description;
		  }
	   });
	   guardarJSON();
	   res.redirect(`/products/detail/${req.params.id}`);
	},
 
	// Delete - Delete one product from DB
destroy: (req, res) => {
  // Do the magic

  let product = products.find(product => product.id === +req.params.id)

  products.forEach(product => {
	if(product.id === +req.params.id){
		let productToDestroy = products.indexOf(product);
		products.splice(productToDestroy, 1)
	}
  })

  guardarJSON(product)
  
  res.redirect('/products')
},

 };

module.exports = controller;
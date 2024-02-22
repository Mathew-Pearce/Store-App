const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(4)
    .skip(1)
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query
  const queryObject = {}
  //if featured is set to true, filter
  if (featured) {
    queryObject.featured = featured === `true` ? true : false
  }
  //if company is set to true, filter
  if (company) {
    queryObject.company = company
  }
  //if name is used as a filter then filter the products by name
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  //if sort is used then sort the products
  let result = Product.find(queryObject)
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
    //if fields is used then filter the fields
  }
  //Show only the selected fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const products = await result

  console.log(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }

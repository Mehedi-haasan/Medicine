const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
const db =require('./config/db'); 
const Rating = require('./schema/rating.schema')
const Category = require('./schema/category.schema')
const ProductTemplate = require('./schema/productTemplate.schema')
const ProductVariant = require('./schema/productVariant.schema')
const ProductAttribute = require('./schema/productAttribute.schema')
const User = require('./schema/user.schema')
const OrderLine = require('./schema/orderLine.schema')
const Order = require('./schema/order.schema')




require('./routes/user.routes')(app);
require('./routes/productTemplate.routes')(app);



app.listen(4000, () => {
    console.log('Server is running at port 4000');
});

const express = require("express")
// routers
const productsRouter = require('./src/routes/products.route');
const loginRouter = require('./src/routes/login.route');
const categoriesRouter = require('./src/routes/category.route');
const brandRouter = require('./src/routes/brand.route');
const imgRouter = require('./src/routes/img.route');

const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/auth', loginRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandRouter);
app.use('/img', imgRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



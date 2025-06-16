const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const TypeProductRouter = require('./TypeProductRouter');
const SizeRouter = require('./SizeRouter');

const routers = (app) => {
    app.use('/api/user', UserRouter),
    app.use('/api/product', ProductRouter);
    app.use('/api/type-product', TypeProductRouter);
    app.use('/api/size', SizeRouter);
}

module.exports = routers;
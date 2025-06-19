
const ProductRouter = require('./ProductRouter');
const TypeProductRouter = require('./TypeProductRouter');
const SizeRouter = require('./SizeRouter');
const UsersRouter = require('./UsersRouter')

const routers = (app) => {
    app.use('/api/user', UsersRouter),
    app.use('/api/product', ProductRouter);
    app.use('/api/type-product', TypeProductRouter);
    app.use('/api/size', SizeRouter);
}

module.exports = routers;
const newsRouter = require('./news');
const meRouter = require('./me');
const videosRouter = require('./videos');
const siteRouter = require('./site');
const loginRouter = require('./login');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/videos', videosRouter);
    app.use('/auth', loginRouter);
    app.use('/', siteRouter);
}

module.exports = route;

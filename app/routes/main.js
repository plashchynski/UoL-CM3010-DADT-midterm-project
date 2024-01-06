// Student code start

const homeRouter = require('./home');
const analyzeRouter = require('./analyze');
const exploreRouter = require('./explore');

module.exports = (app) => {
    // purpose: display the home page /
    // inputs: no
    // outputs: html generated using template home.ejs
    app.use('/', homeRouter);
    app.use('/analyze', analyzeRouter);
    app.use('/explore', exploreRouter);
};

// Student code ends
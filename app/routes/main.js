const homeRouter = require('./home');
const processRouter = require('./process');

module.exports = (app) => {
    // purpose: display the home page /
    // inputs: no
    // outputs: html generated using template home.ejs
    app.use('/', homeRouter);
    app.use('/process', processRouter);
};

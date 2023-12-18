const homeRouter = require('./home');

module.exports = (app) => {
    // purpose: display the home page /
    // inputs: no
    // outputs: html generated using template home.ejs
    app.use('/', homeRouter);
};

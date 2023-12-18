var express = require('express');
var router = express.Router();

/* POST process. */
router.post('/', function(req, res, next) {
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.render('home');
  }

  console.log(req.files.file);

  res.render('home');
});

module.exports = router;

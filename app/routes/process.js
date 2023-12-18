var express = require('express');
var router = express.Router();

/* POST process. */
router.post('/', function(req, res, next) {
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.render('home');
  }

  const data = req.files.file.data.toString('utf8');
  // parse data
  let lines = data.split('\n');
  // skip lines that start with #
  lines = lines.filter(line => !line.startsWith('#'));

  // split every line by tab and create an array of objects
  lines = lines.map(line => {
    const values = line.split('\t');
    return {
      snp: values[0],
      chromosome: values[1],
      position: values[2],
      genotype: values[3].trim()
    }
  });

  console.log(lines[0]);

  res.render('results');
});

module.exports = router;

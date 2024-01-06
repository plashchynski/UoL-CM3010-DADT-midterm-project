// Student code start

var express = require('express');
const db = require('../services/db');
var router = express.Router();

/* POST process. */
router.post('/', async (req, res, next) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.render('home');
  }

  const data = req.files.file.data.toString('utf8');
  // parse data
  let dna_data = data.split('\n');
  // skip lines that start with #
  dna_data = dna_data.filter(line => !line.startsWith('#'));

  // split every line by tab and create an array of objects
  dna_data = dna_data.map(line => {
    const values = line.split('\t');
    let allele1;
    let allele2;

    if (values[3] !== undefined) {
      const genotype = values[3].trim();
      allele1 = genotype[0];
      allele2 = genotype[1];
      if (allele2 === undefined) {
        allele2 = allele1;
      }
    }

    return { snp_id: values[0], allele1, allele2 };
  });

  // filter out results with no SNP ID
  dna_data = dna_data.filter(result => result.snp_id !== '');

  // filter out results with no genotype
  dna_data = dna_data.filter(result => result.allele1 !== '-');

  const query = 'SELECT SNP.id, SNP.description, Genotype.magnitude, Genotype.repute, Genotype.summary, Genotype.description, Genotype.allele1, Genotype.allele2 \
                    FROM SNP \
                    JOIN Genotype ON SNP.id = Genotype.snp_id \
                WHERE ' +
                dna_data.map(item => `(SNP.id = ? AND Genotype.allele1 = ? AND Genotype.allele2 = ?)`).join(' OR ') +
                ' ORDER BY Genotype.magnitude DESC \
                LIMIT 100;';

  // Use a parameterized query to avoid SQL injection
  const params = dna_data.map(item => [item.snp_id, item.allele1, item.allele2]).flat();

  const results = await db.query(query, params);

  res.render('results', { results });
});

module.exports = router;
// Student code ends
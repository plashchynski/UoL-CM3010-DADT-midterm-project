var express = require('express');
const db = require('../services/db');
var router = express.Router();

/* POST process. */
router.get('/', async (req, res, next) => {
    const query = 'SELECT SNP.id, SNP.description, Genotype.magnitude, Genotype.repute, Genotype.summary, Genotype.description, Genotype.allele1, Genotype.allele2 \
        FROM SNP \
        JOIN Genotype ON SNP.id = Genotype.snp_id \
        ORDER BY Genotype.magnitude DESC \
        LIMIT 100;';

    // get the data from the database
    const results = await db.query(query);

    // render the page
    res.render('explore', { results });
});

module.exports = router;

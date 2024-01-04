var express = require('express');
const db = require('../services/db');
var router = express.Router();

/* POST process. */
router.get('/', async (req, res, next) => {
    // pagination
    const page = Number(req.query.page || 1);
    const limit = 10;
    const offset = (page - 1) * limit;

    const query = 'SELECT SNP.id, SNP.description, Genotype.magnitude, Genotype.repute, Genotype.summary, Genotype.description, Genotype.allele1, Genotype.allele2 \
        FROM SNP \
        JOIN Genotype ON SNP.id = Genotype.snp_id \
        ORDER BY Genotype.magnitude DESC LIMIT ? OFFSET ?;';

    // get the data from the database
    const results = await db.query(query, [limit, offset].map(String));

    // get the total number of pages
    const count_query = 'SELECT COUNT(*) FROM SNP JOIN Genotype ON SNP.id = Genotype.snp_id;';
    const count_reqults = await db.query(count_query);
    const page_count = Math.ceil(count_reqults[0]['COUNT(*)'] / limit);

    // render the page
    res.render('explore', { results, page, page_count });
});

module.exports = router;

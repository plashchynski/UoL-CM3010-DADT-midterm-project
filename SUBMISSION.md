1. Download PDF Report from Google DOC https://docs.google.com/document/d/1EhHkGs-h_qpA1em43lUtIBLx0wzwx_na54TkvXFyQ7o/edit
2. . .venv/bin/activate
2. Generate PDFs using gen_report.sh
3. Add resulting pdfs to the end of the report using Preview
4. Create MySQL dump of the database using: mysqldump -u root snpedia_db > snpedia_db.sql
5. Create a zip file of the whole project without SUBMISSION.md
6. Upload the zip file to the submission system
7. Unpack the zip file: unzip Archive.zip
8. Remove Archive.zip
9. Run the database:
mysql -u root
CREATE DATABASE snpedia_db;
mysql -u root snpedia_db < snpedia_db.sql

mysql -u root
use snpedia_db;
CREATE USER 'snpedia_user' IDENTIFIED BY 'J8FvnyBlkY';
GRANT SELECT ON snpedia_db.* TO 'snpedia_user';

10. Run the web server:
cd app/
npm run dev

11. https://snpedia.com/

Add CAPTION: SNPedia is a wiki-based bioinformatics website that serves as a database of single nucleotide polymorphisms.
AND TITLE: SNPedia

12. Add Exceptionals:

I web scraped the data from the website and built my own dataset.

This dataset is valuable beyond the scope of this project, as it can be useful for other projects as well.

I used MySQL data types not covered in class (ENUM, TEXT).

I used MySQL FULLTEXT search feature not covered in class.

I have performed a query optimization by using the EXPLAIN command and adding indexes to the tables.


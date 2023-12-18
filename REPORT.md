# CM3010 Databases and advanced data techniques
## Midterm coursework report

### 1. Introduction

This report outlines the processes and methods applied in the coursework for the "Databases and Advanced Data Techniques (CM3010)" module. It begins with the rationale behind the dataset selection and data modeling, progressing through the stages of designing, developing a relational database and an associated web application. Each section of the report follows these steps in order, detailing the approach taken in design, implementation, and the integration of the database with the web application.

### 2. Dataset

#### 2.1 Motivation and objectives

[SNPedia](https://www.snpedia.com/) has been selected as the primary data source for this project. SNPedia is a community-driven crowdsourcing initiative that collects and curates information about human genetic, with a particular focus on Single Nucleotide Polymorphisms (SNPs). SNPs are specific positions in DNA that vary among individuals and are known to correlate with various traits or diseases (phenotypes). For instance, [rs1805007](https://www.snpedia.com/index.php/Rs1805007) with a (T;T) variant is linked to red hair, while [rs4988235](https://www.snpedia.com/index.php/Rs4988235) with a (C;C) variant is associated with lactose intolerance.

The motivation to utilize SNPedia is rooted in an interest in bioinformatics and personal genomics, both of which are reshaping the future of healthcare and personalized medicine. Understanding the correlation between specific DNA positions and associated traits or diseases is invaluable. Such insights are crucial for predicting disease risk, determining drug response, unraveling the genetic basis of traits, and exploring population evolutionary history.

The aim of this project is to extract data from SNPedia and compile it into a dataset suitable for computational processes, using CSV files as medium. This dataset will then be used to establish a relational database, organizing the information in a structured, easily queryable form. A web application will also be developed, enabling specific, efficient queries and data presentation.

#### 2.1 Dataset assessment

SNPedia provides detailed information on over 100,000 SNPs. Each entry in SNPedia typically includes the location of the SNP in the DNA, associated traits or diseases, and the strength of these associations (magnitude). However, the format used in SNPedia, which is based on MediaWiki for ease of reading and editing, poses challenges for computer-based querying and processing. For instance, it's challenging to extract combined data about a specific SNP and its genotype variants, such as the (C;C) variant of rs1805007, because this information is spread across different pages.

Fortunately, SNPedia data is distributed under a [Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States License](http://creativecommons.org/licenses/by-nc-sa/3.0/us/). This license permits the use and redistribution of the data, aligning well with the objectives of this project. Furthermore, SNPedia explicitly allows web scraping and provides access to a [Bulk API](https://www.snpedia.com/index.php/Bulk) through [MediaWiki's API](https://www.mediawiki.org/wiki/API:Main_page), specifically for this purpose. Therefore, extracting data from SNPedia for this project is both legally compliant and ethically sound.

The dataset targeted for this project includes two main types of information: SNP data and genotype data. The SNP information covers aspects such as the SNP's name, its DNA location, related traits or diseases, and references to scientific papers. Each SNP has a set of associated PMIDs, and unique identifiers of PubMed records. SNPs are also categorized into various types, like 'Interesting', '23andMe SNP', or 'Y chromosome SNPs'. Genotype information encompasses the SNP's name, possible variations at that position, the magnitude of their effects, reputation (positive or negative), and the related traits or diseases. This dataset, with its multidimensional nature and complex relationships between different elements, is well-suited for modeling in a relational database.

In summary, the dataset from SNPedia offers real, openly accessible data that is complex enough for the aims of this project. It also provides a unique opportunity to explore the challenges of extracting data from a non-standardized source and organizing it into a structured, queryable form.

#### 2.2 Research questions

The dataset from SNPedia is full of useful information that can help answer many research questions. This project focuses on the following key questions:

* *Most Important SNPs:* Which SNPs have the greatest magnitude, indicating a strong impact on traits or diseases? This question seeks to identify SNPs that play a major role in human health and characteristics.

* *SNPs Related to Specific Traits or Diseases:* Are there specific SNPs linked to certain traits or diseases? A keyword search function could be useful for finding these connections in the dataset.

* *Use with Personal Genomics Services:* If there is a list of SNPs and their genotypes, like those provided by personal genomics services such as 23andMe, can the dataset be used to create a report about the traits or diseases linked to these SNPs? This aspect explores how the SNPedia data can be used to make personalized health reports based on someone's genetic information.

#### 2.3 Data extraction

The data extraction process is implemented in the iPython notebook "build_dataset.ipynb". This process adheres to the guidelines specified on the [Bulk API](https://www.snpedia.com/index.php/Bulk) page of SNPedia. It consists of three primary steps: extracting raw data, transforming it into a structured format, and then saving this structured data as CSV files.

Initially, raw data is gathered from SNPedia using the [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) using the `requests` HTTP client library. This data is temporarily stored in a Pandas DataFrame for subsequent processing. The `mwparserfromhell` package is then used to parse the raw data, extracting relevant information from the Wikitext markup. Upon completion of this parsing step, the refined data is saved into CSV files using the 'to_csv' method of Pandas.

More details about the data extraction process can be found in the iPython notebook "build_dataset.ipynb".

#### 2.4 The structure of the dataset

As a result of the data extraction stage we have a set of CSV files, each containing a specific type of information. The most important files are:

* `snps.csv` contains a list of SNPs, with their `ID` and a `Description`. The `ID` could be a name, like 'rs1805007', or a number, like 'i3003137'. The first one is a standard SNP ID, while the second one is a custom ID used by different personal genomics services as an alias for the standard ID or to represent a SNP that is not yet standardized and named officially. The `Description` is a short text briefly describing the SNP. Many SNPs do not have a description, but it is still included in the dataset for completeness. This list is complete and includes all SNPs extracted from SNPedia.

* `genotypes.csv` contains a list of genotypes (variants) for each SNP. Each genotype has two alleles, one from each parent: `allele1` and `allele2`. The `magnitude` column indicates the strength of the association between the genotype and the related traits or diseases. The `repute` column indicates whether the genotype is considered 'good', 'bad', or 'mixed'. The `summary` column provides a brief description of the genotype. The `description` column provides a more detailed description of the genotype. `snp` is the ID of the SNP that the genotype is associated with. Here each SNP can have multiple genotypes, but each genotype is associated with only one SNP. This list is complete and includes all genotypes extracted from SNPedia.

Other files provide additional information about SNPs:

* `pmids.csv` contains a list of PMIDs (PubMed IDs) for each SNP. [PubMed](https://pubmed.ncbi.nlm.nih.gov/) is a widely used database of biomedical literature. Each PMID is a unique identifier of a scientific paper in the PubMed database. The `snp` column contains the ID of the SNP that the PMID is associated with. The `PMID` column contains the PMID, while the `Title` column contains the title of the paper. Here each SNP can have multiple PMIDs, but each PMID is associated with only one SNP.

* `rsnums.csv` provides information about biological characteristics of each SNP. It includes the location of a SNP in DNA: `Gene`, `Chromosome`, `position`, `Orientation`, and `StabilizedOrientation`. The reference genomes: `Assembly`, `GenomeBuild`, and `dbSNPBuild`. A reference variant along with other known variants at this position: `ReferenceAllele`, `MissenseAllele`, `geno1`, `geno2`, `geno3`, etc.

* `clinvars.csv` contains information from [ClinVar](https://www.ncbi.nlm.nih.gov/clinvar/), a widely-used public database of reports of the relationships among human variations and phenotypes. Most of the columns with a `CLN` prefix are VCF fields from ClinVar. [VCF](https://en.wikipedia.org/wiki/Variant_Call_Format) is a standard format for storing genetic data. The specific meaning of these fields can be found in the ClinVar VCF specification. But in general, these fields provide more advanced information about the SNP, that is beyond the scope of questions explored in this project.

* `categories.csv` contains information about the categories that each SNP belongs to. These categories are defined by SNPedia editors and are not standardized. For example, 'Interesting' is a category that includes SNPs that are interesting to the editors of SNPedia. A `On chip 23andMe v5` category lists SNPs that are provided by the 23andMe v5 chip.

### 3. Data modeling

#### 3.1 Entity–relationship Model

To address the research questions outlined in the previous section, a subset of the dataset is required. This subset includes the following files:

* `snps.csv` - a list of SNPs, with their `ID` and a `Description`.
* `genotypes.csv` - a list of possible genotypes (variants) for each SNP. This is the most crucial file, as it catalogs information about meaning of a specific genotype, its magnitude, and the related traits or diseases.
* `pmids.csv` - a list of PMIDs (PubMed IDs) for each SNP. Would be useful for finding more information about a SNP in scientific papers.
* `rsnums.csv`: Providing biological characteristics of SNPs. Information from this file is valuable for more complex queries, such as identifying SNPs on a particular chromosome.


The `clinvars.csv` file contains information from the [ClinVar](https://www.ncbi.nlm.nih.gov/clinvar/) database. This advanced information is not required for the research questions outlined in this project. But the model will be designed in an extensible way that allows for the integration of this information in the future.

From these files, the following entities can be identified:

##### SNP

The SNP entity stems from the `snps.csv` file. This file contains a complete list of SNPs extracted from SNPedia. Therefore, all related entities will be dependent on this entity. The SNP entity will have the following attributes:

* A primary key `id` that is a unique identifier of the SNP, such as 'rs1805007' or 'i3003137'. The string identifier is used instead of a number, as it is guaranteed to be unique, human-readable, not subject to change, and is meaningful as a foreign key in other tables.

* Non-key attributes `Description` from `snps.csv`. This is a general description of the SNP.

* Additional attributes from `rsnums.csv`: `gene`, `chromosome`, and `position`.

All non-key attributes should be optional, as some SNPs do not have this information. This entity will have a one-to-many relationship with _Genotype_ and a many-to-many relationship with _Category_ and _Literature_. 

##### Genotype

The Genotype entity stems from the `genotypes.csv` file. This file contains a list of possible genotypes (variants) for each SNP. This entity will have a many-to-one relationship with the _SNP_. The _Genotype_ entity is dependent on the _SNP_, as it doesn't make sense without a parent SNP. The _Genotype_ entity will have the following attributes:

* A primary key `id` of type INT.

* A foreign key `snp_id` referencing the SNP it belongs to.

* Non-key attributes `allele1`, `allele2`, `magnitude`, `repute`, `summary`, `description`.

The `allele1` attribute is mandatory, but `allele2` is optional, as genotypes from X and Y chromosomes in men have only one allele. The `magnitude`, `summary`, `description` attributes are optional, as some genotypes do not have them.

#####  Category

This entity stems from the `categories.csv` file. This file contains a list of snp-category pairs. The unique categories from this file will be extracted and used as Category names. This entity will have the following attributes:

* A primary key `id` of type INT.
* A non-key attribute `name`.

The `name` is a mandatory attribute. Name will have a unique constraint, as each category should have a unique name. However, name is not a primary key, as it is subject to change, that leads to a change of the foreign keys in all related entities that potentially leads to performance penalty and update anomalies.

This entity will have a many-to-many relationship with _SNP_ via a junction table.

##### Literature

This entity stems from the `pmids.csv` file. This file contains a list of snp-pmid pairs. The unique PMIDs from this file will be extracted to populate this entity. This entity will have the following attributes:

* A primary key `id` of type INT.
* non-key attributes `PMID`, `title`.

This entity will have a many-to-many relationship with _SNP_ via a junction table.


#### 3.2 Entity–relationship Diagram

The entity-relationship diagram below illustrates the relationships between these entities:

#### 3.3 List of tables

The following tables will be created in the database:

##### SNP

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | VARCHAR(255) | PRIMARY KEY | Unique identifier of the SNP |
| description | TEXT | | A text description of the SNP |
| gene | VARCHAR(255) | | The gene that the SNP is located in |
| chromosome | VARCHAR(255) | | The chromosome that the SNP is located on |
| position | INT | | The position of the SNP on the chromosome |

##### Genotype

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY | Unique identifier of the genotype |
| snp_id | VARCHAR(255) | FOREIGN KEY, NOT NULL | The ID of the SNP that the genotype belongs to |
| allele1 | VARCHAR(255) | NOT NULL | The first allele of the genotype |
| allele2 | VARCHAR(255) | | The second allele of the genotype |
| magnitude | INT | | The magnitude of the genotype |
| repute | ENUM('good', 'bad', 'mixed') | | The reputation of the genotype |
| summary | TEXT | | A brief description of the genotype |
| description | TEXT | | A detailed description of the genotype |

##### Category

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY | Unique identifier of the category |
| name | VARCHAR(255) | UNIQUE, NOT NULL | The name of the category |

##### Literature

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | INT | PRIMARY KEY | Unique identifier of the literature |
| PMID | INT | UNIQUE, NOT NULL | The PubMed ID of the literature |
| title | VARCHAR(255) | | The title of the literature |

##### SNP_Category

This is a junction table between _SNP_ and _Category_. It does not have a separate primary key because the combination of `snp_id` and `category_id` is unique.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| snp_id | VARCHAR(255) | FOREIGN KEY, NOT NULL | The ID of the SNP that the category belongs to |
| category_id | INT | FOREIGN KEY, NOT NULL | The ID of the category that the SNP belongs to |

##### SNP_Literature

This is a junction table between _SNP_ and _Literature_. It does not have a separate primary key because the combination of `snp_id` and `literature_id` is unique.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| snp_id | VARCHAR(255) | FOREIGN KEY, NOT NULL | The ID of the SNP that the literature belongs to |
| literature_id | INT | FOREIGN KEY, NOT NULL | The ID of the literature that the SNP belongs to |


#### 3.4 Normal Form Analysis

Database normalization (Amato, 2023) is a process used in relational database design to organize data efficiently and reduce data redundancy while ensuring data integrity. It involves breaking down large tables into smaller,related tables and defining relationships between them. The main goals of database normalization are to eliminate data anomalies, reduce data duplication, and make the database more manageable.

Here is an assessment of the proposed database design against the normal forms:

##### 1NF

Lewis (2016) states that a relation is in first normal form (1NF) if and only if all the domains in which its attributes are defined contain scalar values only. In the proposed model, all attributes in all relations are defined atomic values and do not use of composite types, like arrays or JSON objects.

Therefore, the relations are in the first normal form.

##### 2NF

Lewis (2016) states that a relation is in second normal form (2NF) if and only if:
1. it is in 1NF; and
2. every non-key attribute is irreducibly dependent on the primary key.

All relations in the proposed model satisfy these conditions:

* All relations are in 1NF.
* All non-key attribute is irreducibly dependent on the primary key. There are no non-key attributes that can be derived from a part of a primary key.

Therefore, the relations are in the second normal form.

##### 3NF

Lewis (2016) states that a relation is in third normal form (3NF) if and only if it is in 2NF and every non-key attribute is non-transitively dependent on the primary key.

All relations in the proposed model satisfy these conditions:

* All tables are in 2NF.
* There are no transitive dependencies, as all non-key attributes depend exclusively on primary keys. For instance, the `magnitude` and `repute` attributes in the _Genotype_ table are not dependent on each other and represent independent characteristics of the genotype. There are no non-key attributes that can be derived from other non-key attributes.

Therefore, the database design is in the third normal form.

##### BCNF

This is a more strict version of the third normal form and sometimes referred to as the "third and a half" normal form. Lewis (2016) states that a relation is in Boyce-Codd normal form (BCNF) if and only if every functional dependency has a candidate key as its determinant.

All relations in the proposed model satisfy these conditions as there are no attributes that are functionally dependent on a part of a candidate key.


##### 4NF

Lewis (2016) states that a relation R is in fourth normal form (4NF) if and only if for any existing multi-valued dependency A ↠ B (where A and B are subsets of the attributes of R), A is a candidate key of R – so all the attributes of R are functionally dependent on A.

According to the Wikipedia article on [multi-valued dependencies](https://en.wikipedia.org/wiki/Multivalued_dependency), a multivalued dependency exists when there are at least three attributes (like X,Y and Z) in a relation and for a value of X there is a well defined set of values of Y and a well defined set of values of Z. However, the set of values of Y is independent of set Z and vice versa.

In the _Genotype_ relation of the proposed model, the `allele1` and `allele2` attributes are both dependent on the `id`, but independent of each other. However, the `id` is a candidate key of the _Genotype_. Therefore, the relation is in 4NF.

The _SNP_Category_ and _SNP_Literature_ resolve many-to-many relationships between _SNP_ and _Category_ and _Literature_ respectively to avoid multi-valued dependencies. There are no other multi-valued dependencies in the proposed model that would violate the 4NF. Therefore, the database design is in the fourth normal form.

##### 5NF

Lewis (2016) states that a relation is in fifth normal form (5NF) if and only if all its join dependencies are implied by its candidate keys. 

In over words, to be in 5NF, every join dependency should have a superkey component. In the proposed model, there are join dependencies between _SNP_ and _Genotype_, _Category_, and _Literature_. All these join dependencies have a superkey component, as the primary key of _SNP_ is a superkey. _Category_ and _Literature_ are dependent on _SNP_ via a junction table, which has a composite primary key of `snp_id` and `category_id` or `literature_id`. Therefore, the database design is in the fifth normal form.

### 4. Database implementation

#### 4.1 Database Schema

The database is created using the following SQL statements:

```sql
CREATE DATABASE snpedia_db;
USE snpedia_db;

CREATE TABLE SNP (
    id VARCHAR(255) PRIMARY KEY,
    description TEXT,
    gene VARCHAR(255),
    chromosome VARCHAR(255),
    position INT
);

CREATE TABLE Genotype (
    id INT PRIMARY KEY AUTO_INCREMENT,
    snp_id VARCHAR(255) NOT NULL,
    allele1 VARCHAR(255) NOT NULL,
    allele2 VARCHAR(255),
    magnitude INT,
    repute ENUM('good', 'bad', 'mixed'),
    summary TEXT,
    description TEXT,
    FOREIGN KEY (snp_id) REFERENCES SNP(id)
);

CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Literature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    PMID INT UNIQUE NOT NULL,
    title VARCHAR(255)
);

-- this is a junction table to link SNPs to categories as a many-to-many relationship
CREATE TABLE SNP_Category (
    snp_id VARCHAR(255),
    category_id INT,
    PRIMARY KEY (snp_id, category_id),
    FOREIGN KEY (snp_id) REFERENCES SNP(id),
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- this is a junction table to link SNPs to literature as a many-to-many relationship
CREATE TABLE SNP_Literature (
    snp_id VARCHAR(255),
    literature_id INT,
    PRIMARY KEY (snp_id, literature_id),
    FOREIGN KEY (snp_id) REFERENCES SNP(id),
    FOREIGN KEY (literature_id) REFERENCES Literature(id)
);
```

#### 4.2 Data Import

The data is imported into the database using the following Python script:

```python
import pandas as pd
from sqlalchemy import create_engine

# create a database connection
engine = create_engine('mysql+mysqlconnector://root:@localhost:3306/snpedia_db')

# SNP relation contains information from two files: snps.csv and rsnums.csv
# load data from these files into a Pandas DataFrames
snps_df = pd.read_csv('dataset/snps.csv', index_col=0)
rsnums_df = pd.read_csv('dataset/rsnums.csv', index_col=0)

# Merge these DataFrames into a single DataFrame
df = pd.merge(snps_df, rsnums_df, how="left", left_index=True, right_index=True)

# Drop unused columns, rename columns to match the database schema
df = df.drop(columns=["gene"]).rename(columns={"Description": "description", "Gene": "gene", "Chromosome": "chromosome", "Position": "position"})[["description", "chromosome", "gene", "position"]]

# Write the DataFrame to the database
df.to_sql('SNP', con=engine, if_exists='append', index_label="id")
```

### 5. Web application

### 6. References

Amato, N. (2023) _Mastering database normalization: A comprehensive exploration of normal forms_ [Online] Available from: https://www.researchgate.net/publication/374509386_Mastering_database_normalization_A_comprehensive_exploration_of_normal_forms [17 December 2023].

Lewis, D. (2016). _CO2209 Database systems._ London: University of London.

Wikipedia contributors. (2023) _Multivalued dependency_ [Online] Wikipedia, The Free Encyclopedia. Available from: https://en.wikipedia.org/wiki/Multivalued_dependency [17 December 2023].
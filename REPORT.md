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

The dataset targeted for this project includes two main types of information: SNP data and genotype data. The SNP information covers aspects such as the SNP's name, its DNA location, related traits or diseases, and references to scientific papers. Each SNP has a set of associated PMIDs, an unique identifiers of PubMed records. SNPs are also categorized into various types, like 'Interesting', '23andMe SNP', or 'Y chromosome SNPs'. Genotype information encompasses the SNP's name, possible variations at that position, the magnitude of their effects, reputation (positive or negative), and the related traits or diseases. This dataset, with its multi-dimensional nature and complex relationships between different elements, is well-suited for modeling in a relational database.

In summary, the dataset from SNPedia offers real, openly accessible data that is complex enough for the aims of this project. It also provides a unique opportunity to explore the challenges of extracting data from a non-standardized source and organizing it into a structured, queryable form.

#### 2.2 Research questions

The dataset from SNPedia is full of useful information that can help answer many research questions. This project focuses on the following key questions:

* *Most Important SNPs:* Which SNPs have the greatest magnitude, indicating a strong impact on traits or diseases? This question seeks to identify SNPs that play a major role in human health and characteristics.

* *SNPs Related to Specific Traits or Diseases:* Are there specific SNPs linked to certain traits or diseases? A keyword search function could be useful for finding these connections in the dataset.

* *Use with Personal Genomics Services:* If there is a list of SNPs and their genotypes, like those provided by personal genomics services such as 23andMe, can the dataset be used to create a report about the traits or diseases linked to these SNPs? This aspect explores how the SNPedia data can be used to make personalized health reports based on someone's genetic information.

#### 2.3 Data extraction

The data extraction process is implemented in iPython notebook "build_dataset.ipynb". This process adheres to the guidelines specified on the [Bulk API](https://www.snpedia.com/index.php/Bulk) page of SNPedia. It consists of three primary steps: extracting raw data, transforming it into a structured format, and then saving this structured data as CSV files.

Initially, raw data is gathered from SNPedia using the [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) using the `requests` HTTP client library. This data is temporarily stored in a Pandas DataFrame for subsequent processing. The `mwparserfromhell` package is then used to parse the raw data, extracting relevant information from the Wikitext markup. Upon completion of this parsing step, the refined data is saved into CSV files using the 'to_csv' method of Pandas.

More details about the data extraction process can be found in the iPython notebook "build_dataset.ipynb".


### 3. Data modeling

First, let explore the dataset and its structure. The dataset consists of 2 CSV files, one file "snps.csv" contains information about SNPs, and the other file "genotypes.csv" contains information about genotypes (specific variations of SNPs). The "snps.csv" contains 100
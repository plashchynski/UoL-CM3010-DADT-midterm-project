CREATE TABLE SNP (
    id VARCHAR(255) PRIMARY KEY,
    description TEXT,
    gene VARCHAR(255),
    chromosome VARCHAR(255),
    position INT
);

CREATE TABLE Genotype (
    id INT PRIMARY KEY AUTO_INCREMENT,
    snp_id VARCHAR(255),
    allele1 VARCHAR(255) NOT NULL,
    allele2 VARCHAR(255),
    magnitude INT,
    repute ENUM('good', 'bad'),
    summary VARCHAR(255),
    description TEXT,
    FOREIGN KEY (snp_id) REFERENCES SNP(id)
);

CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE Literature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    PMID INT UNIQUE NOT NULL,
    title TEXT
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

#!/bin/bash

rm build_dataset.pdf data_import.pdf

jupyter nbconvert --to pdf build_dataset.ipynb --output build_dataset.pdf
jupyter nbconvert --to pdf data_import.ipynb --output data_import.pdf

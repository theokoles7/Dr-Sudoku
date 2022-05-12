#!/bin/bash

echo "Pulling from master..."
cd /home/theokoles/Projects/Custom Apps/Dr-Sudoku
git pull origin master

echo "Building project..."
cd /home/theokoles/Projects/Custom Apps/Dr-Sudoku/ui
ng build --output-path ../docs --base-href /Dr-Sudoku/

echo "Copying index.html and renaming to 404.html..."
cd /home/theokoles/Projects/Custom Apps/Dr-Sudoku/docs
cp index.html 404.html

echo "Pushing to repo..."
cd /home/theokoles/Projects/Custom Apps/Dr-Sudoku
git add .
git commit -m "Build $(date)"
git push origin prod

echo "Script complete!"
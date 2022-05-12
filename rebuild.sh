#!/bin/bash

echo "Pulling from master..."
cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku" & wait

git pull origin master & wait

echo "Building project..."
cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku/ui" & wait
echo "PWD: $(pwd)"

ng build --output-path ../docs --base-href /Dr-Sudoku/ & wait

echo "Copying index.html and renaming to 404.html..."
cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku/docs" & wait

cp index.html 404.html & wait

echo "Pushing to repo..."
cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku" & wait

git add . & wait

git commit -m "Build $(date)" & wait

git push origin prod & wait

echo "Script complete!"
#!/bin/bash

echo "Pulling from master..."
echo "PWD: $(pwd)"

git pull origin master &
wait

build

echo "Copying index.html and renaming to 404.html..."
cd "../docs/" &
wait
echo "PWD: $(pwd)"

cp index.html 404.html &
wait

echo "Pushing to repo..."
cd ".." &
wait
echo "PWD: $(pwd)"

git add . &
wait

git commit -m "Build $(date)" &
wait

git push origin prod &
wait

echo "Script complete!"

function build(){
  echo "Executing build..."
  cd ./ui/
  echo "\tNavigated to ./ui"
  ng build --output-path ../docs --base-href /Dr-Sudoku/ &
  wait
  echo "\tBuild complete!"
}
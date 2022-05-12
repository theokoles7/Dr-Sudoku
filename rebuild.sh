#!/bin/bash

function pull(){
  echo "Pulling from master..."
  cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku/"
  echo "=> Navigated to $(pwd)"
  git pull origin master &
  wait
  echo "=> Pull complete! -------------------------------"
}

function build(){
  echo "Executing build..."
  cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku/ui/"
  echo "=> Navigated to $(pwd)"
  ng build --output-path ../docs --base-href /Dr-Sudoku/ &
  wait
  echo "=> Build complete! ----------------------------"
}

function copyFile(){
  echo "Copying index.html to 404.html..."
  cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku/docs/"
  echo "=> Navigated to $(pwd)"
  cp index.html 404.html &
  wait
  echo "=> Copy complete! -----------------------------"
}

function commit(){
  echo "Committing build to branch..."
  cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku/"
  echo "=> Navigated to $(pwd)"
  git status & wait
  git add . & wait
  echo "=> Changes added to tree"
  git status & wait
  git commit -m "Build $(date)" & wait
  echo "=> Changes committed to branch"
  git status & wait
  echo "=> Commit complete! ---------------------------"
}

function push(){
  echo "Pushing to repository..."
  cd "/home/theokoles/Projects/Custom Apps/Dr-Sudoku/"
  echo "=> Navigated to $(pwd)"
  git push origin master & wait
  echo "=> Push complete! -----------------------------"
}

pull
build
copy
commit
push

echo "******* Script complete! *******"
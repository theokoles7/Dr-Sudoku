# Dr. Sudoku
Animated Sudoku solver and technique helper

## Algorithms

### Backtrack
The back track algorithm works by traversing every empty cell in the grid (row by row, column by column) and tests each of the numbers 1 through 9 as valid candidates in the cell. If a number is found to be a valid candidate (meaning that it violates none of the rules of Sudoku), that number is assigned to the cell.
If, when the algorithm moves to the next empty cell, there is no valid candidate, that simply means that the number previously entered was an invalid entry after all. The back track mechanism of the algorithm is then utilized to go back to the previous cell and find the next valid candidate before again moving on to the following empty cells.
```
=====================================
|      BACKTRACK (BRUTE FORCE)      |
|===================================|
|DIFFICULTY     SOLVED          TIME|
|-----------------------------------|
|EASY           true         1.03 ms|
|EASY           true         0.14 ms|
|EASY           true         0.24 ms|
|MEDIUM         true         2.07 ms|
|MEDIUM         true         1.13 ms|
|MEDIUM         true         0.24 ms|
|HARD           true         0.24 ms|
|HARD           true         6.27 ms|
|HARD           true         6.15 ms|
|EXPERT         true        13.02 ms|
|EXPERT         true         5.65 ms|
|EXPERT         true         7.51 ms|
|EVIL           true        16.11 ms|
|EVIL           true        13.17 ms|
|EVIL           true         2.79 ms|
|17 Clues       true       522.46 ms|
|17 Clues       true      1437.04 ms|
|17 Clues       true       225.94 ms|
=====================================
```

### Enhanced Backtrack
An enhanced version of the backtrack algorithm that first populates every empty cell's pencil marks with any valid candidates then tests only those pencil marks as valid entries instead of all numbers 1 - 9.
```
=====================================
|        ENHANCED BACKTRACK         |
|===================================|
|DIFFICULTY     SOLVED          TIME|
|-----------------------------------|
|EASY           true         1.33 ms|
|EASY           true         0.44 ms|
|EASY           true         0.39 ms|
|MEDIUM         true         0.47 ms|
|MEDIUM         true         0.29 ms|
|MEDIUM         true         0.24 ms|
|HARD           true         0.21 ms|
|HARD           true         0.17 ms|
|HARD           true         0.13 ms|
|EXPERT         true         0.13 ms|
|EXPERT         true         0.11 ms|
|EXPERT         true         0.11 ms|
|EVIL           true         0.11 ms|
|EVIL           true         0.11 ms|
|EVIL           true         0.11 ms|
|17 Clues       true         0.14 ms|
|17 Clues       true         0.12 ms|
|17 Clues       true         0.12 ms|
=====================================
```

## Techniques

### Single Blank
The "single blank" technique simply tests if a cell is the only blank in a row, column, or box and assigns that cells value as the difference of 45 minus the sum of the already existing entries in the row/column/box.
```
-------------------------------------
| 5 | 8 | 6 | 1 | 3 | 2 |   | 4 | 7 |
-------------------------------------
|   |   |   |   |   |   | 2 | 1 | 6 |
-------------------------------------
| 9 | 1 |   | 7 |   | 4 |   |   | 3 |
-------------------------------------
| 8 |   |   |   | 2 |   |   |   |   |
-------------------------------------
| 2 |   | 3 | 9 | 1 |   | 7 |   |   |
-------------------------------------
| 7 | 9 |   |   |   | 3 | 4 |   | 5 |
-------------------------------------
| 6 |   |   |   |   | 1 | 5 |   | 4 |
-------------------------------------
| 1 | 5 |   |   | 4 |   | 6 | 7 | 2 |
-------------------------------------
| 3 |   |   | 2 |   |   | 1 | 8 | 9 |
-------------------------------------

[0, 6] = 9 (Single Blank in row)
[1, 0] = 4 (Single Blank in col)
[6, 7] = 3 (Single Blank in box)

-------------------------------------
| 5 | 8 | 6 | 1 | 3 | 2 | 9 | 4 | 7 |
-------------------------------------
| 4 |   |   |   |   |   | 2 | 1 | 6 |
-------------------------------------
| 9 | 1 |   | 7 |   | 4 |   |   | 3 |
-------------------------------------
| 8 |   |   |   | 2 |   |   |   |   |
-------------------------------------
| 2 |   | 3 | 9 | 1 |   | 7 |   |   |
-------------------------------------
| 7 | 9 |   |   |   | 3 | 4 |   | 5 |
-------------------------------------
| 6 |   |   |   |   | 1 | 5 | 3 | 4 |
-------------------------------------
| 1 | 5 |   |   | 4 |   | 6 | 7 | 2 |
-------------------------------------
| 3 |   |   | 2 |   |   | 1 | 8 | 9 |
-------------------------------------
```

### Naked Pair
A Naked Pair (also known as a Conjugate Pair) is a set of two candidate numbers (pencil marks) sited in two cells that belong to at least one unit in common. That is, they reside in the same row, column or box. When two such cells are found, their pencil marks can be safely eleminated from all other cells in the row/column/box.
```
-------------------------------------
|   | 8 |   |   | 9 |   |   | 3 |   |
-------------------------------------
|   | 3 |   |   |   |   |   | 6 | 9 |
-------------------------------------
| 9 |   | 2 |   | 6 | 3 | 1 | 5 | 8 |
-------------------------------------
|   | 2 |   | 8 |   | 4 | 5 | 9 |   |
-------------------------------------
| 8 | 5 | 1 | 9 |   | 7 |   | 4 | 6 |
-------------------------------------
| 3 | 9 | 4 | 6 |   | 5 | 8 | 7 |   |
-------------------------------------
| 5 | 6 | 3 |   | 4 |   | 9 | 8 | 7 |
-------------------------------------
| 2 |   |   |   |   |   |   | 1 | 5 |
-------------------------------------
|   | 1 |   |   | 5 |   |   | 2 |   |
-------------------------------------

Candidates before nakedPair():
[6, 0] = []
[6, 1] = []
[6, 2] = []
[7, 0] = []
[7, 1] = [4, 7]
[7, 2] = [7, 8, 9]
[8, 0] = [4, 7]
[8, 1] = []
[8, 2] = [7, 8, 9]

Naked pair found: true

Candidates after nakedPair():
[6, 0] = []
[6, 1] = []
[6, 2] = []
[7, 0] = []
[7, 1] = [4, 7]
[7, 2] = [8, 9]
[8, 0] = [4, 7]
[8, 1] = []
[8, 2] = [8, 9]
```

### Naked Triple
Any group of three cells in the same row/column/box that contain IN TOTAL three candidates is a Naked Triple. Each cell can have two or three numbers, as long as in combination all three cells have only three numbers. When this happens, the three candidates can be removed from all other cells in the same unit.
```
-------------------------------------
|   | 7 |   | 4 |   | 8 |   | 2 | 9 |
-------------------------------------
|   |   | 2 |   |   |   |   |   | 4 |
-------------------------------------
| 8 | 5 | 4 |   | 2 |   |   |   | 7 |
-------------------------------------
|   |   | 8 | 3 | 7 | 4 | 2 |   |   |
-------------------------------------
|   | 2 |   |   |   |   |   |   |   |
-------------------------------------
|   |   | 3 | 2 | 6 | 1 | 7 |   |   |
-------------------------------------
|   |   |   |   | 9 | 3 | 6 | 1 | 2 |
-------------------------------------
| 2 |   |   |   |   |   | 4 |   | 3 |
-------------------------------------
| 1 | 3 |   | 6 | 4 | 2 |   | 7 |   |
-------------------------------------

Candidates before nakedTriple():
[4, 0] = [4, 5, 6, 7, 9]
[4, 1] = []
[4, 2] = [1, 5, 6, 7, 9]
[4, 3] = [5, 8, 9]
[4, 4] = [5, 8]
[4, 5] = [5, 9]
[4, 6] = [1, 3, 5, 8, 9]
[4, 7] = [3, 4, 5, 6, 8, 9]
[4, 8] = [1, 5, 6, 8]

Naked triple found: true

Candidates after nakedTriple():
[4, 0] = [4, 6, 7]
[4, 1] = []
[4, 2] = [1, 6, 7]
[4, 3] = [5, 8, 9]
[4, 4] = [5, 8]
[4, 5] = [5, 9]
[4, 6] = [1, 3]
[4, 7] = [3, 4, 6]
[4, 8] = [1, 6]
```

### Naked Quad
A Naked Quad is rarer, especially in its full form, but is still useful if it can be spotted. The same logic from Naked Triples applies, but the reason it is so rare is because if a Quad is present, the remaining cells are more likely to be a Triple or Pair and the solver will highlight those first. Following the same logic as naked pairs/triples, a naked quad can be eliminated from all other cells in the row/column/box within which the quad is found.
```
-------------------------------------
|   |   |   |   | 3 |   |   | 8 | 6 |
-------------------------------------
|   |   |   |   | 2 |   |   | 4 |   |
-------------------------------------
|   | 9 |   |   | 7 | 8 | 5 | 2 |   |
-------------------------------------
| 3 | 7 | 1 | 8 | 5 | 6 | 2 | 9 | 4 |
-------------------------------------
| 9 |   |   | 1 | 4 | 2 | 3 | 7 | 5 |
-------------------------------------
| 4 |   |   | 3 | 9 | 7 | 6 | 1 | 8 |
-------------------------------------
| 2 |   |   | 7 |   | 3 | 8 | 5 | 9 |
-------------------------------------
|   | 3 | 9 | 2 |   | 5 | 4 | 6 | 7 |
-------------------------------------
| 7 |   |   | 9 |   | 4 | 1 | 3 | 2 |
-------------------------------------

Candidates before nakedQuad():
[0, 0] = [1, 5]
[0, 1] = [1, 2, 4, 5]
[0, 2] = [2, 4, 5, 7]
[1, 0] = [1, 5, 6, 8]
[1, 1] = [1, 5, 6, 8]
[1, 2] = [3, 5, 6, 7, 8]
[2, 0] = [1, 6]
[2, 1] = []
[2, 2] = [3, 4, 6]

Naked Quad Found: true

Candidates after nakedQuad():
[0, 0] = [1, 5]
[0, 1] = [2, 4]
[0, 2] = [2, 4, 7]
[1, 0] = [1, 5, 6, 8]
[1, 1] = [1, 5, 6, 8]
[1, 2] = [3, 7]
[2, 0] = [1, 6]
[2, 1] = []
[2, 2] = [3, 4]

```

### X-Wing
The "X-Wing" technique is used when two rows/columns each have exactly two cells that, when lines are drawn from each of the
opposing cells, form an "X" and contain the same valid candidate. In such a case, said valid candidate is eliminated from all cells in orthogonal rows/columns of those cells.
```
-------------------------------------
|   |   | 3 | 8 |   |   | 5 | 1 |   |
-------------------------------------
|   |   | 8 | 7 |   |   | 9 | 3 |   |
-------------------------------------
| 1 |   |   | 3 |   | 5 | 7 | 2 | 8 |
-------------------------------------
|   |   |   | 2 |   |   | 8 | 4 | 9 |
-------------------------------------
| 8 |   | 1 | 9 |   | 6 | 2 | 5 | 7 |
-------------------------------------
|   |   |   | 5 |   |   | 1 | 6 | 3 |
-------------------------------------
| 9 | 6 | 4 | 1 | 2 | 7 | 3 | 8 | 5 |
-------------------------------------
| 3 | 8 | 2 | 6 | 5 | 9 | 4 | 7 | 1 |
-------------------------------------
|   | 1 |   | 4 |   |   | 6 | 9 | 2 |
-------------------------------------


Pencil marks for row 2:
[2, 0] = []
[2, 1] = [4, 9]
[2, 2] = [6, 9]
[2, 3] = []
[2, 4] = [4, 6, 9]
[2, 5] = []
[2, 6] = []
[2, 7] = []
[2, 8] = []

Pencil marks for row 4:
[4, 0] = []
[4, 1] = [3, 4]
[4, 2] = []
[4, 3] = []
[4, 4] = [3, 4]
[4, 5] = []
[4, 6] = []
[4, 7] = []
[4, 8] = []

Pencil marks for column 1:
[0, 1] = [2, 4, 7, 9]
[1, 1] = [2, 4, 5]
[2, 1] = [4, 9]
[3, 1] = [3, 5, 7]
[4, 1] = [3, 4]
[5, 1] = [2, 4, 7, 9]
[6, 1] = []
[7, 1] = []
[8, 1] = []

Pencil marks for column 4:
[0, 4] = [4, 6, 9]
[1, 4] = [1, 4, 6]
[2, 4] = [4, 6, 9]
[3, 4] = [1, 3, 7]
[4, 4] = [3, 4]
[5, 4] = [4, 7, 8]
[6, 4] = []
[7, 4] = []
[8, 4] = [3, 8]

Row 2 has 2 4's
        Row 4 has 2 4's
                Match 1 at column 1
                        Match 2 at column 4
                                Erasing 4 from row 2, row 4, col 1, and col 4
                Match 1 at column 4
        Row 5 has 2 4's

Row 2 has 2 6's
        Row 3 has 2 6's
                Match 1 at column 2

After row test:

Pencil marks for row 2:
[2, 0] = []
[2, 1] = [4, 9]
[2, 2] = [6, 9]
[2, 3] = []
[2, 4] = [4, 6, 9]
[2, 5] = []
[2, 6] = []
[2, 7] = []
[2, 8] = []

Pencil marks for row 4:
[4, 0] = []
[4, 1] = [3, 4]
[4, 2] = []
[4, 3] = []
[4, 4] = [3, 4]
[4, 5] = []
[4, 6] = []
[4, 7] = []
[4, 8] = []

Pencil marks for column 1:
[0, 1] = [2, 7, 9]
[1, 1] = [2, 5]
[2, 1] = [4, 9]
[3, 1] = [3, 5, 7]
[4, 1] = [3, 4]
[5, 1] = [2, 7, 9]
[6, 1] = []
[7, 1] = []
[8, 1] = []

Pencil marks for column 4:
[0, 4] = [6, 9]
[1, 4] = [1, 6]
[2, 4] = [4, 6, 9]
[3, 4] = [1, 3, 7]
[4, 4] = [3, 4]
[5, 4] = [7, 8]
[6, 4] = []
[7, 4] = []
[8, 4] = [3, 8]
```

## Terminology

### Band
A horizontal group of 3 boxes; There are 3 bands in a traditional 9x9 Sudoku

```
           |           |         
                                   
     1     |     2     |     3  
                                   
           |           |        
-----------------------------------
           |           |        
                                   
           |           |        
 
           |           |        
-----------------------------------
           |           |        
 
           |           |        
 
           |           |        
```

### Box
A 3x3 Cell region; There are 9 boxes in a traditional 9x9 Sudoku, placed in a 3x3 arrangement; Can be thought of as a smaller grid, with 3 columns, 3 rows, and a total of 9 cells

```
           |           |         
                                   
     1     |     2     |     3  
                                   
           |           |        
-----------------------------------
           |           |        
                                   
     4     |     5     |     6  
 
           |           |        
-----------------------------------
           |           |        
 
     7     |     8     |     9  
 
           |           |        
```

### Cell
Refers to any individual input square/spot within a row, column, or box; Holds exactly one number; There are 81 cells in a traditional 9x9 Sudoku

### Column
A vertical group of 9 cells; There are 9 columns in a traditional 9x9 Sudoku

```
 1 |   |   |   |   |   |   |   | 
-----------------------------------
 2 |   |   |   |   |   |   |   |
-----------------------------------
 3 |   |   |   |   |   |   |   |
-----------------------------------
 4 |   |   |   |   |   |   |   |
-----------------------------------
 5 |   |   |   |   |   |   |   |
-----------------------------------
 6 |   |   |   |   |   |   |   |
-----------------------------------
 7 |   |   |   |   |   |   |   |
-----------------------------------
 8 |   |   |   |   |   |   |   |
-----------------------------------
 9 |   |   |   |   |   |   |   |
```

### Grid
The 9x9 cell structure that makes up a traditional 9x9 Sudoku; The grid contains all 81 cells in a 9x9 configuration, along with 9 rows, 9 columns, 9 boxes, 3 bands, and 3 stacks

### Row
A horizontal group of 9 cells; There are 9 rows in a traditional 9x9 Sudoku

```
 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
-----------------------------------
   |   |   |   |   |   |   |   |
-----------------------------------
   |   |   |   |   |   |   |   |
-----------------------------------
   |   |   |   |   |   |   |   |
-----------------------------------
   |   |   |   |   |   |   |   |
-----------------------------------
   |   |   |   |   |   |   |   |
-----------------------------------
   |   |   |   |   |   |   |   |
-----------------------------------
   |   |   |   |   |   |   |   |
-----------------------------------
   |   |   |   |   |   |   |   |
```

### Stack
A vertical group of 3 boxes; There are 3 stacks in a traditional 9x9 Sudoku

```
           |           |         
                                   
     1     |           |       
                                   
           |           |        
-----------------------------------
           |           |        
                                   
     2     |           |        
 
           |           |        
-----------------------------------
           |           |        
 
     3     |           |        
 
           |           |        
```


### Sudoku
A puzzle in which a grid consisting of several cells is to be filled with numbers so that every row, column, and 3x3 box contains only one instance of each number. The most common format is a grid of nine rows and columns that are divided into nine smaller boxes of three rows and three columns into which the numbers 1 through 9 must be placed.

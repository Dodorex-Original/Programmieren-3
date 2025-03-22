class Creeper{
    constructor() {
     this.stepCount = frameCount + 1;
     this.color = "rgb(80,255,1)";
     this.energy = 10;
   }
 
   eat() {
     let grassEaterFields = findNeighbourPositions(this.row, this.col,1,GrassEater);
 
     if (grassEaterFields.length > 0) {
       let randomGrassEaterField = random(grassEaterFields);
       updateCreaturePosition(this, randomGrassEaterField);
       this.energy -= 10;
     }
           let meateaterFields = findNeighbourPositions(this.row, this.col, 1, MeatEater);
       if (meateaterFields.length > 0) {
         let randommeateaterField = random(meateaterFields);
         updateCreaturePosition(this, randommeateaterField);
         this.energy -= 10;
       }
 
     let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
     if (grassFields.length > 0) {
       let randomGrassField = random(grassFields);
       updateCreaturePosition(this, randomGrassField);
     } else {
       let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
       if (emptyFields.length > 0) {
         let randomEmptyField = random(emptyFields);
         updateCreaturePosition(this, randomEmptyField);
       }
     }
   }
 
   explode() {
     let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
     let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
     
     let spawnFields = freeFields.concat(grassFields)
     
     if (spawnFields.length > 0) {
       let randomFreeField = random(spawnFields);
       let row = randomFreeField[0];
       let col = randomFreeField[1];
       matrix[row][col] = new Fire();
       matrix[this.row][this.col] = new Empty();
     }
   }
 
   step() {
     this.eat();
       if (this.energy <= 0) {
       this.explode()
     }
   }
 }
 
 
 
 
 
 
 
 
 
 
 class Fire {
   constructor() {
     this.stepCount = frameCount + 1;
     this.color = "orange";
     this.energy = 20;
   }
 
   eat() {
     let grassEaterFields = findNeighbourPositions(this.row,this.col, 1,GrassEater);
     if (grassEaterFields.length > 0) {
       let randomGrassEaterField = random(grassEaterFields);
       updateCreaturePosition(this, randomGrassEaterField);
       this.energy += 2;
     }
 
     let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
     if (grassFields.length > 0) {
       let randomGrassField = random(grassFields);
       updateCreaturePosition(this, randomGrassField);
       this.energy += 2;
     }  else {
           let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
       if (emptyFields.length > 0) {
         let randomEmptyField = random(emptyFields);
         updateCreaturePosition(this, randomEmptyField);
         this.energy -= 5;
       }
     }
       let meateaterFields = findNeighbourPositions(this.row, this.col, 1, MeatEater);
       if (meateaterFields.length > 0) {
         let randommeateaterField = random(meateaterFields);
         updateCreaturePosition(this, randommeateaterField);
         this.energy += 2;
       }
     let fireFields = findNeighbourPositions(this.row, this.col, 1, Fire);
       if (fireFields.length > 0) {
         let randomfireField = random(fireFields);
         updateCreaturePosition(this, randomfireField);
         this.energy += 2;
       }
 
   }
 
   multiply() {
     let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
     if (freeFields.length > 0) {
       let randomFreeField = random(freeFields);
       let row = randomFreeField[0];
       let col = randomFreeField[1];
       matrix[row][col] = new Fire();
     }
   }
 
   step() {
     this.eat();
     if (this.energy >= 10) {
       this.multiply();
       this.energy = 10;
     } else if (this.energy <= 0) {
       matrix[this.row][this.col] = new Empty();
     }
   }
 }
 
 
 
 
 
 
 
 class Empty {}
 
 // Grass starts with a random energy between 0 and 2.
 // It gains 1 energy every frame.
 // When it reaches 7 energy, it creates a new grass object
 // in an empty neighbour cell and resets its energy to 0.
 class Grass {
   constructor() {
     this.stepCount = frameCount + 1;
     this.color = "green";
 
     // set initial energy to a random value between 0 and 2
     // to make grass grow look more natural
     this.energy = int(random(0, 3));
   }
 
   step() {
     // every step, grass gains 1 energy
     this.energy++;
 
     // if grass has 7 energy, multiply and reset energy
     if (this.energy >= 7) {
       this.multiply();
       this.energy = 0;
     }
   }
 
   multiply() {
     // look for empty neighbour cells
     let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
 
     // if there is at least one empty cell,
     // choose a random one and create a new grass object
     if (emptyFields.length > 0) {
       let randomEmptyField = random(emptyFields);
       let row = randomEmptyField[0];
       let col = randomEmptyField[1];
       matrix[row][col] = new Grass();
     }
   }
 }
 
 
 
 
 
 
 
 
 
 // GrassEater looks for grass in its neighbour cells.
 // If it finds grass, it moves to that cell, eats the grass and gains 1 energy.
 // If it doesn't find grass, it moves to a random empty neighbour cell and loses 1 energy.
 // If it has 10 energy, it creates a new grass eater object in an empty neighbour cell
 // and loses 5 energy.
 // If it has 0 energy, it dies and becomes an empty cell.
 class GrassEater {
   constructor() {
     this.stepCount = frameCount + 1;
     this.color = "yellow";
     this.energy = 5;
   }
 
   eat() {
     let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
     if (grassFields.length > 0) {
       let randomGrassField = random(grassFields);
       updateCreaturePosition(this, randomGrassField);
       this.energy+=2;
     } else {
       let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
       if (emptyFields.length > 0) {
         let randomEmptyField = random(emptyFields);
         updateCreaturePosition(this, randomEmptyField);
       }
       this.energy--;
     }
   }
 
   multiply() {
     let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
     if (freeFields.length > 0) {
       let randomFreeField = random(freeFields);
       let row = randomFreeField[0];
       let col = randomFreeField[1];
       matrix[row][col] = new GrassEater();
     }
   }
 
   step() {
     this.eat();
     if (this.energy >= 41 && Math.random()<0.02){
           matrix[this.row][this.col] = new MeatEater();
     }else if (this.energy >= 40) {
       this.multiply();
       this.energy = 5;
     } else if (this.energy <= 0) {
       matrix[this.row][this.col] = new Empty();
     }
   }
 }
 
 
 
 
 
 
 
 
 
 
 
 
 // MeatEater looks for grass eater in its neighbour cells.
 // If it finds grass eater, it moves to that cell, eats the grass eater and gains 10 energy.
 // If it doesn't find grass eater, it loses 1 energy.
 // If it has 120 energy, it creates a new meat eater object in an empty neighbour cell
 // and loses 100 energy.
 class MeatEater {
   constructor() {
     this.stepCount = frameCount + 1;
     this.color = "red";
     this.energy = 10;
   }
 
   eat() {
     let grassEaterFields = findNeighbourPositions(this.row, this.col,1,GrassEater);
 
     if (grassEaterFields.length > 0) {
       let randomGrassEaterField = random(grassEaterFields);
       updateCreaturePosition(this, randomGrassEaterField);
       this.energy += 20;
     }
 
     let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
     if (grassFields.length > 0) {
       let randomGrassField = random(grassFields);
       updateCreaturePosition(this, randomGrassField);
       this.energy -= 0.5;
     } else {
       let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);
       if (emptyFields.length > 0) {
         let randomEmptyField = random(emptyFields);
         updateCreaturePosition(this, randomEmptyField);
         this.energy -= 0.1;
       }
     }
   }
 
   multiply() {
     let freeFields = findNeighbourPositions(this.row, this.col, 1, Empty);
     if (freeFields.length > 0) {
       let randomFreeField = random(freeFields);
       let row = randomFreeField[0];
       let col = randomFreeField[1];
       matrix[row][col] = new MeatEater();
     }
   }
 
   step() {
     this.eat();
         if(this.energy >= 69) {
       matrix[this.row][this.col] = new Creeper()
     }else if (this.energy >= 50) {
       this.multiply();
       this.energy = 10;
     } 
     if (this.energy <= 0) {
       matrix[this.row][this.col] = new Empty();
     }
     }
   
 }
 
 
 
 
 
 
 
 
 
 
 // list of lists. Contains all creatures.
 let matrix = [];
 // size of the matrix, how many cells in width and height
 let matrixSize = 150;
 // display size in pixels of each cell
 let blockSize = 5;
 
 // What probability each creature has to be created
 let creaturePropabilities = [
   [Grass, 0.5],
   [GrassEater, 0.01],
   [MeatEater, 0.001],
   [Creeper, 0.0001]
 ];
 
 // Choose a random creature based on the probabilities
 function getRandomCreature() {
   let rand = random();
   let sum = 0;
   for (let i = 0; i < creaturePropabilities.length; i++) {
     let creatureCLass = creaturePropabilities[i][0];
     let propability = creaturePropabilities[i][1];
     sum += propability;
     if (rand < sum) {
       return new creatureCLass();
     }
   }
   return new Empty();
 }
 
 // randomly fill the matrix with creatures based on the probabilities
 function fillRandomMatrix() {
   for (let row = 0; row < matrixSize; row++) {
     matrix.push([]);
     for (let col = 0; col < matrixSize; col++) {
       matrix[row][col] = getRandomCreature();
     }
   }
 }
 
 // update the position of a creature in the matrix
 // Creates a new empty object in the old position
 function updateCreaturePosition(creature, newPos) {
   let newRow = newPos[0];
   let newCol = newPos[1];
   matrix[newRow][newCol] = creature;
   matrix[creature.row][creature.col] = new Empty();
   creature.row = newRow;
   creature.col = newCol;
 }
 
 // for a given position, find all neighbour positions contain a certain
 // creature type and are within a certain distance
 // returns a list of [row, col] positions
 // example: findNeighbourPositions(10, 10, 1, Empty) will return all empty cells
 // around position 10, 10 within a distance of 1. If all cells are empty, it will return
 // [[9, 9], [9, 10], [9, 11], [10, 9], [10, 11], [11, 9], [11, 10], [11, 11]]
 function findNeighbourPositions(row, col, distance, creatureType) {
   let positions = [];
   for (let nCol = col - distance; nCol <= col + distance; nCol++) {
     for (let nRow = row - distance; nRow <= row + distance; nRow++) {
       let inMatrix =
         nCol >= 0 && nCol < matrixSize && nRow >= 0 && nRow < matrixSize;
       let isSamePosition = nCol === col && nRow === row;
       if (
         inMatrix &&
         !isSamePosition &&
         matrix[nRow][nCol] instanceof creatureType
       ) {
         positions.push([nRow, nCol]);
       }
     }
   }
   return positions;
 }
 
 // setup the canvas and fill the matrix with creatures
 // Will be called once at the start
 function setup() {
   createCanvas(matrixSize * blockSize, matrixSize * blockSize);
   fillRandomMatrix();
   noStroke();
   frameRate(40);
 }
 
 // game loop. This will be called every frame
 // It will draw the matrix and update the creatures
 function draw() {
   background(200);
   let grassCount = 0
   for (let row = 0; row < matrixSize; row++) {
     for (let col = 0; col < matrixSize; col++) {
       let obj = matrix[row][col];
 
       // skip empty cells
       if (obj instanceof Empty) continue;
       
       if (obj instanceof Grass) grassCount++;
       
 
       // set the row and col of the creature
       obj.row = row;
       obj.col = col;
 
       // this prevents newly created creatures from being updated in the same step
       // and creatures that move from being updated multiple times in one frame
       if (obj.stepCount === frameCount) {
         obj.step();
         obj.stepCount++;
       }
 
       // draw the creature
       fill(obj.color);
       rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);
     }
   }
   
   
   if (grassCount >= matrixSize*matrixSize*0.99){
     let row = random(0, matrixSize)
     row = Math.round(row)
     let col = random(0, matrixSize)
     col = Math.round(col)
     matrix[row][col] = new GrassEater()
     
   }
 }
 
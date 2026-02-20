class GameModel {
  constructor() {
    this.blocks = [];
    this.score = 0;
    this.timeRemaining = 30;
    this.gameRunning = false;
    this.activeMoles = new Set();
    this.activeSnake = null;
    this.initializeBoard();
  }

  initializeBoard() {
    this.blocks = [];
    for(let i = 0; i < 12; i++) {
      this.blocks.push({
        id: i,
        status: 'empty', // 'empty', 'mole', or 'snake'
        isVisible: false
      });
    }
    this.activeMoles = new Set();
    this.activeSnake = null;
  }

  getBlocks() {
    return this.blocks;
  }

  setBlockStatus(blockId, status) {
    if(blockId >= 0 && blockId < this.blocks.length) {
      this.blocks[blockId].status = status;
      this.blocks[blockId].isVisible = status !== 'empty';
    }
  }

  getBlockStatus(blockId) {
    return this.blocks[blockId].status;
  }

  addScore() {
    this.score++;
  }

  getScore() {
    return this.score;
  }

  resetScore() {
    this.score = 0;
  }

  getTimeRemaining() {
    return this.timeRemaining;
  }

  decrementTime() {
    if(this.timeRemaining > 0) {
      this.timeRemaining--;
    }
  }

  startGame() {
    this.gameRunning = true;
    this.resetScore();
    this.timeRemaining = 30;
    this.initializeBoard();
  }

  endGame() {
    this.gameRunning = false;
  }

  isGameRunning() {
    return this.gameRunning;
  }

  addActiveMole(blockId) {
    this.activeMoles.add(blockId);
  }

  removeActiveMole(blockId) {
    this.activeMoles.delete(blockId);
  }

  getActiveMoleCount() {
    return this.activeMoles.size;
  }

  setActiveSnake(blockId) {
    this.activeSnake = blockId;
  }

  getActiveSnake() {
    return this.activeSnake;
  }

  clearActiveSnake() {
    this.activeSnake = null;
  }
}

class GameView {
  constructor() {
    this.gameBoardElement = document.getElementById('game-board');
    this.scoreElement = document.querySelector('.score');
    this.timerValueElement = document.getElementById('timer-value');
    this.startBtnElement = document.getElementById('start-btn');
    this.blockElements = [];
  }

  renderGameBoard(blocks) {
    this.gameBoardElement.innerHTML = '';
    this.blockElements = [];
    
    blocks.forEach((block, index) => {
      const blockDiv = document.createElement('div');
      blockDiv.className = 'game-block';
      blockDiv.id = `block-${block.id}`;
      blockDiv.setAttribute('data-block-id', block.id);
      
      const img = document.createElement('img');
      img.id = `img-${block.id}`;
      img.setAttribute('data-block-id', block.id);
      
      blockDiv.appendChild(img);
      this.gameBoardElement.appendChild(blockDiv);
      this.blockElements.push(blockDiv);
    });
  }

  displayMole(blockId) {
    const img = document.getElementById(`img-${blockId}`);
    if(img) {
      img.src = 'mole.jpeg';
      img.classList.add('visible');
    }
  }

  displaySnake(blockId) {
    const img = document.getElementById(`img-${blockId}`);
    if(img) {
      img.src = 'snake.jpeg';
      img.classList.add('visible');
    }
  }

  hideCharacter(blockId) {
    const img = document.getElementById(`img-${blockId}`);
    if(img) {
      img.classList.remove('visible');
      img.src = '';
    }
  }

  updateScore(score) {
    this.scoreElement.textContent = `Your total score is ${score}`;
  }

  updateTimer(time) {
    this.timerValueElement.textContent = time;
  }

  getStartButton() {
    return this.startBtnElement;
  }

  getGameBlocks() {
    return this.blockElements;
  }

  showGameOver() {
    alert('Time is up!');
  }

  showGameOverSnake() {
    alert('You clicked the snake! Game over!');
  }
}

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.moleInterval = null;
    this.snakeInterval = null;
    this.timerInterval = null;
    this.moleTimeouts = {}; // Track timeouts for moles
    this.snakeTimeout = null; // Track timeout for snake
    
    this.init();
  }

  init() {
    this.view.renderGameBoard(this.model.getBlocks());
    this.view.getStartButton().addEventListener('click', () => this.startGame());
    this.attachBlockClickListeners();
  }

  startGame() {
    if(this.model.isGameRunning()) return;
    
    this.model.startGame();
    this.view.updateScore(this.model.getScore());
    this.view.updateTimer(this.model.getTimeRemaining());
    this.view.renderGameBoard(this.model.getBlocks());
    this.attachBlockClickListeners();
    
    // Start spawning moles
    this.startSpawningMoles();
    
    // Start spawning snake
    this.startSpawningSnake();
    
    // Start timer countdown
    this.startTimer();
  }

  startSpawningMoles() {
    this.moleInterval = setInterval(() => {
      if(!this.model.isGameRunning()) return;
      this.spawnMole();
    }, 1000);
  }

  spawnMole() {
    if(!this.model.isGameRunning()) return;
    
    if(this.model.getActiveMoleCount() < 3) {
      // Get all empty blocks
      const emptyBlocks = [];
      for(let i = 0; i < 12; i++) {
        if(this.model.getBlockStatus(i) === 'empty') {
          emptyBlocks.push(i);
        }
      }
      
      // If there are empty blocks, pick a random one
      if(emptyBlocks.length > 0) {
        const randomBlockId = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];
        
        this.model.setBlockStatus(randomBlockId, 'mole');
        this.model.addActiveMole(randomBlockId);
        this.view.displayMole(randomBlockId);
        
        // Auto-hide mole after 2 seconds if not clicked
        if(this.moleTimeouts[randomBlockId]) {
          clearTimeout(this.moleTimeouts[randomBlockId]);
        }
        
        this.moleTimeouts[randomBlockId] = setTimeout(() => {
          if(this.model.getBlockStatus(randomBlockId) === 'mole') {
            this.model.setBlockStatus(randomBlockId, 'empty');
            this.model.removeActiveMole(randomBlockId);
            this.view.hideCharacter(randomBlockId);
            delete this.moleTimeouts[randomBlockId];
            // Immediately spawn a new mole if there are fewer than 3
            this.spawnMole();
          }
        }, 2000);
      }
    }
  }

  startSpawningSnake() {
    this.snakeInterval = setInterval(() => {
      if(!this.model.isGameRunning()) return;
      
      // Hide previous snake
      const prevSnakeId = this.model.getActiveSnake();
      if(prevSnakeId !== null) {
        this.model.setBlockStatus(prevSnakeId, 'empty');
        this.view.hideCharacter(prevSnakeId);
        this.model.clearActiveSnake();
      }
      
      // Spawn new snake
      const randomBlockId = Math.floor(Math.random() * 12);
      
      // If there's a mole in this block, remove it first
      if(this.model.getBlockStatus(randomBlockId) === 'mole') {
        if(this.moleTimeouts[randomBlockId]) {
          clearTimeout(this.moleTimeouts[randomBlockId]);
          delete this.moleTimeouts[randomBlockId];
        }
        this.model.removeActiveMole(randomBlockId);
        this.view.hideCharacter(randomBlockId);
      }
      
      this.model.setBlockStatus(randomBlockId, 'snake');
      this.model.setActiveSnake(randomBlockId);
      this.view.displaySnake(randomBlockId);
      
      // Auto-hide snake after 2 seconds
      if(this.snakeTimeout) {
        clearTimeout(this.snakeTimeout);
      }
      
      this.snakeTimeout = setTimeout(() => {
        if(this.model.getActiveSnake() === randomBlockId) {
          this.model.setBlockStatus(randomBlockId, 'empty');
          this.view.hideCharacter(randomBlockId);
          this.model.clearActiveSnake();
          // Spawn a new mole when snake despawns
          this.spawnMole();
        }
      }, 2000);
    }, 2000);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.model.decrementTime();
      this.view.updateTimer(this.model.getTimeRemaining());
      
      if(this.model.getTimeRemaining() <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  attachBlockClickListeners() {
    this.view.getGameBlocks().forEach(block => {
      block.addEventListener('click', (e) => {
        const blockId = parseInt(block.getAttribute('data-block-id'));
        this.handleBlockClick(blockId);
      });
    });
  }

  handleBlockClick(blockId) {
    if(!this.model.isGameRunning()) return;
    
    const status = this.model.getBlockStatus(blockId);
    
    if(status === 'mole') {
      this.model.addScore();
      this.view.updateScore(this.model.getScore());
      this.model.setBlockStatus(blockId, 'empty');
      this.model.removeActiveMole(blockId);
      this.view.hideCharacter(blockId);
      
      // Clear the timeout for this mole
      if(this.moleTimeouts[blockId]) {
        clearTimeout(this.moleTimeouts[blockId]);
        delete this.moleTimeouts[blockId];
      }
      
      // Immediately spawn a new mole
      this.spawnMole();
    } else if(status === 'snake') {
      // Game over when snake is clicked
      this.endGameSnake();
    }
  }

  endGame() {
    this.model.endGame();
    this.clearAllIntervals();
    this.view.showGameOver();
  }

  endGameSnake() {
    this.model.endGame();
    this.clearAllIntervals();
    this.displayAllSnakes();
    this.view.showGameOverSnake();
  }

  displayAllSnakes() {
    for(let i = 0; i < 12; i++) {
      this.view.displaySnake(i);
    }
  }

  clearAllIntervals() {
    if(this.moleInterval) clearInterval(this.moleInterval);
    if(this.snakeInterval) clearInterval(this.snakeInterval);
    if(this.timerInterval) clearInterval(this.timerInterval);
    
    // Clear all mole timeouts
    Object.values(this.moleTimeouts).forEach(timeout => clearTimeout(timeout));
    this.moleTimeouts = {};
    
    // Clear snake timeout
    if(this.snakeTimeout) clearTimeout(this.snakeTimeout);
    this.snakeTimeout = null;
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const model = new GameModel();
  const view = new GameView();
  const controller = new GameController(model, view);
});
// Array representando o tabuleiro
var board = ['', '', '', '', '', '', '', '', ''];

// Array com todas as possíveis combinações vencedoras
var winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas horizontais
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // linhas verticais
  [0, 4, 8], [2, 4, 6] // linhas diagonais
];

// Variável para acompanhar se é a vez do usuário ou do computador
var isUserTurn;
var currentPlayer;

// Variáveis para controle de vitória, derrota ou empate
var gameOver = false;
var winner = null;

// Botões
var startButton = document.getElementById('startButton');
var restartButton = document.getElementById('restartButton');

// Event listeners dos botões
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Inicia o jogo
function startGame() {
  startButton.disabled = true;
  restartButton.disabled = false;
  isUserTurn = Math.random() < 0.5;
  currentPlayer = isUserTurn ? 'X' : 'O';
  gameOver = false;
  winner = null;
  board = ['', '', '', '', '', '', '', '', ''];
  render();
  
  if (!isUserTurn) {
    makeComputerMove();
  }
}

// Reinicia o jogo
function restartGame() {
  startButton.disabled = false;
  restartButton.disabled = true;
  isUserTurn = false;
  currentPlayer = '';
  gameOver = false;
  winner = null;
  board = ['', '', '', '', '', '', '', '', ''];
  render();
}

// Função chamada quando uma jogada é feita
function makeMove(index) {
  if (!gameOver && board[index] === '') {
    board[index] = currentPlayer;
    
    // Atualiza a exibição na tela
    render();
    
    // Verifica se houve vitória
    checkWin();
    
    // Troca a vez do jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isUserTurn = !isUserTurn;
    
    // Se não for a vez do usuário, chama a função do computador para jogar
    if (!isUserTurn && !gameOver) {
      makeComputerMove();
    }
  }
}

// Função que verifica se houve vitória
function checkWin() {
  for (var i = 0; i < winningCombos.length; i++) {
    var [a, b, c] = winningCombos[i];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      gameOver = true;
      break;
    }
  }

  // Verifica empate
  if (!board.includes('') && !gameOver) {
    winner = 'Empate';
    gameOver = true;
  }

    // Exibe a mensagem de acordo com o resultado
    var messageElement = document.getElementById('message');
    if (gameOver) {
      if (winner === 'Empate') {
        messageElement.textContent = 'O jogo empatou. Tente novamente!';
      } else if (winner === 'X') {
        messageElement.textContent = 'Parabéns! Você ganhou!';
      } else if (winner === 'O') {
        messageElement.textContent = 'Você perdeu. O computador venceu!';
      }
    } else {
      messageElement.textContent = '';
    }
}

// Função para o computador fazer uma jogada
function makeComputerMove() {
  var availableMoves = [];
  for (var i = 0; i < board.length; i++) {
    if (board[i] === '') {
      availableMoves.push(i);
    }
  }

  // Seleciona uma posição aleatória disponível para jogar
  var randomIndex = Math.floor(Math.random() * availableMoves.length);
  var computerMove = availableMoves[randomIndex];
  board[computerMove] = 'O';

  // Atualiza a exibição na tela
  render();

  // Verifica se houve vitória
  checkWin();

  // Troca a vez para o usuário
  currentPlayer = 'X';
  isUserTurn = true;
}

// Função para renderizar a exibição na tela
function render() {
  var boardContainer = document.querySelector('.board');
  boardContainer.innerHTML = '';

  for (var i = 0; i < board.length; i++) {
    var cell = document.createElement('div');
    cell.textContent = board[i];
    cell.classList.add('cell');
    cell.addEventListener('click', makeMove.bind(null, i));
    boardContainer.appendChild(cell);
  }

  // Desabilita as células após o fim do jogo
  if (gameOver) {
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function(cell) {
      cell.removeEventListener('click', makeMove);
    });
  }
}

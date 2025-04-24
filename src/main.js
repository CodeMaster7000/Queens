const board = document.getElementById('board')
const message = document.getElementById('message')
const resetButton = document.getElementById('reset')
function createBoard() {
  board.innerHTML = ''
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div')
      square.classList.add('square')      
      if ((row + col) % 2 === 0) {
        square.classList.add('light')
      } else {
        square.classList.add('dark')
      }
      square.dataset.row = row
      square.dataset.col = col
      square.addEventListener('click', toggleQueen)
      board.appendChild(square)
    }
  }
}
function toggleQueen(e) {
  const square = e.currentTarget
  
  if (square.textContent === '♕') {
    square.textContent = ''
  } else {
    square.textContent = '♕'
  }
  checkBoard()
}
function checkBoard() {
  const squares = document.querySelectorAll('.square')
  const queens = []

  squares.forEach(square => {
    if (square.textContent === '♕') {
      queens.push({
        row: parseInt(square.dataset.row),
        col: parseInt(square.dataset.col)
      })
    }
  })
  let conflict = false
  
  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      if (
        queens[i].row === queens[j].row ||
        queens[i].col === queens[j].col ||
        Math.abs(queens[i].row - queens[j].row) === Math.abs(queens[i].col - queens[j].col)
      ) {
        conflict = true
        break
      }
    }
    if (conflict) break
  }
  if (conflict) {
    message.textContent = 'ERROR: Queens attack each other'
    message.style.color = '#e74c3c'
  } else {
    if (queens.length === 8) {
      message.textContent = 'Puzzle solved!'
      message.style.color = '#27ae60'
    } else {
      message.textContent = 'Place queens'
      message.style.color = '#333'
    }
  }
}
function resetBoard() {
  const squares = document.querySelectorAll('.square')
  squares.forEach(square => square.textContent = '')
  message.textContent = 'Place queens'
  message.style.color = '#333'
}
createBoard()
resetButton.addEventListener('click', resetBoard)

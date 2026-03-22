const POMODORO_MINUTES = 25

// --- СОСТОЯНИЕ ТАЙМЕРА ---
let totalSeconds = POMODORO_MINUTES * 60 // общее кол-во секунд
let timerInterval = null // ID интервала для паузы
let isRunning = false // запущен ли таймер сейчас

const timerDisplay = document.getElementById('timer-display')
const btnStart = document.getElementById('btn-start')
const btnPause = document.getElementById('btn-pause')
const btnReset = document.getElementById('btn-reset')

// --- ОБНОВЛЕНИЕ ДИСПЛЕЯ ---
function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  timerDisplay.classList.toggle('danger', totalSeconds <= 10 && totalSeconds > 0)

  const totalDuration = POMODORO_MINUTES * 60
  const percent = (totalSeconds / totalDuration) * 100
  document.getElementById('progress-bar').style.width = percent + '%'
}

// --- СТАРТ ---
function startTimer() {
  if (isRunning) return
  isRunning = true

  timerInterval = setInterval(function () {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval)
      isRunning = false
      timerDisplay.textContent = '00:00'

      // Можно попробовать Web Notifications API

      alert('Помодоро завершён! Время для перерыва.')
      return
    }

    totalSeconds--
    updateDisplay()
  }, 1000)
}

// --- ПАУЗА ---
function pauseTimer() {
  clearInterval(timerInterval)
  isRunning = false
}

// --- СБРОС ---
function resetTimer() {
  clearInterval(timerInterval)
  isRunning = false
  totalSeconds = POMODORO_MINUTES * 60
  updateDisplay()
}

// --- ОБРАБОТЧИКИ КНОПОК ---
btnStart.addEventListener('click', startTimer)
btnPause.addEventListener('click', pauseTimer)
btnReset.addEventListener('click', resetTimer)

updateDisplay()

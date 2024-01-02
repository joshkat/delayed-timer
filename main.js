import "./style.css";

const inputForm = document.getElementById("input");
const resetButton = document.getElementById("reset-btn");
const errorModal = document.getElementById("error-modal");
const delayCountdown = document.getElementById("delay-countdown");
const fullCountdown = document.getElementById("full-countdown");

inputForm.addEventListener("submit", (e) => {
  const min = e.target[0].value;
  const sec = e.target[1].value;
  const delay = e.target[2].value;

  if (!inputCheck(min, sec, delay)) {
    errorModal.showModal();
    return;
  }

  if(delay == 0){
    inputForm.classList.add("hidden");
    showFullTimer(min, sec);
    return;
  } else {
    showDelayTimer(min, sec, delay);
  }
});

function inputCheck(min, sec, delay) {
  if (
    min > 59 ||
    sec > 59 ||
    delay > 99 ||
    min === "" ||
    sec === "" ||
    delay === ""
  ) {
    return false;
  }
  return true;
}

function showDelayTimer(min, sec, delay) {
  inputForm.classList.add("hidden");
  delayCountdown.classList.remove("hidden");

  const intervalId = setInterval(() => {
    const shouldContinue = updateDelayCountdown(delay);
    delay--;
    if (!shouldContinue) {
      clearInterval(intervalId);
      showFullTimer(min, sec);
    }
  }, 1000);
}

function showFullTimer(min, sec) {
  delayCountdown.classList.add("hidden");
  fullCountdown.classList.remove("hidden");

  const intervalId = setInterval(() => {
    const response = updateFullCountdown(min, sec);
    min = response.min;
    sec = response.sec;

    if (!response.shouldContinue) {
      playSound(2);
      clearInterval(intervalId);
    }
  }, 1000);
}

function updateDelayCountdown(sec) {
  const delaySpan = document.querySelector("#delay-countdown span span");
  // Get the current values
  let seconds = sec;

  // Update the values in the DOM
  delaySpan.style.setProperty("--value", seconds);
  seconds--;

  if (sec < 0) {
    return false;
  }

  // Continue the countdown
  return true;
}

function updateFullCountdown(min, sec) {
  // Select the span elements
  const minutesSpan = document.querySelector("#full-min");
  const secondsSpan = document.querySelector("#full-sec");

  // Get the current values
  let minutes = min;
  let seconds = sec;

  // Update the values in the DOM
  minutesSpan.style.setProperty("--value", minutes);
  secondsSpan.style.setProperty("--value", seconds);

  // Decrease the seconds
  seconds--;

  // Check if we need to decrease minutes
  if (seconds < 0) {
    seconds = 59;
    minutes--;

    if (minutes < 0) {
      return { min: 0, sec: 0, shouldContinue: false };
    }
  }
  return { min: minutes, sec: seconds, shouldContinue: true };
}

function playSound(times) {
  let count = 0;
  const audio = document.getElementById("timer-finished");

  // Function to play sound and increment count
  function play() {
    if (count < times) {
      audio.currentTime = 0; // Reset the audio to start
      audio.play();
      count++;
    }
  }

  // Event listener for when the audio ends
  audio.addEventListener("ended", () => {
    play();
  });

  // Start the first playback
  play();
}

resetButton.addEventListener("click", () => {
  location.reload();
});

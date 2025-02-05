const form = document.getElementById("form");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
const submit = document.getElementById("start");
const reset = document.getElementById("reset");
let countdown;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let hoursValue = parseInt(hours.value);
  let minutesValue = parseInt(minutes.value);
  let secondsValue = parseInt(seconds.value);

  if (
    submit.textContent === "Start" &&
    (hoursValue || minutesValue || secondsValue)
  ) {
    submit.textContent = "Stop";
    submit.id = "stop";

    inputDisabled(true);

    const updateInputs = () => {
      hours.value = String(hoursValue);
      minutes.value = String(minutesValue);
      seconds.value = String(secondsValue);
    };

    countdown = setInterval(() => {
      if (hoursValue === 0 && minutesValue === 0 && secondsValue === 0) {
        clearInterval(countdown);
        submit.textContent = "Start";
        submit.id = "start";
        return;
      }

      if (secondsValue === 0) {
        if (minutesValue === 0) {
          hoursValue--;
          minutesValue = 59;
        } else {
          minutesValue--;
        }
        secondsValue = 59;
      } else {
        secondsValue--;
      }

      updateInputs();
    }, 1000);
  } else {
    clearInterval(countdown);
    submit.textContent = "Start";
    submit.id = "start";
    inputDisabled(false);
  }
});

reset.addEventListener("click", () => {
  clearInterval(countdown);
  hours.value = "0";
  minutes.value = "0";
  seconds.value = "0";
  if (submit.textContent !== "Start") {
    submit.textContent = "Start";
    submit.id = "start";
  }
  inputDisabled(false);
});

function inputDisabled(boolean) {
  hours.disabled = boolean;
  minutes.disabled = boolean;
  seconds.disabled = boolean;
}

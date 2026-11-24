const weddingTime = Date.parse("2026-12-23T16:00:00Z");
const numberFormatter = new Intl.NumberFormat("ar");
const countdown = document.getElementById("countdown");
const countdownMessage = document.getElementById("countdown-message");
const countdownFields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function updateCountdown() {
  const remaining = Math.max(0, weddingTime - Date.now());
  if (remaining === 0) {
    countdown.hidden = true;
    countdownMessage.textContent = "حلّ موعد فرحتنا، أهلاً بكم!";
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
  };
  for (const [field, value] of Object.entries(values)) {
    countdownFields[field].textContent = numberFormatter.format(value);
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

const music = document.getElementById("music");
const musicButton = document.getElementById("music-button");
const musicLabel = document.getElementById("music-label");
const musicStatus = document.getElementById("music-status");

music.addEventListener("play", () => {
  musicButton.setAttribute("aria-pressed", "true");
  musicLabel.textContent = "إيقاف الموسيقى";
  musicStatus.textContent = "";
});

music.addEventListener("pause", () => {
  musicButton.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "تشغيل الموسيقى";
});

music.addEventListener("error", () => {
  musicStatus.textContent = "تعذّر تحميل الموسيقى على هذا الجهاز.";
});

async function playMusic() {
  try {
    await music.play();
  } catch (error) {
    if (error.name === "NotAllowedError") {
      musicStatus.textContent = "اضغطوا تشغيل للاستماع إلى الموسيقى.";
    } else {
      console.error("Could not play invitation music:", error);
      musicStatus.textContent = "تعذّر تشغيل الموسيقى على هذا الجهاز.";
    }
  }
}

musicButton.addEventListener("click", () => {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
  }
});

playMusic();

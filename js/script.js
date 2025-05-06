function setupDownloadButtons() {
    const wallpapers = document.querySelectorAll('.wallpaper');
  
    wallpapers.forEach(img => {
      const downloadBtn = document.createElement('a');
      downloadBtn.href = img.src;
      downloadBtn.setAttribute('download', '');
      downloadBtn.className = 'download-button';
  
      downloadBtn.innerHTML = `
        <svg width="27" height="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" fill="currentColor"/>
        </svg>`;
  
      img.insertAdjacentElement('afterend', downloadBtn);
    });
}
  
  document.addEventListener("DOMContentLoaded", () => {
    setupDownloadButtons();
});


//SAMPLE TRACKS CODE
const musicFolder = 'music/';
const songFiles = [
    "Dragonborn.mp3",
    "Secunda.mp3",
    "Imperial Throne.mp3",
    "One They Fear.mp3"
];

const audioPlayers = {};

function formatTime(seconds) {
    const mins = Math.floor((seconds / 60));
    const secs = Math.floor((seconds % 60));
    return `${mins}: ${secs < 10 ? '0' : ''}${secs}`;
}

function createPlayer(file, index) {
    const trackCard = document.createElement("div");
    trackCard.className = "track-card";

    const title = document.createElement("h3");
    title.textContent = file.replace(".mp3", "");
    title.className = "track-title";

    const controls = document.createElement("div");
    controls.className = "controls";

    const playBtn = document.createElement("button");
    playBtn.innerHTML = "▶";
    playBtn.title = "Play/Pause";

    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-container";

    const progress = document.createElement("input");
    progress.type = "range";
    progress.className = "progress";
    progress.value = 0;
    progress.min = 0;
    progress.max = 100;
    progress.step = 0.1;

    const timeDisplay = document.createElement("span");
    timeDisplay.className = "time-display";
    timeDisplay.textContent = "0:00 / 0:00";

    const audio = new Audio(musicFolder + file);
    audioPlayers[file] = {
        element: audio,
        isPlaying: false,
        progress: progress,
        playBtn: playBtn
    };
    //EVENT LISTENERS
    playBtn.addEventListener("click", () => togglePlay(file));

    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    audio.addEventListener("timeupdate", () => {
        if(!isNaN(audio.duration)) {
            progress.value = (audio.currentTime / audio.duration) * 100;
            timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        }
    });

    audio.addEventListener("ended", () => {
        playBtn.innerHTML = "▶";
        audioPlayers[file].isPlaying = false;
        progress.value = 0;
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });

    audio.addEventListener("loadedmetadata", () => {
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });

    //DOM BUILDING
    progressContainer.appendChild(progress);
    controls.appendChild(playBtn);
    controls.appendChild(progressContainer);
    controls.appendChild(timeDisplay);

    trackCard.appendChild(title);
    trackCard.appendChild(controls);

    return trackCard;
}

function togglePlay(filename) {
    const player = audioPlayers[filename];

    Object.keys(audioPlayers).forEach(file => {
        if (file != filename && audioPlayers[file].isPlaying) {
            audioPlayers[file].element.pause();
            audioPlayers[file].playBtn.innerHTML = "▶";
            audioPlayers[file].isPlaying = false;
        }
    });

    if(player.isPlaying) {
        player.element.pause();
        player.playBtn.innerHTML = "▶";
    } else {
        player.element.play();
        player.playBtn.innerHTML = "⏸";
    }
    player.isPlaying = !player.isPlaying;
}

document.addEventListener("DOMContentLoaded", () => {
    const audioList = document.getElementById("audio-list");

    songFiles.forEach((file, index) => {
        const player = createPlayer(file, index);
        audioList.appendChild(player);
    });
});


//END OF SAMPLE TRACKS CODE
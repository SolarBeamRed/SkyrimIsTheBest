const musicFolder = '../music/';
const songFiles = [
    "Beneath the Ice.mp3",
    "Blood and Steel.mp3",
    "Caught off Guard.mp3",
    "Dawn.mp3",
    "Death in the Darkness.mp3",
    "Death or Sovngarde.mp3",
    "Distant Horizons.mp3",
    "Dragonborn.mp3",
    "Dragonsreach.mp3",
    "Far Horizons.mp3",
    "From Past to Present.mp3",
    "Frostfall.mp3",
    "Imperial Throne.mp3",
    "Into Darkness.mp3",
    "Journey's End.mp3",
    "Kyne's Peace.mp3",
    "Masser.mp3",
    "Night Without Stars.mp3",
    "One They Fear.mp3",
    "Out of the Cold.mp3",
    "Secunda.mp3",
    "Seven Thousand Steps.mp3",
    "Shadows and Echoes.mp3",
    "Shattered Shields.mp3",
    "Silence Unbroken.mp3",
    "Silent Footsteps.mp3",
    "Sky Above, Voice Within.mp3",
    "Solitude.mp3",
    "Sovngarde.mp3",
    "Standing Stones.mp3",
    "Steel on Steel.mp3",
    "The Bannered Mare.mp3",
    "The City Gates.mp3",
    "The Gathering Storm.mp3",
    "The Jerall Mountains.mp3",
    "The Streets of Whiterun.mp3",
    "The White River.mp3",
    "Tooth and Claw.mp3",
    "Towers and Shadows.mp3",
    "Tundra.mp3",
    "Unbound.mp3",
    "Unbroken Road.mp3",
    "Under an Ancient Sun.mp3",
    "Watch the Skies.mp3",
    "Wind Guide You.mp3",
    "A Chance Meeting.mp3",
    "A Winter's Tale.mp3",
    "Ancient Stones.mp3",
    "Around the Fire.mp3",
    "Aurora.mp3",
    "Awake.mp3",
    "Before the Storm.mp3"
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
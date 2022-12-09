const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const volumeRange = document.getElementById('volume');

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? 'Play' : 'Pause';
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
    video.volume = volumeValue;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleInputVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }

  if (Number(value) === 0) {
    video.muted = true;
    muteBtn.innerText = 'Unmute';
  }
  video.volume = value;
};

const handleChangeVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (Number(value) !== 0) {
    volumeValue = value;
  }
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMuteClick);
volumeRange.addEventListener('input', handleInputVolumeRange);
volumeRange.addEventListener('change', handleChangeVolumeRange);

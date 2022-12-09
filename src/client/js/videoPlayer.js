const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const playBtnIcon = playBtn.querySelector('i');
const muteBtn = document.getElementById('mute');
const muteBtnIcon = muteBtn.querySelector('i');
const volumeRange = document.getElementById('volume');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const timeline = document.getElementById('timeline');
const fullscreenBtn = document.getElementById('fullscreen');
const fullscreenIcon = fullscreenBtn.querySelector('i');
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.getElementById('videoControls');

let controlsTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
    video.volume = volumeValue;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? 'fas fa-volume-mute'
    : 'fas fa-volume-up';

  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleInputVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = 'fas fa-volume-mute';
  }

  if (Number(value) === 0) {
    video.muted = true;
    muteBtnIcon.classList = 'fas fa-volume-up';
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

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullscreenIcon.classList = 'fas fa-expand';
  } else {
    videoContainer.requestFullscreen();
    fullscreenIcon.classList = 'fas fa-compress';
  }
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  videoControls.classList.add('show');
  controlsTimeout = setTimeout(() => {
    videoControls.classList.remove('show');
  }, 3000);
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMuteClick);
volumeRange.addEventListener('input', handleInputVolumeRange);
volumeRange.addEventListener('change', handleChangeVolumeRange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('click', handlePlayClick);
videoContainer.addEventListener('mousemove', handleMouseMove);
timeline.addEventListener('input', handleTimelineChange);
fullscreenBtn.addEventListener('click', handleFullscreen);
document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    handlePlayClick();
  }
});

if (event.keyCode === 77) {
  handleMuteClick();
}

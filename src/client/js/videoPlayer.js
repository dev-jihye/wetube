const video = document.querySelector('video');
const playBtn = document.getElementById('play');

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? 'Play' : 'Pause';
};

playBtn.addEventListener('click', handlePlayClick);

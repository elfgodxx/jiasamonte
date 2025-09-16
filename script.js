// Slider functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.project-slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let startX = 0;
let endX = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % slides.length; updateSlider(); });
prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateSlider(); });
indicators.forEach(indicator => { indicator.addEventListener('click', () => { currentIndex = parseInt(indicator.getAttribute('data-index')); updateSlider(); }); });

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextBtn.click();
    else if (e.key === 'ArrowLeft') prevBtn.click();
});

document.addEventListener('mousemove', e => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    document.querySelector('.grid-container').style.transform = `rotateX(75deg) translateZ(-200px) rotateY(${x}deg) rotateX(${y}deg)`;
});

setInterval(() => {
    if (Math.random() > 0.7) {
        const h1 = document.querySelector('h1');
        h1.classList.add('glitch');
        setTimeout(() => h1.classList.remove('glitch'), 200);
    }
}, 5000);

// Touch swipe support
slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
slider.addEventListener('touchend', e => { endX = e.changedTouches[0].clientX; handleSwipe(); });

function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextBtn.click(); // Swipe left
        } else {
            prevBtn.click(); // Swipe right
        }
    }
}

// --- COMPLETED MUSIC PLAYER SCRIPT ---
const playerToggle = document.getElementById('player-toggle');
const musicPlayer = document.getElementById('music-player');
const playPauseBtn = document.getElementById('play-pause');
const prevTrackBtn = document.getElementById('prev-track');
const nextTrackBtn = document.getElementById('next-track');
const volumeSlider = document.getElementById('volume-slider');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');

// --- IMPORTANT: ADD YOUR MUSIC FILES HERE ---
// Make sure the `src` path matches the location in your `assets` folder.
const playlist = [
    { title: "Nightfall", artist: "SoulProdMusic", src: "assets/Nightfall.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();

function loadTrack(trackIndex) {
    const track = playlist[trackIndex];
    trackName.textContent = track.title;
    trackArtist.textContent = track.artist;
    audio.src = track.src;
    if (isPlaying) {
        audio.play();
    }
}

function playTrack() {
    isPlaying = true;
    audio.play();
    playPauseBtn.textContent = '❚❚'; // Pause symbol
}

function pauseTrack() {
    isPlaying = false;
    audio.pause();
    playPauseBtn.textContent = '▶'; // Play symbol
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

nextTrackBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
});

prevTrackBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Autoplay next song when the current one ends
audio.addEventListener('ended', () => {
    nextTrackBtn.click();
});

// Toggle player visibility
playerToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the body click listener from firing
    const isPlayerVisible = musicPlayer.style.display === 'block';
    musicPlayer.style.display = isPlayerVisible ? 'none' : 'block';
});

// Initialize first track and set initial volume
audio.volume = volumeSlider.value / 100;
loadTrack(currentTrackIndex);
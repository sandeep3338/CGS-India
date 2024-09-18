const API_URL = "https://api.spotify.com/v1/browse/new-releases?limit=50";

const clientId = '6a0bf5aabd104cdf9b439862e836228d';
const clientSecret = '4745b34c59f84d5b9389b04b4e3610af';

let accessToken = '';
let currentTrackIndex = 0;
let tracks = [];

async function getAccessToken() {
    const authParams = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
    });
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: authParams.toString()
    });

    const data = await response.json();
    accessToken = data.access_token;
}

async function loadAlbums() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
      
        
        if (data && data.albums && data.albums.items) {
            console.log(data)
            displayAlbums(data.albums.items);
        } else {
            throw new Error('No albums found');
        }
    } catch (error) {
        console.error('Error loading albums:', error);
    }
}

function displayAlbums(albums) {
    const albumsDiv = document.getElementById('albums');
    albumsDiv.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'row';

    albums.forEach(album => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

        let albumItem = document.createElement('a');
        albumItem.href = "#";
        albumItem.className = 'album-item card border-0 shadow-sm';
        albumItem.style = "cursor: pointer;";

        let albumImage = document.createElement('img');
        albumImage.src = album.images[0]?.url || '';
        albumImage.alt = album.name;
        albumImage.className = 'card-img-top';
        albumImage.style = "border-radius: 10px";

        let albumBody = document.createElement('div');
        albumBody.className = 'card-body p-2 text-center';
        albumBody.innerHTML = `<h6 class="card-title text-dark">${album.name}</h6>`;

        albumItem.appendChild(albumImage);
        albumItem.appendChild(albumBody);

        albumItem.onclick = (event) => {
            event.preventDefault();
            loadTracks(album);
        };

        col.appendChild(albumItem);
        row.appendChild(col);
    });

    albumsDiv.appendChild(row);
}

async function loadTracks(album) {
    const albumTitle = document.getElementById('album-title');
    const trackListDiv = document.getElementById('track-list');

    albumTitle.textContent = album.name;

    const response = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    tracks = data.items;
    currentTrackIndex = 0;
    displayTracks(tracks);
    playTrack(tracks[currentTrackIndex].preview_url);
}

function displayTracks(tracks) {
    const trackListDiv = document.getElementById('track-list');
    trackListDiv.innerHTML = '';

    tracks.forEach((track, index) => {
        let trackItem = document.createElement('div');
        trackItem.className = 'track-item p-2 mb-2 border-bottom';
        trackItem.textContent = `${index + 1}. ${track.name}`;

        if (track.preview_url) {
            trackItem.onclick = () => {
                currentTrackIndex = index;
                playTrack(track.preview_url);
                trackItem.style.color = 'green';
            };
        } else {
            trackItem.style.color = 'red';
        }

        trackListDiv.appendChild(trackItem);
    });
}

function playTrack(previewUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPause');

    if (previewUrl) {
        audioPlayer.src = previewUrl;
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

document.getElementById('playPause').onclick = function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPause');

    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
};

document.getElementById('nextTrack').onclick = function() {
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
        playTrack(tracks[currentTrackIndex].preview_url);
    }
};

document.getElementById('prevTrack').onclick = function() {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
        playTrack(tracks[currentTrackIndex].preview_url);
    }
};

function updateProgressBar() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');

    if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
}

setInterval(updateProgressBar, 1000);

document.getElementById('progressBar').addEventListener('input', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');

    if (audioPlayer.duration) {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
});

(async function init() {
    await getAccessToken();
    loadAlbums();
})();

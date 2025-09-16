// console.log("Right some JS")

// // This is a Glbal Variable to store one song at a time when a song is played   
// let currentSong = new Audio()
// let currentIndex = 0
// let songsList = []


// async function getSongName() {

//     let a = await fetch("http://127.0.0.1:3000/songs")
//     let response = await a.text();

//     let div = document.createElement("div")
//     div.innerHTML = response;

//     let as = div.getElementsByTagName("a")

//     let songs = []

//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {

//             const url = element.href
//             const filename = url.split("/songs/").pop()

//             songs.push({
//                 url: url,
//                 filename: filename
//             })
//         }

//     }
//     return songs;

// }

// const playMusic = (fileUrl, songName, Artist, index) => {
//     // let audio = new Audio( fileUrl);
//     currentSong.src = fileUrl
//     currentSong.play();
//     pause.src = "pause.svg"

//     // Update footer player with current song name and artist
//     document.querySelector(".footerSongName").textContent = songName;
//     document.querySelector(".footersongArtist").textContent = Artist;

//     // Track index
//     currentIndex = index

//     //Update the play button in the song list
//     updatePlayPauseIcons(fileUrl, true)


// }

// // funciton to sync the seekbar with the current song time
// function updatePlayPauseIcons(fileUrl, isPlaying) {
//     // Reset all playlist buttons to "play"
//     document.querySelectorAll(".play").forEach(btn => btn.src = "play.svg");

//     if (isPlaying) {
//         // Change the playlist button of the current song
//         const activeBtn = document.querySelector(`.play[data-url="${fileUrl}"]`);
//         if (activeBtn) activeBtn.src = "pause.svg";
//         // Change footer button
//         document.getElementById("pause").src = "pause.svg";
//     } else {
//         document.getElementById("pause").src = "play.svg";
//     }
// }

// async function main() {

//     // Get list of all the Songs
//     let songs = await getSongName()

//     let songlist = document.querySelector(".song-list")
//     let trendingContainer = document.querySelector(".songContainer")

//     for (const song of songs) {

//         let [title, artist] = song.filename.replace(".mp3", " ").split("-")

//         title = title.replaceAll("%20", " ").trim()
//         artist = artist ? artist.replaceAll("%20", " ").trim() : "Unkown Artist"
//         // Show all the songs in the playlist
//         let songList = document.createElement("div")

//         songList.innerHTML = ` <div class="playlistInfo display  ">
//                     <div class="song-left display ">
//                         <div class="song-img ">
//                             <img class="rounded" src="music.svg"
//                                 alt="Song Cover">
//                         </div>
//                         <div class="songInfo ">
//                             <div class="songName">
//                                 <p>${title.replaceAll("_", " ")}</p>
//                             </div>
//                             <div class="songArtist">
//                                 <p>${artist.replaceAll("_", " ")}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <img class="play" src="play.svg" alt="" data-url="${song.url}">
//                 </div>`

//         songlist.appendChild(songList)

//         let trendingSongs = document.createElement("div")
//         trendingSongs.className = "song-cards relative"
//         trendingSongs.innerHTML = `
//                         <img src="https://i.scdn.co/image/ab67616d00001e023dc5639cb321a69b721bed92" alt="">
//                         <div class="play-hover display">
//                             <img class="invert pointer " src="play.svg" alt="play">
//                         </div>

//                         <div class="songInfo">
//                             <div class="songName">${title}</div>
//                             <div class="songArtist">${artist}</div>
//                         </div>`

//         trendingContainer.appendChild(trendingSongs)
//     }

//     songsList = songs

//     // Also Add the Songs to Trending Section 
//     // This will convert nodelist array to a real array

//     // Attatch event listener to each song
//     Array.from(document.querySelectorAll(".playlistInfo")).forEach(e => {
//         e.addEventListener("click", element => {
//             // This is used to extract the song name 
//             const songName = e.querySelector(".songName p").textContent.trim();
//             // This is used to extract the artist name 
//             const artist = e.querySelector(".songArtist p").textContent.trim();
//             //This is to get the audio url so that the audio can play
//             const fileUrl = e.querySelector(".play").dataset.url;


//             // This will log the Variable in a clean format
//             console.log(`Now Playing : ${songName} - ${artist}`);

//             // This will give the song name based on the song clicked by user
//             playMusic(fileUrl, songName, artist, index)

//         })
//     });

//     // Attach event listener to pause and play buttons of song list

//     Array.from(document.querySelectorAll(".play")).forEach(playBtn => {
//         playBtn.addEventListener("click", (e) => {
//             e.stopPropagation();

//             const fileUrl = playBtn.dataset.url;
//             //Update Playlist button logic
//             if (currentSong.src === fileUrl) {
//                 if (currentSong.paused) {
//                     currentSong.play();
//                     updatePlayPauseIcons(fileUrl, true)
//                 }
//                 else {
//                     currentSong.pause()
//                     updatePlayPauseIcons(fileUrl, false)
//                 }
//             }
//             else {
//                 currentSong.src = fileUrl;
//                 currentSong.play()
//                 updatePlayPauseIcons(fileUrl, true)
//             }
//         })
//     });

//     // Attach event listener to buttons (Play, Next, Previos)seekbar

//     pause.addEventListener("click", () => {
//         if (currentSong.paused) {
//             currentSong.play();
//             updatePlayPauseIcons(currentSong.src, true);
//         } else {
//             currentSong.pause();
//             updatePlayPauseIcons(currentSong.src, false);
//         }
//     });

//     // Next Button
// next.addEventListener("click", () => {
//     currentIndex = (currentIndex + 1) % songsList.length
//     let nextSong = songsList[currentIndex]
//     let [title, artist] = nextSong.filename.replace(".mp3", "").split("-")
//     playMusic(nextSong.url, title.trim(), artist ? artist.trim() : "Unknown Artist", currentIndex)
// })

// // Previous Button
// previous.addEventListener("click", () => {
//     currentIndex = (currentIndex - 1 + songsList.length) % songsList.length
//     let prevSong = songsList[currentIndex]
//     let [title, artist] = prevSong.filename.replace(".mp3", "").split("-")
//     playMusic(prevSong.url, title.trim(), artist ? artist.trim() : "Unknown Artist", currentIndex)
// })

// // Auto play next when current song ends              
// currentSong.addEventListener("ended", () => {
//     next.click()
// })

// }

// main()


// let seekBar = document.querySelector(".seekBar")
// let circle = seekBar.querySelector(".circle")
// let songTime = document.querySelector(".songTime")
// let songCurrentTime = document.querySelector(".songCurrentTime")

// // Update seekbar
// currentSong.addEventListener("timeupdate", () => {
//     if (currentSong.duration) {
//         let progress = (currentSong.currentTime / currentSong.duration) * 100
//         circle.style.left = progress + "%"
//         songCurrentTime.textContent = formatTime(currentSong.currentTime)
//         songTime.textContent = formatTime(currentSong.duration)
//     }
// })

// // Click to seek
// seekBar.addEventListener("click", (e) => {
//     let rect = seekBar.getBoundingClientRect()
//     let percent = (e.clientX - rect.left) / rect.width
//     currentSong.currentTime = percent * currentSong.duration
// })

// // Helper for formatting time
// function formatTime(seconds) {
//     if (isNaN(seconds)) return "0:00"
//     let mins = Math.floor(seconds / 60)
//     let secs = Math.floor(seconds % 60)
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`
// }


console.log("Right some JS")

// This is a Global Variable to store one song at a time when a song is played   
let currentSong = new Audio()
let currentIndex = 0
let songsList = []

async function getSongName() {

    let a = await fetch("/songs/")
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")

    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {

            const url = element.href
            if (url.toLowerCase().endsWith(".mp3")) {
                const filename = url.substring(url.lastIndexOf("/") + 1);
                songs.push({ url, filename });
            }
        }
    }
    return songs;

}

const playMusic = (fileUrl, songName, Artist, index) => {
    currentSong.src = fileUrl
    currentSong.play();
    pause.src = "pause.svg"

    // Update footer player with current song name and artist
    document.querySelector(".footerSongName").textContent = songName; // FIXED: class in HTML should be footerSongName not footerSonaName
    document.querySelector(".footersongArtist").textContent = Artist;

    // Track index
    currentIndex = index

    // Update the play button in the song list
    updatePlayPauseIcons(fileUrl, true)
}

// function to sync the seekbar with the current song time
function updatePlayPauseIcons(fileUrl, isPlaying) {
    // Reset all playlist buttons to "play"
    document.querySelectorAll(".play").forEach(btn => btn.src = "play.svg");

    if (isPlaying) {
        // Change the playlist button of the current song
        const activeBtn = document.querySelector(`.play[data-url="${fileUrl}"]`);
        if (activeBtn) activeBtn.src = "pause.svg";
        // Change footer button
        document.getElementById("pause").src = "pause.svg";
    } else {
        document.getElementById("pause").src = "play.svg";
    }
}

async function main() {

    // Get list of all the Songs
    let songs = await getSongName()

    let songlist = document.querySelector(".song-list")
    let trendingContainer = document.querySelector(".songContainer")

    for (const song of songs) {

        let [title, artist] = song.filename.replace(".mp3", " ").split("-")

        title = title.replaceAll("%20", " ").trim()
        artist = artist ? artist.replaceAll("%20", " ").trim() : "Unkown Artist"

        // Show all the songs in the playlist
        let songList = document.createElement("div")

        songList.innerHTML = ` <div class="playlistInfo display  ">
                    <div class="song-left display ">
                        <div class="song-img ">
                            <img class="rounded" src="music.svg"
                                alt="Song Cover">
                        </div>
                        <div class="songInfo ">
                            <div class="songName">
                                <p>${title.replaceAll("_", " ")}</p>
                            </div>
                            <div class="songArtist">
                                <p>${artist.replaceAll("_", " ")}</p>
                            </div>
                        </div>
                    </div>

                    <img class="play" src="play.svg" alt="" data-url="${song.url}">
                </div>`

        songlist.appendChild(songList)

        let trendingSongs = document.createElement("div")
        trendingSongs.className = "song-cards relative"
        trendingSongs.innerHTML = `
                        <img src="https://i.scdn.co/image/ab67616d00001e023dc5639cb321a69b721bed92" alt="">
                        <div class="play-hover display">
                            <img class="invert pointer " src="play.svg" alt="play">
                        </div>

                        <div class="songInfo">
                            <div class="songName">${title}</div>
                            <div class="songArtist">${artist}</div>
                        </div>`

        trendingContainer.appendChild(trendingSongs)
    }

    songsList = songs

    // Attach event listener to trending songs
    Array.from(document.querySelectorAll(".song-cards")).forEach((card, index) => {
        const playBtn = card.querySelector(".play-hover img") // the hover play button

        // Click anywhere on the card (except play button) plays song
        card.addEventListener("click", (e) => {
            if (e.target === playBtn) return // prevent double-trigger
            playTrendingSong(index)
        })

        // Click on the hover play button
        playBtn.addEventListener("click", (e) => {
            e.stopPropagation() // stop bubbling to card
            if (currentIndex === index && !currentSong.paused) {
                currentSong.pause()
                updatePlayPauseIcons(currentSong.src, false)
                playBtn.src = "play.svg"
            } else {
                playTrendingSong(index)
            }
        })
    })

    function playTrendingSong(index) {
        const song = songsList[index]

        let [title, artist] = song.filename.replace(".mp3", "").split("-")
        title = title.replaceAll("%20", " ").replaceAll("_", " ").trim()
        artist = artist ? artist.replaceAll("%20", " ").replaceAll("_", " ").trim() : "Unknown Artist"

        playMusic(song.url, title, artist, index)

        // update trending play button icon
        document.querySelectorAll(".play-hover img").forEach(btn => btn.src = "play.svg")
        const activeBtn = document.querySelectorAll(".play-hover img")[index]
        if (activeBtn) activeBtn.src = "pause.svg"
    }

    // Attach event listener to each song (playlist)
    Array.from(document.querySelectorAll(".playlistInfo")).forEach((e, index) => { // FIXED: added index
        e.addEventListener("click", element => {
            const songName = e.querySelector(".songName p").textContent.trim();
            const artist = e.querySelector(".songArtist p").textContent.trim();
            const fileUrl = e.querySelector(".play").dataset.url;

            console.log(`Now Playing : ${songName} - ${artist}`);

            playMusic(fileUrl, songName, artist, index) // FIXED: index now defined
        })
    });

    // Attach event listener to pause and play buttons of song list
    Array.from(document.querySelectorAll(".play")).forEach((playBtn, index) => { // FIXED: added index
        playBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            const fileUrl = playBtn.dataset.url;

            if (currentSong.src === fileUrl) {
                if (currentSong.paused) {
                    currentSong.play();
                    updatePlayPauseIcons(fileUrl, true)
                }
                else {
                    currentSong.pause()
                    updatePlayPauseIcons(fileUrl, false)
                }
            }
            else {
                currentIndex = index // FIXED: keep currentIndex in sync
                currentSong.src = fileUrl;
                currentSong.play()
                updatePlayPauseIcons(fileUrl, true)
            }
        })
    });

    // Attach event listener to buttons (Play, Next, Previous) seekbar
    pause.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            updatePlayPauseIcons(currentSong.src, true);
        } else {
            currentSong.pause();
            updatePlayPauseIcons(currentSong.src, false);
        }
    });

    // Next Button
    // Next Button
    next.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % songsList.length
        let nextSong = songsList[currentIndex]
        let [title, artist] = nextSong.filename.replace(".mp3", "").split("-")

        title = title.replaceAll("%20", " ").replaceAll("_", " ").trim()
        artist = artist ? artist.replaceAll("%20", " ").replaceAll("_", " ").trim() : "Unknown Artist"

        playMusic(nextSong.url, title, artist, currentIndex)
    })


    // Previous Button
    // Previous Button
    previous.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + songsList.length) % songsList.length
        let prevSong = songsList[currentIndex]
        let [title, artist] = prevSong.filename.replace(".mp3", "").split("-")

        title = title.replaceAll("%20", " ").replaceAll("_", " ").trim()
        artist = artist ? artist.replaceAll("%20", " ").replaceAll("_", " ").trim() : "Unknown Artist"

        playMusic(prevSong.url, title, artist, currentIndex)
    })

    // LOOP TOGGLE
    let isLooping = false

    loop.addEventListener("click", () => {
        isLooping = !isLooping
        currentSong.loop = isLooping

        // Change loop button icon
        loop.src = isLooping ? "loop-active.svg" : "loop.svg"
    })

    // Auto play next only if loop is off
    currentSong.addEventListener("ended", () => {
        if (!isLooping) {
            next.click()
        }
    })


    // Auto play next when current song ends              
    currentSong.addEventListener("ended", () => {
        next.click()
    })
}

main()

// ======================= SEEK BAR SECTION =======================
let seekBar = document.querySelector(".seekBar")
let circle = seekBar.querySelector(".circle")

// Add progress bar inside seekbar
let progressBar = document.createElement("div")
progressBar.className = "progress"
seekBar.insertBefore(progressBar, circle)

let songTime = document.querySelector(".songTime")
let songCurrentTime = document.querySelector(".songCurrentTime")

let isDragging = false

// Update seekbar as song plays
currentSong.addEventListener("timeupdate", () => {
    if (!isDragging && currentSong.duration) {
        let percent = (currentSong.currentTime / currentSong.duration) * 100
        circle.style.left = percent + "%"
        progressBar.style.width = percent + "%"
        songCurrentTime.textContent = formatTime(currentSong.currentTime)
        songTime.textContent = formatTime(currentSong.duration)
    }
})

// Click to seek
seekBar.addEventListener("click", (e) => {
    let rect = seekBar.getBoundingClientRect()
    let percent = (e.clientX - rect.left) / rect.width
    currentSong.currentTime = percent * currentSong.duration
})

// --- Drag support (mouse + touch) ---
function startDrag(e) {
    isDragging = true
    updatePosition(e)
}

function duringDrag(e) {
    if (isDragging) updatePosition(e)
}

function endDrag(e) {
    if (isDragging) {
        updatePosition(e)
        isDragging = false
    }
}

function updatePosition(e) {
    let clientX = e.clientX || (e.touches && e.touches[0].clientX)
    let rect = seekBar.getBoundingClientRect()
    let percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    circle.style.left = percent * 100 + "%"
    progressBar.style.width = percent * 100 + "%"
    currentSong.currentTime = percent * currentSong.duration
}

// Mouse events
circle.addEventListener("mousedown", startDrag)
window.addEventListener("mousemove", duringDrag)
window.addEventListener("mouseup", endDrag)

// Touch events
circle.addEventListener("touchstart", startDrag)
window.addEventListener("touchmove", duringDrag)
window.addEventListener("touchend", endDrag)

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00"
    let mins = Math.floor(seconds / 60)
    let secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}



// ===== AUDIO CONTROLS =====
let volumeBar = document.querySelector(".volumeBar")
let volumeProgress = document.querySelector(".volumeProgress")
let volumeCircle = document.querySelector(".volumeCircle")
let muteBtn = document.getElementById("mute")
let lastVolume = 1

// Default
currentSong.volume = 1

function setVolume(percent) {
    percent = Math.min(Math.max(percent, 0), 1) // clamp between 0–1
    currentSong.volume = percent

    volumeProgress.style.width = (percent * 100) + "%"
    volumeCircle.style.left = (percent * 100) + "%" // keep knob synced

    if (percent === 0) {
        muteBtn.src = "mute.svg"
    } else {
        muteBtn.src = "volume.svg"
    }
}




// Click to set volume
volumeBar.addEventListener("click", (e) => {
    let rect = volumeBar.getBoundingClientRect()
    let percent = (e.clientX - rect.left) / rect.width
    setVolume(percent)
})

// Dragging
let isDraggingVolume = false

volumeCircle.addEventListener("mousedown", () => isDraggingVolume = true)
window.addEventListener("mousemove", (e) => {
    if (isDraggingVolume) {
        let rect = volumeBar.getBoundingClientRect()
        let percent = (e.clientX - rect.left) / rect.width
        setVolume(percent)
    }
})
window.addEventListener("mouseup", () => isDraggingVolume = false)

// Touch support
volumeCircle.addEventListener("touchstart", () => isDraggingVolume = true)
window.addEventListener("touchmove", (e) => {
    if (isDraggingVolume) {
        let rect = volumeBar.getBoundingClientRect()
        let clientX = e.touches[0].clientX
        let percent = (clientX - rect.left) / rect.width
        setVolume(percent)
    }
})
window.addEventListener("touchend", () => isDraggingVolume = false)

// Mute/unmute
muteBtn.addEventListener("click", () => {
    if (currentSong.volume > 0) {
        lastVolume = currentSong.volume
        setVolume(0)
    } else {
        setVolume(lastVolume || 1)
    }
})




// Helper for formatting time
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00"
    let mins = Math.floor(seconds / 60)
    let secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}


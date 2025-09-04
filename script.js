console.log("Right some JS")

// This is a Glbal Variable to store one song at a time when a song is played   
let currentSong = new Audio()


async function getSongName() {

    let a = await fetch("http://127.0.0.1:3000/songs")
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")

    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {

            const url = element.href
            const filename = url.split("/songs/").pop()

            songs.push({
                url: url,
                filename: filename
            })
        }

    }
    return songs;

}

const playMusic = (fileUrl) => {
    // let audio = new Audio( fileUrl);
    currentSong.src = fileUrl
    currentSong.play();
    pause.src= "pause.svg"

    
    document.querySelector(".songName>p").innerHTML = fileUrl
    document.querySelector(".songArtist").innerHTML = "00/00 "
}

async function main() {

    // Get list of all the Songs
    let songs = await getSongName()

    let songlist = document.querySelector(".song-list")

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
    }

    // This will convert nodelist array to a real array
    // Attatch event listener to each song
    Array.from(document.querySelectorAll(".playlistInfo")).forEach(e => {
        e.addEventListener("click", element => {
            // This is used to extract the song name 
            const songName = e.querySelector(".songName p").textContent.trim();
            // This is used to extract the artist name 
            const artist = e.querySelector(".songArtist p").textContent.trim();
            //This is to get the audio url so that the audio can play
            const fileUrl = e.querySelector(".play").dataset.url;


            // This will log the Variable in a clean format
            console.log(`Now Playing : ${songName} - ${artist}`);
            // This will give the song name based on the song clicked by user
            playMusic(fileUrl)

        })
    });

    // Attach event listener to pause and play buttons of song list

    Array.from(document.querySelectorAll(".play")).forEach(playBtn => {
        playBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            const fileUrl = playBtn.dataset.url;

            if (currentSong.src === fileUrl) {
                if (currentSong.paused) {
                    currentSong.play();
                    playBtn.src = "pause.svg"
                }
                else {
                    currentSong.pause()
                    playBtn.src = "play.svg"
                }
            }
            else {
                currentSong.src = fileUrl;
                currentSong.play()

                document.querySelectorAll(".play").forEach(btn => btn.src = "play.svg");
                playBtn.src = "pause.svg"
            }
        })
    });

    // Attach event listener to buttons (Play, Next, Previos)seekbar

    pause.addEventListener("click", () => {
       if (currentSong.paused) {
            currentSong.play()
            pause.src = "pause.svg"
        }
        else{
            currentSong.pause()
            pause.src= "play.svg"
        }
        


    })




}


main()
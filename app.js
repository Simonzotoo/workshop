// Background music setup
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.4;

// First click: enter fullscreen + start music
document.addEventListener("click", function initializeExperience() {

    // Enter fullscreen
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log("Fullscreen request failed:", err);
        });
    }

    // Start background music
    bgMusic.play().catch(err => {
        console.log("Autoplay blocked:", err);
    });

}, { once: true });


// Speaker Data
const speakers = [
{
    name: "Charles A. Babbage Jnr",
    role: "Lecturer, Software Engineer & Researcher",
    bio: "Bio text goes here describing expertise and professional achievements.",
    image: "assets/images/Babbage.JPG",
    audio: "assets/audio/speaker1.mp3"
},
{
    name: "Speaker Two",
    role: "AI & Automation Specialist",
    bio: "Bio text for AI speaker goes here.",
    image: "assets/images/enoch.PNG",
    audio: "assets/audio/speaker2.mp3"
},
{
    name: "Frederick Kwame Minta",
    role: "Networking Specialist",
    bio: "Bio text for networking speaker goes here.",
    image: "assets/images/Fredrick.JPG",
    audio: "assets/audio/speaker3.mp3"
},
{
    name: "Speaker Four",
    role: "Lecturer, Network Engineer",
    bio: "Bio text for software speaker goes here.",
    image: "assets/images/Edwin.JPG",
    audio: "assets/audio/speaker4.mp3"
},
{
    name: "Justice Simon Zotoo",
    role: "President, School of Computing And Technology Students' Association",
    bio: "Passionate about intelligent systems and scalable architecture.",
    image: "assets/images/jaykeys.JPG",
    audio: "assets/audio/speaker5.mp3"
}
];

let voice;


// Show Speaker
function showSpeaker(index) {
    const speaker = speakers[index];

    document.getElementById("mainScreen").classList.add("hidden");
    document.getElementById("speakerScreen").classList.remove("hidden");

    document.getElementById("speakerImage").src = speaker.image;
    document.getElementById("speakerName").innerText = speaker.name;
    document.getElementById("speakerRole").innerText = speaker.role;

    typeWriter(speaker.bio);

    // Lower background music during narration
    bgMusic.volume = 0.15;

    voice = new Audio(speaker.audio);
    voice.play();

    voice.onended = () => {
        bgMusic.volume = 0.4;
    };
}


// Typing Effect
function typeWriter(text) {
    const bioElement = document.getElementById("speakerBio");
    bioElement.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            bioElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 25);
        }
    }

    typing();
}


// Back to main screen
function goBack() {
    if (voice) {
        voice.pause();
        voice.currentTime = 0;
    }

    bgMusic.volume = 0.4;

    document.getElementById("speakerScreen").classList.add("hidden");
    document.getElementById("mainScreen").classList.remove("hidden");
}
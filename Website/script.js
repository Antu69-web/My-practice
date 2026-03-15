// ===== Settings Panel =====
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsClose = document.getElementById('settingsClose');
const html = document.documentElement;

// Toggle settings panel
function toggleSettings() {
    settingsPanel.classList.toggle('active');
}

settingsBtn.addEventListener('click', toggleSettings);
settingsClose.addEventListener('click', toggleSettings);
settingsOverlay.addEventListener('click', toggleSettings);

// Theme Management
const themeOptions = document.querySelectorAll('.theme-option');
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

//Set active theme button
themeOptions.forEach(option => {
    if (option.getAttribute('data-theme') === currentTheme) {
        option.classList.add('active');
    }

    option.addEventListener('click', () => {
        const selectedTheme = option.getAttribute('data-theme');

        // Update active state
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        // Apply theme
        html.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
});

// Clear Chat History
const clearChatBtn = document.getElementById('clearChatBtn');
clearChatBtn.addEventListener('click', () => {
    const chatbotMessages = document.getElementById('chatbotMessages');
    // Keep only the initial welcome message
    const firstMessage = chatbotMessages.querySelector('.message');
    chatbotMessages.innerHTML = '';
    if (firstMessage) {
        chatbotMessages.appendChild(firstMessage.cloneNode(true));
    }
});

// Animation Toggles
const animationsToggle = document.getElementById('animationsToggle');
const scrollAnimationsToggle = document.getElementById('scrollAnimationsToggle');

// Load saved preferences
const animationsEnabled = localStorage.getItem('animations') !== 'false';
const scrollAnimationsEnabled = localStorage.getItem('scrollAnimations') !== 'false';

animationsToggle.checked = animationsEnabled;
scrollAnimationsToggle.checked = scrollAnimationsEnabled;

// Apply animation preferences
function updateAnimationPreferences() {
    if (!animationsToggle.checked) {
        document.documentElement.style.setProperty('--transition-speed', '0s');
    } else {
        document.documentElement.style.setProperty('--transition-speed', '');
    }
}

animationsToggle.addEventListener('change', () => {
    localStorage.setItem('animations', animationsToggle.checked);
    updateAnimationPreferences();
});

scrollAnimationsToggle.addEventListener('change', () => {
    localStorage.setItem('scrollAnimations', scrollAnimationsToggle.checked);
});

updateAnimationPreferences();

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Typing Effect for Hero Role =====
const roles = [
    'Web Developer',
    'Machine Learning Enthusiast',
    'UI/UX Designer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

const roleTextElement = document.getElementById('roleText');

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing effect
typeRole();

// ===== Skill Progress Animation =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.width = bar.style.getPropertyValue('--progress');
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    // Reset skill bars initially
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
    });
    skillObserver.observe(skillsSection);
}

// ===== Scroll Reveal Animation =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Add reveal animation to cards
document.querySelectorAll('.project-card, .skill-category, .stat-card, .research-card, .cv-preview-card, .cv-highlight-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    revealObserver.observe(el);
});

// Add revealed class styling dynamically
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject')?.value.trim() || 'No Subject',
        message: document.getElementById('message').value.trim()
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }

    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);

    // Show success message
    showFormStatus('Thank you for your message! I will get back to you soon.', 'success');

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        hideFormStatus();
    }, 5000);
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
}

function hideFormStatus() {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
}

// ===== Smooth Scroll Offset for Fixed Navbar =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax Effect for Hero Orbs =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Project Card Tilt Effect (Optional Enhancement) =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Cursor Trail Effect (Optional Enhancement) =====
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease-out;
    `;
    document.body.appendChild(trail);
    return trail;
};

let cursorTrail = null;
let mouseX = 0;
let mouseY = 0;

// Only add cursor trail on desktop devices
if (window.innerWidth > 968) {
    cursorTrail = createCursorTrail();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorTrail) {
            cursorTrail.style.left = `${mouseX - 10}px`;
            cursorTrail.style.top = `${mouseY - 10}px`;
        }
    });
}

// ===== AI Chatbot Functionality =====
const chatbotWidget = document.getElementById('chatbotWidget');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMinimize = document.getElementById('chatbotMinimize');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Toggle chatbot open/close
chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('active');
    if (chatbotWidget.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotMinimize.addEventListener('click', () => {
    chatbotWidget.classList.remove('active');
});

// AI Response Database
const chatbotResponses = {
    skills: {
        keywords: ['skill', 'technology', 'tech', 'know', 'proficient', 'language', 'framework'],
        response: "I'm proficient in multiple technologies! 💻\n\n• Frontend: HTML, CSS, JavaScript, React\n• Backend: Node.js, Python, Django\n• Tools: Git, GitHub, UI/UX Design\n\nI love building modern, responsive web applications with clean code and great user experiences!"
    },
    projects: {
        keywords: ['project', 'work', 'portfolio', 'built', 'created', 'developed'],
        response: "I've worked on several exciting projects! 🚀\n\n• Full-stack web applications with React and Node.js\n• Python/Django applications with PostgreSQL\n• Vue.js applications with Firebase\n\nCheck out my Projects section above to see detailed examples of my work!"
    },
    contact: {
        keywords: ['contact', 'reach', 'email', 'phone', 'connect', 'talk', 'hire'],
        response: "I'd love to hear from you! 📧\n\n• Email: soumendasantu@gmail.com\n• Phone: +880 1790602662\n• GitHub: github.com/Antu69-web\n• LinkedIn: linkedin.com/in/soumen-das\n\nFeel free to reach out through any of these channels!"
    },
    education: {
        keywords: ['education', 'study', 'degree', 'university', 'college', 'school'],
        response: "I'm currently pursuing my Bachelor's in Computer Science! 🎓\n\n• American International University (2022-2026)\n• Focused on software engineering and modern web technologies\n• Strong foundation in algorithms and problem-solving"
    },
    research: {
        keywords: ['research', 'paper', 'publication', 'study'],
        response: "I'm actively involved in research! 📚\n\nMy research interests include:\n• Machine Learning & AI\n• Data Science & Analytics\n• Software Engineering practices\n• NLP & Neural Networks\n\nCheck out my Research section for more details!"
    },
    cv: {
        keywords: ['cv', 'resume', 'download', 'experience'],
        response: "You can download my full CV/Resume! 📄\n\nClick the 'Download CV' button in the hero section or scroll to the CV section to see highlights of my experience, education, and achievements.\n\nIt includes all my skills, projects, and professional information!"
    },
    default: {
        response: "Thanks for your message! 😊 I can help you with:\n\n• Information about my skills and technologies\n• Details about my projects\n• My education and research\n• How to contact me\n\nWhat would you like to know?"
    }
};

// Add message to chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';

    if (isUser) {
        avatarDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
        `;
    } else {
        avatarDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
        `;
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get AI response based on message
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check each category for keyword matches
    for (const [category, data] of Object.entries(chatbotResponses)) {
        if (category !== 'default' && data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data.response;
        }
    }

    // Return default response if no match
    return chatbotResponses.default.response;
}

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();

    if (message) {
        // Add user message
        addMessage(message, true);
        chatbotInput.value = '';

        // Show typing indicator
        setTimeout(() => {
            // Get and add AI response
            const response = getAIResponse(message);
            addMessage(response, false);
        }, 800);
    }
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick actions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-action')) {
        const message = e.target.getAttribute('data-message');
        chatbotInput.value = message;
        sendMessage();
    }
});

// ===== Console easter egg =====
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? I like your curiosity! 🚀', 'font-size: 14px; color: #ec4899;');
console.log('%cFeel free to reach out if you want to collaborate!', 'font-size: 12px; color: #10b981;');
// ===== Music Player & Visualizer =====
const musicPlayer = {
    audio: document.getElementById('audioPlayer'),
    isPlaying: false,
    currentTrackIndex: 0,
    visualizerInitialized: false,
    audioContext: null,
    analyser: null,
    source: null,
    animationId: null,
    volume: 0.7,

    // Sample tracks (Please replace with actual URLs)
    tracks: [
        {
            title: 'Background Music',
            artist: 'Local File',
            url: 'background.mp3', // Expected file in same folder
            coverColor: 'linear-gradient(135deg, #4f46e5, #06b6d4)'
        }
    ],

    init() {
        // DOM Elements
        this.dom = {
            player: document.getElementById('musicPlayerContainer'),
            toggle: document.getElementById('musicPlayerToggle'),
            content: document.getElementById('musicPlayerContent'),
            close: document.getElementById('musicPlayerClose'),
            playPauseBtn: document.getElementById('playPauseBtn'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            playIcon: document.querySelector('.play-icon'),
            pauseIcon: document.querySelector('.pause-icon'),
            trackTitle: document.getElementById('trackTitle'),
            trackArtist: document.getElementById('trackArtist'),
            progressBar: document.querySelector('.progress-bar'),
            progressFill: document.getElementById('progressFill'),
            currentTime: document.getElementById('currentTime'),
            totalTime: document.getElementById('totalTime'),
            volumeSlider: document.getElementById('volumeSlider'),
            albumArt: document.querySelector('.album-art'),
            canvas: document.getElementById('audioVisualizer'),
            playlist: document.getElementById('musicPlaylist')
        };

        // Initialize state from localStorage
        const savedVolume = localStorage.getItem('musicVolume');
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
        }

        this.audio.volume = this.volume;
        this.dom.volumeSlider.value = this.volume * 100;


        // Event Listeners
        this.setupEventListeners();

        // Load first track
        this.loadTrack(0);
        this.renderPlaylist();

        // Attempt Autoplay based on preference
        this.attemptAutoplay();
    },

    attemptAutoplay() {
        // ALWAYS try to play on load (User request: "enter the website ... auto on")
        const shouldPlay = true;

        if (shouldPlay) {
            // Try to play immediately
            const playPromise = this.audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isPlaying = true;
                    this.updatePlayPauseUI();
                }).catch(() => {
                    console.log("Autoplay blocked. Waiting for any interaction.");
                    // Add listener to ALL common interactions to start music ASAP
                    const unlockEvents = ['click', 'keydown', 'touchstart', 'scroll', 'wheel'];

                    const unlockAudio = () => {
                        this.audio.play()
                            .then(() => {
                                this.isPlaying = true;
                                this.updatePlayPauseUI();
                                // Remove all listeners once successful
                                unlockEvents.forEach(evt => document.removeEventListener(evt, unlockAudio));
                            })
                            .catch(e => console.error("Unlock failed:", e));
                    };

                    unlockEvents.forEach(evt => document.addEventListener(evt, unlockAudio, { once: true }));
                });
            }
        } else {
            this.isPlaying = false;
            this.updatePlayPauseUI();
        }
    },

    setupEventListeners() {
        // Toggle Player
        this.dom.toggle.addEventListener('click', () => this.togglePlayer());
        this.dom.close.addEventListener('click', () => this.togglePlayer());

        // Controls
        this.dom.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.dom.prevBtn.addEventListener('click', () => this.prevTrack());
        this.dom.nextBtn.addEventListener('click', () => this.nextTrack());

        // Audio Events
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('loadedmetadata', () => {
            this.dom.totalTime.textContent = this.formatTime(this.audio.duration);
        });
        this.audio.addEventListener('error', (e) => {
            console.error("Audio Error:", e);
            this.dom.trackTitle.textContent = "Error Loading Track";
            this.dom.trackArtist.textContent = "Please try next track";
        });
        this.audio.addEventListener('waiting', () => {
            this.dom.trackTitle.textContent = "Loading...";
        });
        this.audio.addEventListener('playing', () => {
            this.dom.trackTitle.textContent = this.tracks[this.currentTrackIndex].title;
        });

        // Progress Bar Click
        this.dom.progressBar.addEventListener('click', (e) => {
            const width = this.dom.progressBar.clientWidth;
            const clickX = e.offsetX;
            const duration = this.audio.duration;
            this.audio.currentTime = (clickX / width) * duration;
        });

        // Volume Control
        this.dom.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        // Settings Controls



    },

    togglePlayer() {
        this.dom.content.classList.toggle('active');
    },

    renderPlaylist() {
        if (!this.dom.playlist) return;
        this.dom.playlist.innerHTML = '';
        this.tracks.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === this.currentTrackIndex ? 'active' : ''}`;
            item.innerHTML = `
                <div class="playlist-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                </div>
                <div class="playlist-item-info">
                    <span class="playlist-item-title">${track.title}</span>
                    <span class="playlist-item-artist">${track.artist}</span>
                </div>
            `;
            item.addEventListener('click', () => {
                this.loadTrack(index);
                this.audio.play().catch(e => console.error("Playback failed:", e));
                this.isPlaying = true;
                this.updatePlayPauseUI();
            });
            this.dom.playlist.appendChild(item);
        });
    },

    updatePlaylistHighlight() {
        if (!this.dom.playlist) return;
        const items = this.dom.playlist.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            if (index === this.currentTrackIndex) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    },

    loadTrack(index) {
        this.currentTrackIndex = index;
        const track = this.tracks[index];

        this.audio.src = track.url;
        this.dom.trackTitle.textContent = track.title;
        this.dom.trackArtist.textContent = track.artist;
        this.dom.albumArt.style.background = track.coverColor;

        this.updatePlayPauseUI();
        this.updatePlaylistHighlight();
    },

    togglePlay() {
        if (!this.visualizerInitialized) {
            // this.initVisualizer(); // Temporarily disabled to fix sound
        }

        // Resume AudioContext if suspended (browser policy)
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }

        this.isPlaying = !this.isPlaying;
        // localStorage.setItem('musicPlaying', this.isPlaying); // Removed persistence as per user request
        this.updatePlayPauseUI();
        this.updatePlaylistHighlight();
    },

    updatePlayPauseUI() {
        if (this.isPlaying) {
            this.dom.playIcon.style.display = 'none';
            this.dom.pauseIcon.style.display = 'block';
            this.dom.albumArt.style.animationPlayState = 'running';
        } else {
            this.dom.playIcon.style.display = 'block';
            this.dom.pauseIcon.style.display = 'none';
            this.dom.albumArt.style.animationPlayState = 'paused';
        }
    },

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        this.audio.volume = this.volume;

        // Sync sliders
        if (this.dom.volumeSlider) {
            this.dom.volumeSlider.value = this.volume * 100;
        }

        localStorage.setItem('musicVolume', this.volume); // Save volume
    },

    prevTrack() {
        this.currentTrackIndex--;
        if (this.currentTrackIndex < 0) {
            this.currentTrackIndex = this.tracks.length - 1;
        }
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) this.audio.play();
    },

    nextTrack() {
        this.currentTrackIndex++;
        if (this.currentTrackIndex >= this.tracks.length) {
            this.currentTrackIndex = 0;
        }
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) this.audio.play();
    },

    updateProgress() {
        const { currentTime, duration } = this.audio;
        const progressPercent = (currentTime / duration) * 100;
        this.dom.progressFill.style.width = `${progressPercent}%`;
        this.dom.currentTime.textContent = this.formatTime(currentTime);
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    initVisualizer() {
        if (this.visualizerInitialized) return;

        // Initialize Audio Context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();

        // Create Analyser
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;

        // Connect Source
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.visualizerInitialized = true;
        this.renderVisualizer();
    },

    renderVisualizer() {
        const canvas = this.dom.canvas;
        const ctx = canvas.getContext('2d');
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Resize canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const renderFrame = () => {
            this.animationId = requestAnimationFrame(renderFrame);

            if (!this.isPlaying) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            this.analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            // Get theme colors
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] * 1.5; // Scale height

                // Create gradient based on theme
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
                if (isDark) {
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)'); // Purple
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)'); // Light Purple
                } else {
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)');
                }

                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        };

        renderFrame();

        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
};

// Initialize Music Player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    musicPlayer.init();
});


// ================================================
// FEATURE 1: SCROLL PROGRESS BAR
// ================================================
const scrollProgressBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = progress + '%';
}, { passive: true });


// ================================================
// FEATURE 2: SCROLL TO TOP BUTTON
// ================================================
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}, { passive: true });
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ================================================
// FEATURE 3: DYNAMIC PROJECT FILTERING
// ================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const allProjectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        allProjectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


// ================================================
// FEATURE 4: GITHUB ACTIVITY INTEGRATION
// ================================================
async function loadGitHubStats() {
    const username = 'Antu69-web';
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
        ]);

        if (userRes.ok) {
            const user = await userRes.json();
            document.getElementById('ghRepos').textContent = `${user.public_repos} Repos`;
            document.getElementById('ghFollowers').textContent = `${user.followers} Followers`;
        }

        if (reposRes.ok) {
            const repos = await reposRes.json();
            const container = document.getElementById('ghRecentRepos');
            container.innerHTML = '';
            repos.slice(0, 4).forEach(repo => {
                const chip = document.createElement('a');
                chip.className = 'repo-chip';
                chip.href = repo.html_url;
                chip.target = '_blank';
                chip.rel = 'noopener noreferrer';
                chip.textContent = repo.name;
                container.appendChild(chip);
            });
        }
    } catch (err) {
        // Graceful fallback – strip stays but shows static info
        document.getElementById('ghRepos').textContent = 'View Repos';
        document.getElementById('ghFollowers').textContent = 'Follow';
        document.getElementById('ghRecentRepos').innerHTML =
            '<a class="repo-chip" href="https://github.com/Antu69-web" target="_blank" rel="noopener noreferrer">GitHub Profile</a>';
    }
}
loadGitHubStats();


// ================================================
// FEATURE 5: TESTIMONIALS CAROUSEL
// ================================================
(function initTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    const dots = document.querySelectorAll('#testimonialsDots .dot');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    if (!track) return;

    let current = 0;
    const total = track.children.length;
    let autoplay;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAutoplay() {
        autoplay = setInterval(() => goTo(current + 1), 4500);
    }

    function resetAutoplay() {
        clearInterval(autoplay);
        startAutoplay();
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
    dots.forEach(dot => {
        dot.addEventListener('click', () => { goTo(+dot.dataset.index); resetAutoplay(); });
    });

    startAutoplay();
})();


// ================================================
// FEATURE 6: INTERACTIVE TERMINAL
// ================================================
(function initTerminal() {
    const overlay = document.getElementById('terminalOverlay');
    const terminalBtn = document.getElementById('terminalBtn');
    const closeBtn = document.getElementById('terminalClose');
    const body = document.getElementById('terminalBody');
    const input = document.getElementById('terminalInput');
    if (!overlay || !terminalBtn) return;

    function openTerminal() {
        overlay.classList.add('active');
        setTimeout(() => input.focus(), 300);
    }
    function closeTerminal() {
        overlay.classList.remove('active');
    }

    terminalBtn.addEventListener('click', openTerminal);
    closeBtn.addEventListener('click', closeTerminal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeTerminal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeTerminal();
    });

    const COMMANDS = {
        help: () => [
            '<span class="t-accent">Available commands:</span>',
            '<span class="t-output">about      — About Soumen Das</span>',
            '<span class="t-output">skills     — Tech stack & proficiency</span>',
            '<span class="t-output">projects   — Recent projects</span>',
            '<span class="t-output">education  — Academic background</span>',
            '<span class="t-output">research   — Research highlights</span>',
            '<span class="t-output">contact    — Contact information</span>',
            '<span class="t-output">github     — Open GitHub profile</span>',
            '<span class="t-output">whoami     — Who is using this terminal?</span>',
            '<span class="t-output">clear      — Clear terminal</span>',
            '<span class="t-output">exit       — Close this terminal</span>',
        ],
        about: () => [
            '<span class="t-accent">Soumen Das</span> — CS Undergrad at AIUB',
            '<span class="t-output">Passionate about Web Dev, ML, and UI/UX.</span>',
            '<span class="t-output">2+ years of experience, 10+ projects delivered.</span>',
            '<span class="t-output">Location: Dhaka, Bangladesh 🇧🇩</span>',
        ],
        skills: () => [
            '<span class="t-accent">Tech Stack:</span>',
            '<span class="t-output">Frontend  → HTML/CSS (95%), JS (90%), React (85%)</span>',
            '<span class="t-output">Backend   → Node.js (88%), Python (92%)</span>',
            '<span class="t-output">ML/AI     → TensorFlow (80%), PyTorch</span>',
            '<span class="t-output">Tools     → Git (90%), UI/UX Design (75%)</span>',
        ],
        projects: () => [
            '<span class="t-accent">Recent Projects:</span>',
            '<span class="t-output">[Frontend ] Portfolio Website — HTML/CSS/JS</span>',
            '<span class="t-output">[ML       ] Skin Lesion Classifier — TensorFlow</span>',
            '<span class="t-output">[Backend  ] Blog Platform API — Node.js/MongoDB</span>',
            '<span class="t-output">[FullStack] E-Commerce Platform — React/Supabase</span>',
        ],
        education: () => [
            '<span class="t-accent">Education:</span>',
            '<span class="t-output">2022–26 → BSc Computer Science, AIUB</span>',
            '<span class="t-output">2020–21 → HSC, Jaflong Valley Boarding School</span>',
            '<span class="t-output">2019–20 → SSC, Habiganj Govt High School</span>',
        ],
        research: () => [
            '<span class="t-accent">Research Interests:</span>',
            '<span class="t-output">• Machine Learning & Explainable AI (Grad-CAM)</span>',
            '<span class="t-output">• Natural Language Processing (NLP)</span>',
            '<span class="t-output">• Data Science & Big Data Analytics</span>',
        ],
        contact: () => [
            '<span class="t-accent">Contact Info:</span>',
            '<span class="t-output">Email  → soumendasantu@gmail.com</span>',
            '<span class="t-output">Phone  → +880 1790602662</span>',
            '<span class="t-output">GitHub → github.com/Antu69-web</span>',
        ],
        github: () => {
            window.open('https://github.com/Antu69-web', '_blank');
            return ['<span class="t-output">Opening GitHub profile... 🚀</span>'];
        },
        whoami: () => [
            '<span class="t-output">You are a curious visitor exploring this portfolio.</span>',
            '<span class="t-output">Welcome! Type <span class="t-accent">help</span> to learn more.</span>',
        ],
        clear: () => { body.innerHTML = ''; return []; },
        exit: () => { closeTerminal(); return []; },
    };

    function printLines(lines) {
        lines.forEach(html => {
            const div = document.createElement('div');
            div.className = 'terminal-line';
            div.innerHTML = html;
            body.appendChild(div);
        });
        body.scrollTop = body.scrollHeight;
    }

    function printCommand(cmd) {
        const div = document.createElement('div');
        div.className = 'terminal-line';
        div.innerHTML = `<span class="t-prompt">soumen@portfolio:~$</span><span class="t-text"> ${cmd}</span>`;
        body.appendChild(div);
    }

    input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const cmd = input.value.trim().toLowerCase();
        input.value = '';
        if (!cmd) return;

        printCommand(cmd);
        if (COMMANDS[cmd]) {
            const result = COMMANDS[cmd]();
            if (Array.isArray(result)) printLines(result);
        } else {
            printLines([`<span class="t-error">command not found: ${cmd}</span>`,
                '<span class="t-output">Type <span class="t-accent">help</span> for a list of commands.</span>']);
        }
    });
})();


// ================================================
// FEATURE 7: EASTER EGG — KONAMI CODE + MATRIX RAIN
// ================================================
(function initEasterEgg() {
    const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let kIdx = 0;

    const canvas = document.getElementById('matrixCanvas');
    const toast = document.getElementById('achievementToast');
    let matrixInterval = null;
    let matrixActive = false;

    document.addEventListener('keydown', e => {
        if (e.key === KONAMI[kIdx]) {
            kIdx++;
            if (kIdx === KONAMI.length) {
                kIdx = 0;
                activateMatrix();
            }
        } else {
            kIdx = (e.key === KONAMI[0]) ? 1 : 0;
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && matrixActive) deactivateMatrix();
    });

    canvas.addEventListener('click', () => { if (matrixActive) deactivateMatrix(); });

    function activateMatrix() {
        if (matrixActive) return;
        matrixActive = true;

        // Show toast
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 4000);

        // Start matrix rain
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.classList.add('active');

        const ctx = canvas.getContext('2d');
        const cols = Math.floor(canvas.width / 16);
        const drops = Array.from({ length: cols }, () => Math.random() * -100);
        const chars = '01アイウエオカキクケコABCDEFGHIJKLMNOP@#$%&*';

        matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = '14px monospace';

            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * 16, y * 16);
                drops[i] = y > canvas.height / 16 && Math.random() > 0.975 ? 0 : y + 1;
            });
        }, 40);
    }

    function deactivateMatrix() {
        matrixActive = false;
        clearInterval(matrixInterval);
        canvas.classList.remove('active');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        if (matrixActive) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
})();


// ================================================
// EXTRA 1: CURSOR SPOTLIGHT EFFECT
// ================================================
(function initCursorSpotlight() {
    const spotlight = document.getElementById('cursorSpotlight');
    if (!spotlight || window.innerWidth < 768) return;

    let visible = false;
    document.addEventListener('mousemove', e => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
        if (!visible) {
            spotlight.style.opacity = '1';
            visible = true;
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
        visible = false;
    });
})();


// ================================================
// EXTRA 2: PROJECT LIKE BUTTONS (localStorage)
// ================================================
(function initLikeButtons() {
    const likeBtns = document.querySelectorAll('.like-btn');

    likeBtns.forEach(btn => {
        const key = 'like_' + btn.dataset.project;
        const countEl = btn.querySelector('.like-count');

        // Load saved state
        let likes = parseInt(localStorage.getItem(key + '_count') || '0');
        let liked = localStorage.getItem(key + '_liked') === 'true';
        countEl.textContent = likes;
        if (liked) btn.classList.add('liked');

        btn.addEventListener('click', () => {
            if (liked) {
                liked = false;
                likes = Math.max(0, likes - 1);
                btn.classList.remove('liked');
            } else {
                liked = true;
                likes++;
                btn.classList.add('liked');
                // Heart pop animation
                btn.classList.add('pop');
                setTimeout(() => btn.classList.remove('pop'), 400);
            }
            countEl.textContent = likes;
            localStorage.setItem(key + '_count', likes);
            localStorage.setItem(key + '_liked', liked);
        });
    });
})();


// ================================================
// EXTRA 3: CLIPBOARD COPY BUTTONS (CONTACT)
// ================================================
(function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('clipboardToast');
    const toastMsg = document.getElementById('clipboardToastMsg');
    let toastTimer;

    function showClipboardToast(text) {
        toastMsg.textContent = `Copied: ${text}`;
        toast.classList.add('visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.dataset.copy;
            try {
                await navigator.clipboard.writeText(text);
            } catch {
                // Fallback for non-HTTPS
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 2000);
            showClipboardToast(text);
        });
    });
})();


// ================================================
// EXTRA 4: CONFETTI ON CONTACT FORM SUBMIT
// ================================================
(function initConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId = null;

    const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#a78bfa'];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnConfetti() {
        particles = [];
        for (let i = 0; i < 180; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.4 - canvas.height * 0.2,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                rot: Math.random() * 360,
                rotV: (Math.random() - 0.5) * 6,
                opacity: 1
            });
        }
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.rotV;
            p.vy += 0.08; // gravity
            if (p.y > canvas.height * 0.7) p.opacity -= 0.02;
            if (p.opacity <= 0) return;
            alive = true;
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        if (alive) {
            animId = requestAnimationFrame(drawConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            animId = null;
        }
    }

    // Listen for successful contact form submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            if (animId) cancelAnimationFrame(animId);
            spawnConfetti();
            drawConfetti();
        });
    }
})();

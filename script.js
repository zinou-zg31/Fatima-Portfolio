const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

// Active lien au clic
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Active lien au scroll
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


 // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            this.reset();
        });


// Gestion du clic sur la vidéo pour lecture
  document.querySelectorAll('.reel-card').forEach((card) => {
    const video = card.querySelector('video');
    const playOverlay = card.querySelector('.play-overlay');
    const progressFill = card.querySelector('.progress-fill');
    const progressBar = card.querySelector('.progress-bar');
    const soundBtn = card.querySelector('.sound-btn');
    const mutedIcon = card.querySelector('.muted');
    const unmutedIcon = card.querySelector('.unmuted');
    
    // Clic pour lancer la vidéo
    card.addEventListener('click', (e) => {
      // Éviter le clic si on clique sur les contrôles ou la barre de progression
      if (e.target.closest('.video-controls') || e.target.closest('.progress-bar')) return;
      
      if (video.paused) {
        video.play();
        playOverlay.classList.add('hidden');
        // Activer le son automatiquement quand on lance la vidéo
        video.muted = false;
        mutedIcon.style.display = 'none';
        unmutedIcon.style.display = 'block';
      } else {
        video.pause();
        playOverlay.classList.remove('hidden');
      }
    });
    
    // Masquer/afficher l'overlay selon l'état de la vidéo
    video.addEventListener('play', () => {
      playOverlay.classList.add('hidden');
    });
    
    video.addEventListener('pause', () => {
      playOverlay.classList.remove('hidden');
    });
    
    // Mise à jour de la barre de progression
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = progress + '%';
      }
    });
    
    // Reset de la barre de progression quand la vidéo se termine
    video.addEventListener('ended', () => {
      progressFill.style.width = '0%';
    });

    // Clic sur la barre de progression pour naviguer dans la vidéo
    progressBar.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progressPercent = clickX / rect.width;
      const newTime = progressPercent * video.duration;
      
      if (!isNaN(newTime)) {
        video.currentTime = newTime;
      }
    });

    // Gestion du bouton muet/son
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (video.muted) {
        video.muted = false;
        mutedIcon.style.display = 'none';
        unmutedIcon.style.display = 'block';
      } else {
        video.muted = true;
        mutedIcon.style.display = 'block';
        unmutedIcon.style.display = 'none';
      }
    });
  });        
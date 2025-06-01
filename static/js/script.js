// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.classList.add(savedTheme);

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-controls') && !e.target.closest('.nav-links')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close menu on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Typing Effect
const typingHeadline = document.getElementById('typing-headline');
const words = ["Crafting Digital Experiences", "Building Scalable Solutions", "Creating User-Centric Apps"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
        typingHeadline.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typingHeadline.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 150);
}

// Initialize typing effect
typeEffect();

// Skills Data
const skillsData = [
    { icon: 'fa-code', title: 'Frontend', description: 'React, Vue, HTML5, CSS3, JavaScript' },
    { icon: 'fa-server', title: 'Backend', description: 'Node.js, Python, REST APIs, Flask' },
    { icon: 'fa-mobile-screen', title: 'Mobile', description: 'Flutter, Native Android/iOS' },
    { icon: 'fa-palette', title: 'Design', description: 'UI/UX, Figma, Prototyping, Wireframing' },
    { icon: 'fa-cloud', title: 'DevOps', description: 'Docker, AWS, Kubernetes, Terraform' },
    { icon: 'fa-database', title: 'Databases', description: 'PostgreSQL, MySQL, Firebase' }
];

// Generate Skills Grid
const skillsGrid = document.querySelector('.skills-grid');
skillsData.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.innerHTML = `
        <i class="fa-solid ${skill.icon} skill-icon"></i>
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
    `;
    skillsGrid.appendChild(skillCard);
});

// Projects Data
const projects = [
    {
        title: "E-Commerce Platform",
        image: "./static/images/gym.jpg",
        description: "E-commerce Website for a Gym",
        tags: ["Html", "Css", "JavaScript", "Flask"],
        link: "#"
    },
    {
        title: "Beauty Website",
        image: "./static/images/efimond.jpg",
        description: "A clean and responsive website for a beauty care",
        tags: ["Html", "css", "JavaScript"],
        link: "https://efimond.netlify.app/"
    },
    {
        title: "Health Tracking App",
        image: "./static/images/health.png",
        description: "Mobile-first health monitoring system with IoT integration",
        tags: ["Flutter", "Firebase", "AWS IoT", "GraphQL"],
        link: "#"
    },
    {
        title: "CRM Solution",
        image: "./static/images/Crm.png",
        description: "Enterprise customer relationship management platform",
        tags: ["React", "NestJS", "PostgreSQL"],
        link: "#"
    }
];

// Projects Carousel
const carouselTrack = document.querySelector('.carousel-track');
let currentSlide = 0;
let autoSlideInterval;

function initializeCarousel() {
    carouselTrack.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image-container">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <a href="${project.link}" class="cta-button">View Project</a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <p>${project.description}</p>
            </div>
        `;
        carouselTrack.appendChild(card);
    });
}

function updateCarousel() {
    const slideWidth = carouselTrack.children[0].offsetWidth;
    carouselTrack.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % projects.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = Math.max(currentSlide - 1, 0);
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

document.querySelector('.carousel-prev').addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    prevSlide();
    startAutoSlide();
});

document.querySelector('.carousel-next').addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    nextSlide();
    startAutoSlide();
});

// Testimonials Data
const testimonials = [
    {
        name: "Sister Efia",
        role: "CEO @ Efimond Beauty Solutions",
        text: "Exceptional work! Delivered my project ahead of schedule while maintaining the highest quality standards.",
        rating: 5,
        image: "./static/images/efia.jpg"
    },
    {
        name: "T-Monor",
        role: "CEO @ TMonor Perfect Collections",
        text: "The most reliable developer i worked with. Technical expertise combined with great communication skills.",
        rating: 5,
        image: "./static/images/monor.jpg"
    },
    {
        name: "Master Jefferson",
        role: "Head Master @ Peace Preparatory School",
        text: "Transformed our vision into reality with pixel-perfect execution. Highly recommended!",
        rating: 5,
        image: "./static/images/head.png"
    }
];

// Testimonials Carousel
const testimonialContainer = document.querySelector('.carousel-container');
let currentTestimonial = 0;
let testimonialInterval;

function createTestimonialCards() {
    testimonialContainer.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <div class="testimonial-rating">
                ${'★'.repeat(testimonial.rating)}
            </div>
            <h3>${testimonial.name}</h3>
            <p>${testimonial.role}</p>
            <p>"${testimonial.text}"</p>
        `;
        testimonialContainer.appendChild(card);
    });
}

function showTestimonial(index) {
    const cardWidth = testimonialContainer.children[0].offsetWidth;
    testimonialContainer.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
    });
}

function startTestimonialCarousel() {
    testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

document.querySelector('.testimonial-carousel .carousel-prev').addEventListener('click', () => {
    clearInterval(testimonialInterval);
    currentTestimonial = Math.max(currentTestimonial - 1, 0);
    showTestimonial(currentTestimonial);
    startTestimonialCarousel();
});

document.querySelector('.testimonial-carousel .carousel-next').addEventListener('click', () => {
    clearInterval(testimonialInterval);
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
    startTestimonialCarousel();
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    try {
        submitButton.classList.add('loading');
        formStatus.classList.remove('visible', 'success', 'error');

        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showFormStatus('Message sent successfully!', 'success');
            contactForm.reset();
            resetFormLabels();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Submission failed');
        }
    } catch (error) {
        console.error('Form error:', error);
        showFormStatus(`Error: ${error.message}`, 'error');
    } finally {
        submitButton.classList.remove('loading');
    }
});

function showFormStatus(message, type = 'success') {
    formStatus.textContent = message;
    formStatus.classList.add('visible', type);
    setTimeout(() => {
        formStatus.classList.remove('visible');
    }, 5000);
}

function resetFormLabels() {
    document.querySelectorAll('.form-group label').forEach(label => {
        label.style.transform = '';
        label.style.background = '';
    });
}

// Smooth Scroll
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

// Resume Download Tracking
document.querySelector('.cta-button.resume').addEventListener('click', () => {
    console.log('Resume downloaded');
    // Add analytics tracking here
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    updateCarousel();
    startAutoSlide();
    createTestimonialCards();
    startTestimonialCarousel();
});

// CTA Button Hover Effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

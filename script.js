// Custom Navbar Dropdown Responsive Script

document.addEventListener('DOMContentLoaded', function() {
  // Only enable hover for dropdowns on desktop
  if (window.innerWidth >= 992) {
    document.querySelectorAll('.navbar .dropdown').forEach(function(dropdown) {
      dropdown.addEventListener('mouseenter', function() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('show');
      });
      dropdown.addEventListener('mouseleave', function() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      });
    });
  } else {
    // On mobile, close other dropdowns when one is opened
    document.querySelectorAll('.navbar .dropdown-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.dropdown');
        const menu = parent.querySelector('.dropdown-menu');
        // Close all other open dropdowns
        document.querySelectorAll('.navbar .dropdown-menu').forEach(function(m) {
          if (m !== menu) m.classList.remove('show');
        });
        // Toggle current
        menu.classList.toggle('show');
      });
    });
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar .dropdown')) {
        document.querySelectorAll('.navbar .dropdown-menu').forEach(function(m) {
          m.classList.remove('show');
        });
      }
    });
  }
});

// --- Begin moved scripts from index.html ---
// (All JS from <script> blocks in index.html goes here, organized by section)
// --- End moved scripts from index.html ---

document.addEventListener('DOMContentLoaded', function() {
  // Sticky navbar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
          navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
          navbar.style.backgroundColor = 'var(--darker-bg)';
          navbar.style.boxShadow = 'none';
      }
  });
  
  // Initialize Bootstrap carousel
  const heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
      interval: 5000,
      wrap: true,
      keyboard: true,
      pause: 'hover'
  });
  
  // Create animated digital lines and dots
  const digitalLinesContainer = document.getElementById('digitalLines');
  if (digitalLinesContainer) {
      // Create dots
      for (let i = 0; i < 50; i++) {
          const dot = document.createElement('div');
          dot.classList.add('digital-dot');
          dot.style.left = `${Math.random() * 100}%`;
          dot.style.top = `${Math.random() * 100}%`;
          dot.style.animationDelay = `${Math.random() * 3}s`;
          digitalLinesContainer.appendChild(dot);
      }
  }
  
  // Insights Carousel
  const insightsCarousel = document.getElementById('insights-carousel');
  const insightsPrev = document.getElementById('insights-prev');
  const insightsNext = document.getElementById('insights-next');
  const insightsDots = document.querySelectorAll('.insights-dot');
  
  let currentSlide = 0;
  const totalSlides = 3;
  
  // Function to update carousel position
  function updateCarouselPosition() {
      insightsCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      insightsDots.forEach((dot, index) => {
          if (index === currentSlide) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }
  
  // Click event for previous button
  insightsPrev.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarouselPosition();
  });
  
  // Click event for next button
  insightsNext.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarouselPosition();
  });
  
  // Click event for pagination dots
  insightsDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentSlide = index;
          updateCarouselPosition();
      });
  });
  
  // Section navigation
  document.querySelectorAll('.section-nav a').forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
              const headerOffset = 100; // Account for fixed header
              const elementPosition = targetSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Award logo hover effect
  document.querySelectorAll('.award-container').forEach(container => {
      const link = container.querySelector('.award-link');
      
      container.addEventListener('mouseenter', function() {
          link.classList.add('active');
      });
      
      container.addEventListener('mouseleave', function() {
          link.classList.remove('active');
      });
  });
  
  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          let isValid = true;
          const inputs = contactForm.querySelectorAll('input, textarea');
          
          inputs.forEach(input => {
              if (input.hasAttribute('required') && !input.value.trim()) {
                  input.classList.add('is-invalid');
                  isValid = false;
              } else if (input.type === 'email' && input.value.trim()) {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(input.value.trim())) {
                      input.classList.add('is-invalid');
                      isValid = false;
                  } else {
                      input.classList.remove('is-invalid');
                  }
              } else {
                  input.classList.remove('is-invalid');
              }
          });
          
          if (isValid) {
              // Form is valid, you can submit it
              alert('Form submitted successfully!');
              contactForm.reset();
          }
      });
      
      // Clear validation on input
      contactForm.querySelectorAll('input, textarea').forEach(input => {
          input.addEventListener('input', function() {
              this.classList.remove('is-invalid');
          });
      });
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const flipCard = document.getElementById('flipCard');
  const steps = document.querySelectorAll('.step');
  const totalSteps = steps.length;
  let currentStep = 0;
  
  // Initialize - show first step
  steps.forEach((step, index) => {
      if(index === 0) {
          step.style.opacity = '1';
          step.style.transform = 'rotateX(0)';
      } else {
          step.style.opacity = '0';
          step.style.transform = 'rotateX(-90deg)';
      }
  });
  
  function rotateStep() {
      // Get current and next step
      const current = steps[currentStep];
      const nextStep = (currentStep + 1) % totalSteps;
      const next = steps[nextStep];
      
      // Add animation class to current step
      current.classList.add('flip-animation');
      
      // After animation completes
      setTimeout(() => {
          current.style.opacity = '0';
          current.style.transform = 'rotateX(-90deg)';
          current.classList.remove('flip-animation');
          
          // Show next step
          next.style.opacity = '1';
          next.style.transform = 'rotateX(0)';
          
          // Update current step
          currentStep = nextStep;
      }, 800); // Match this with animation duration
  }
  
  // Auto-rotate every 3 seconds
  let interval = setInterval(rotateStep, 3000);
  
  // Pause on hover
  flipCard.addEventListener('mouseenter', () => {
      clearInterval(interval);
  });
  
  flipCard.addEventListener('mouseleave', () => {
      interval = setInterval(rotateStep, 3000);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Enable hover for dropdowns on desktop
  if (window.innerWidth >= 992) {
    document.querySelectorAll('.navbar .dropdown').forEach(function(dropdown) {
      dropdown.addEventListener('mouseenter', function() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('show');
      });
      dropdown.addEventListener('mouseleave', function() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      });
    });
  }
});
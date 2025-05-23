document.addEventListener('DOMContentLoaded', function() {
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
    document.querySelectorAll('.navbar .dropdown-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.dropdown');
        const menu = parent.querySelector('.dropdown-menu');
        document.querySelectorAll('.navbar .dropdown-menu').forEach(function(m) {
          if (m !== menu) m.classList.remove('show');
        });
        menu.classList.toggle('show');
      });
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar .dropdown')) {
        document.querySelectorAll('.navbar .dropdown-menu').forEach(function(m) {
          m.classList.remove('show');
        });
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
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
  
  const heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
      interval: 5000,
      wrap: true,
      keyboard: true,
      pause: 'hover'
  });
  
  const digitalLinesContainer = document.getElementById('digitalLines');
  if (digitalLinesContainer) {
      for (let i = 0; i < 50; i++) {
          const dot = document.createElement('div');
          dot.classList.add('digital-dot');
          dot.style.left = `${Math.random() * 100}%`;
          dot.style.top = `${Math.random() * 100}%`;
          dot.style.animationDelay = `${Math.random() * 3}s`;
          digitalLinesContainer.appendChild(dot);
      }
  }
  
  const insightsCarousel = document.getElementById('insights-carousel');
  const insightsPrev = document.getElementById('insights-prev');
  const insightsNext = document.getElementById('insights-next');
  const insightsDots = document.querySelectorAll('.insights-dot');
  
  let currentSlide = 0;
  const totalSlides = 3;
  
  function updateCarouselPosition() {
      insightsCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      insightsDots.forEach((dot, index) => {
          if (index === currentSlide) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }
  
  insightsPrev.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarouselPosition();
  });
  
  insightsNext.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarouselPosition();
  });
  
  insightsDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentSlide = index;
          updateCarouselPosition();
      });
  });
  
  document.querySelectorAll('.section-nav a').forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
              const headerOffset = 100; 
              const elementPosition = targetSection.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              
              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  document.querySelectorAll('.award-container').forEach(container => {
      const link = container.querySelector('.award-link');
      
      container.addEventListener('mouseenter', function() {
          link.classList.add('active');
      });
      
      container.addEventListener('mouseleave', function() {
          link.classList.remove('active');
      });
  });
  
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
              alert('Form submitted successfully!');
              contactForm.reset();
          }
      });
      
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
      const current = steps[currentStep];
      const nextStep = (currentStep + 1) % totalSteps;
      const next = steps[nextStep];
      
      current.classList.add('flip-animation');
      
      setTimeout(() => {
          current.style.opacity = '0';
          current.style.transform = 'rotateX(-90deg)';
          current.classList.remove('flip-animation');
          
          next.style.opacity = '1';
          next.style.transform = 'rotateX(0)';
          currentStep = nextStep;
      }, 800);
  }
  
  let interval = setInterval(rotateStep, 3000);
  
  flipCard.addEventListener('mouseenter', () => {
      clearInterval(interval);
  });
  
  flipCard.addEventListener('mouseleave', () => {
      interval = setInterval(rotateStep, 3000);
  });
});

document.addEventListener('DOMContentLoaded', function() {
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
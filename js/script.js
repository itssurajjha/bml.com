// Navigation
document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  // Show home section by default
  document.getElementById('home').classList.add('active');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      
      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show target section
      document.getElementById(targetId).classList.add('active');
      
      // Update URL
      window.location.hash = targetId;
      
      // Scroll to top
      window.scrollTo(0, 0);
    });
  });
  
  // Check URL hash on page load
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    if (document.getElementById(targetId)) {
      sections.forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(targetId).classList.add('active');
    }
  }

  // Hero Slideshow
  let slides = document.querySelectorAll(".slide");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  // Auto-slide every 5s
  setInterval(nextSlide, 5000);

  // Gallery Lightbox
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");

  if (gallery) {
    gallery.querySelectorAll("img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.dataset.full || img.src;
        lightbox.classList.add("visible");
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
      });
    });
  }

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("visible");
    document.body.style.overflow = ''; // Re-enable scrolling
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.remove("visible");
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  });

  // Quote Form Submission
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      const securityNeeds = document.getElementById('securityNeeds').value;
      const peopleNeeded = document.getElementById('peopleNeeded').value;
      const urgency = document.getElementById('urgency').value;
      const fullName = document.getElementById('fullName').value;
      const workEmail = document.getElementById('workEmail').value;
      const mobile = document.getElementById('mobile').value;
      
      if (!securityNeeds || !peopleNeeded || !urgency || !fullName || !workEmail || !mobile) {
        alert('Please fill all required fields');
        return;
      }
      
      // Create form data object
      const formData = {
        securityNeeds,
        peopleNeeded,
        urgency,
        fullName,
        workEmail,
        organization: document.getElementById('organization').value,
        mobile,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
      };
      
      // In a real application, you would send this data to a server
      // For demonstration, we'll simulate saving to a folder
      fetch('/save-quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
.then(res => res.json())
.then(data => {
  alert(data.message);
  quoteForm.reset();
})
.catch(err => console.error('Error saving form:', err));

      
      // Simulate saving data (in a real app, this would be a server request)
      alert('Thank you for your inquiry! We will contact you shortly.');
      quoteForm.reset();
    });
  }
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form validation
      const contactName = document.getElementById('contactName').value;
      const contactEmail = document.getElementById('contactEmail').value;
      const contactMessage = document.getElementById('contactMessage').value;
      
      if (!contactName || !contactEmail || !contactMessage) {
        alert('Please fill all required fields');
        return;
      }
      
      // Create form data object
      const formData = {
        contactName,
        contactEmail,
        contactSubject: document.getElementById('contactSubject').value,
        contactMessage,
        timestamp: new Date().toISOString()
      };
      
      // In a real application, you would send this data to a server
      fetch('/save-quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
.then(res => res.json())
.then(data => {
  alert(data.message);
  quoteForm.reset();
})
.catch(err => console.error('Error saving form:', err));

      
      // Simulate saving data
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
});


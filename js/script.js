// Initialize app functionality
(function() {
  // Application initialization
  console.log('Portfolio application initialized');
})();

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize status bars
  initStatusBars();
  
  // Setup navigation
  setupNavigation();
  
  // Setup notification system
  setupNotifications();
  
  // Setup chat typing effect
  setupChatTypingEffect();
  
  // Setup glitch text effect
  setupGlitchText();
  
  // Setup contact info
  setupContactInfo();
  
  // Setup dialog buttons
  setupDialogButtons();
  
  // Initialize skill bars with animation
  animateSkillBars();
});

// Status bars
function initStatusBars() {
  const caffeineBar = document.getElementById('caffeine-bar');
  const mentalBar = document.getElementById('mental-bar');
  const codeBar = document.getElementById('code-bar');
  const caffeineValue = document.getElementById('caffeine-value');
  const mentalValue = document.getElementById('mental-value');
  const codeValue = document.getElementById('code-value');
  
  let caffeine = 78;
  let mental = 45;
  let code = 92;
  
  // Set initial values
  updateStatusBar(caffeineBar, caffeineValue, caffeine);
  updateStatusBar(mentalBar, mentalValue, mental);
  updateStatusBar(codeBar, codeValue, code);
  
  // Fluctuate values randomly
  setInterval(() => {
    caffeine = Math.min(100, Math.max(30, caffeine + (Math.random() * 6 - 3)));
    mental = Math.min(100, Math.max(20, mental + (Math.random() * 8 - 4)));
    code = Math.min(100, Math.max(50, code + (Math.random() * 4 - 2)));
    
    updateStatusBar(caffeineBar, caffeineValue, caffeine);
    updateStatusBar(mentalBar, mentalValue, mental);
    updateStatusBar(codeBar, codeValue, code);
  }, 3000);
}

function updateStatusBar(bar, valueElement, value) {
  const roundedValue = Math.round(value);
  bar.style.width = `${roundedValue}%`;
  valueElement.textContent = `${roundedValue}%`;
}

// Navigation
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');
  const scrollToAbout = document.getElementById('scroll-to-about');
  
  // Handle navigation click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetPage = item.getAttribute('data-page');
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('nav-active'));
      item.classList.add('nav-active');
      
      // Update sections visibility
      sections.forEach(section => {
        section.style.display = 'none';
        if (section.id === targetPage) {
          section.style.display = 'block';
        }
      });
      
      // Scroll to top
      window.scrollTo(0, 0);
    });
  });
  
  // Scroll down button on home page
  if (scrollToAbout) {
    scrollToAbout.addEventListener('click', () => {
      // Show about section
      sections.forEach(section => {
        section.style.display = 'none';
        if (section.id === 'about') {
          section.style.display = 'block';
        }
      });
      
      // Update nav active state
      navItems.forEach(nav => {
        nav.classList.remove('nav-active');
        if (nav.getAttribute('data-page') === 'about') {
          nav.classList.add('nav-active');
        }
      });
      
      // Scroll to top
      window.scrollTo(0, 0);
    });
  }
  
  // Set initial active based on URL hash or default to home
  const hash = window.location.hash ? window.location.hash.substring(1) : 'home';
  navItems.forEach(nav => {
    if (nav.getAttribute('data-page') === hash) {
      nav.click();
    }
  });
}

// Notification system
function setupNotifications() {
  const container = document.getElementById('notification-container');
  const messages = [
    "🔔 New follower!",
    "💬 Message received!",
    "⭐ Project liked!",
    "📁 File uploaded!",
    "⚠️ Warning: Caffeine low!",
    "🎮 Achievement unlocked!",
    "👾 Debug complete!",
    "🖥️ Code compiled!",
    "📱 Mobile responsive!",
    "🕹️ Game over!",
    "💕 Crush online!"
  ];
  
  const colors = ['pink', 'purple', 'turquoise', 'blue'];
  
  // Show initial notification after a short delay
  setTimeout(() => {
    showRandomNotification();
  }, 2000);
  
  // Show random notifications periodically
  setInterval(() => {
    showRandomNotification();
  }, randomDelay(8000, 15000));
  
  function showRandomNotification() {
    const message = getRandomElement(messages);
    const color = getRandomElement(colors);
    showNotification(message, color);
  }
  
  function showNotification(message, color) {
    const notificationId = Math.random().toString(36).substring(2, 9);
    const notification = document.createElement('div');
    notification.className = `notification notification-${color}`;
    notification.style.backgroundColor = `rgba(var(--neon-${color}), 0.2)`;
    notification.style.borderColor = `var(--neon-${color})`;
    notification.style.color = `var(--neon-${color})`;
    notification.textContent = message;
    notification.id = `notification-${notificationId}`;
    
    // Add click event to dismiss
    notification.addEventListener('click', () => {
      removeNotification(notificationId);
    });
    
    container.appendChild(notification);
    
    // Auto dismiss after delay
    setTimeout(() => {
      removeNotification(notificationId);
    }, 3000);
  }
  
  function removeNotification(id) {
    const notification = document.getElementById(`notification-${id}`);
    if (notification) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      
      // Remove from DOM after animation
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }
}

// Chat typing effect
function setupChatTypingEffect() {
  const typingBubble = document.querySelector('.typing-bubble');
  if (!typingBubble) return;
  
  const typingText = typingBubble.querySelector('.typing-text');
  const finalText = "Browse my portfolio";
  let currentIndex = 0;
  
  // Hide text initially
  typingText.textContent = '';
  
  // Start typing after a delay
  setTimeout(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < finalText.length) {
        typingText.textContent += finalText.charAt(currentIndex);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, randomDelay(50, 150));
  }, 1000);
}

// Glitch text effect
function setupGlitchText() {
  const glitchElements = document.querySelectorAll('.glitch-text');
  
  glitchElements.forEach(element => {
    // Store the text content
    const text = element.textContent;
    element.setAttribute('data-text', text);
  });
}

// Contact info
function setupContactInfo() {
  const contactItems = document.querySelectorAll('.contact-item');
  
  // Add hover effects and interactions to contact items
  contactItems.forEach(item => {
    // Add click event to copy email or username
    const contactLink = item.querySelector('.contact-link');
    const contactValue = item.querySelector('.contact-value');
    
    if (contactLink || contactValue) {
      const element = contactLink || contactValue;
      const text = element.textContent;
      
      // Show tooltip on hover for copyable content
      item.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'contact-tooltip';
        tooltip.textContent = 'Click to copy';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '3px 8px';
        tooltip.style.borderRadius = '3px';
        tooltip.style.fontSize = '12px';
        tooltip.style.top = '0';
        tooltip.style.right = '0';
        tooltip.style.transform = 'translateY(-100%)';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';
        
        item.style.position = 'relative';
        item.appendChild(tooltip);
        
        setTimeout(() => {
          tooltip.style.opacity = '1';
        }, 300);
      });
      
      // Remove tooltip on leave
      item.addEventListener('mouseleave', () => {
        const tooltip = item.querySelector('.contact-tooltip');
        if (tooltip) {
          tooltip.style.opacity = '0';
          setTimeout(() => {
            if (tooltip.parentNode === item) {
              item.removeChild(tooltip);
            }
          }, 300);
        }
      });
      
      // Copy value on click
      element.addEventListener('click', (e) => {
        // Prevent following href if it's a link
        if (contactLink) {
          e.preventDefault();
        }
        
        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
          showNotification('Copied to clipboard!', 'turquoise');
        }).catch(err => {
          console.error('Could not copy text: ', err);
          showNotification('Failed to copy text', 'pink');
        });
      });
    }
  });
  
  function showNotification(message, color) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification notification-${color}`;
    notification.style.backgroundColor = `rgba(var(--neon-${color}), 0.2)`;
    notification.style.borderColor = `var(--neon-${color})`;
    notification.style.color = `var(--neon-${color})`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Dialog buttons
function setupDialogButtons() {
  const dialog = document.getElementById('system-dialog');
  const yesButton = document.getElementById('dialog-yes');
  const noButton = document.getElementById('dialog-no');
  
  if (!dialog || !yesButton || !noButton) return;
  
  yesButton.addEventListener('click', () => {
    dialog.style.display = 'none';
  });
  
  noButton.addEventListener('click', () => {
    dialog.style.display = 'none';
  });
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-fill');
  
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width || bar.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
    }, 100 * (index + 1));
  });
}

// Utility functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
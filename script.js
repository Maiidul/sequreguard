// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Mobile menu toggle
const createMobileMenu = () => {
  const header = document.querySelector('.header-wrap');
  const nav = document.querySelector('.main-nav');
  
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.classList.add('mobile-menu-toggle');
  mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
  
  header.insertBefore(mobileMenuButton, nav);
  
  mobileMenuButton.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
  });
};

// Initialize mobile menu
if (window.innerWidth <= 768) {
  createMobileMenu();
}

// Insurance Calculator
function calculatePremium() {
  const type = document.getElementById('insuranceType').value;
  const age = parseInt(document.getElementById('age').value);
  const coverage = parseInt(document.getElementById('coverage').value);
  
  if (!type || !age || !coverage) {
    alert('Please fill in all fields');
    return;
  }
  
  let basePremium = 0;
  
  switch(type) {
    case 'life':
      basePremium = (coverage * 0.001) + (age * 0.1);
      break;
    case 'health':
      basePremium = (coverage * 0.002) + (age * 0.2);
      break;
    case 'property':
      basePremium = coverage * 0.003;
      break;
    case 'auto':
      basePremium = coverage * 0.004;
      break;
  }
  
  const premiumDisplay = document.querySelector('.premium-amount');
  premiumDisplay.textContent = `$${Math.round(basePremium).toLocaleString()}`;
  
  // Animate the number
  premiumDisplay.classList.add('highlight');
  setTimeout(() => premiumDisplay.classList.remove('highlight'), 1000);
}

// Service Details Modal
function showServiceDetails(service) {
  const serviceDetails = {
    life: {
      title: 'Life Insurance',
      description: 'Our life insurance plans provide financial security for your loved ones...',
      features: ['Term Life', 'Whole Life', 'Universal Life', '24/7 Support']
    },
    health: {
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for individuals and families...',
      features: ['Medical', 'Dental', 'Vision', 'Prescription']
    },
    property: {
      title: 'Property Insurance',
      description: 'Protect your home and belongings with our property insurance...',
      features: ['Home', 'Rental', 'Natural Disasters', 'Personal Property']
    },
    auto: {
      title: 'Auto Insurance',
      description: 'Complete protection for your vehicles...',
      features: ['Collision', 'Comprehensive', 'Liability', 'Roadside Assistance']
    }
  };
  
  const details = serviceDetails[service];
  alert(`${details.title}\n\n${details.description}\n\nKey Features:\n${details.features.join('\n')}`);
}

// Plan Selection
function selectPlan(plan) {
  const plans = {
    basic: 49,
    premium: 99,
    ultimate: 149
  };
  
  document.getElementById('insuranceType').value = 'life';
  document.getElementById('coverage').value = plans[plan] * 1000;
  document.getElementById('age').value = 30;
  
  document.querySelector('#coverage').scrollIntoView({ behavior: 'smooth' });
}

// About Section Tabs
document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      
      // Reinitialize AOS for new content
      AOS.refresh();
    });
  });
  
  // Enhanced Statistics Animation
  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const count = parseInt(stat.innerText);
      const increment = target / 50;
      
      if (count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(animateStats, 30);
      } else {
        stat.innerText = target;
      }
    });
  };
  
  // Trigger stats animation when in viewport
  const statsSection = document.querySelector('#stats');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
      }
    });
  });
  
  if (statsSection) {
    observer.observe(statsSection);
  }
});
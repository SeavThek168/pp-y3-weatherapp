<template>
  <div class="app-container">
    <nav class="premium-navbar" :class="{'scrolled': isScrolled}">
      <div class="navbar-container">
        <!-- Logo and brand section -->
        <router-link class="navbar-brand" to="/">
          <div class="brand-icon-wrapper">
            <i class="fas fa-cloud-sun navbar-logo"></i>
          </div>
          <span class="brand-text">
            Weather<span class="brand-accent">App</span>
            <span class="brand-tagline">Live Weather Intelligence</span>
          </span>
        </router-link>

        <!-- Mobile menu button -->
        <button class="navbar-toggler" type="button" @click="toggleMenu" aria-label="Toggle navigation">
          <div class="hamburger" :class="{'is-active': menuActive}">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <!-- Navigation links -->
        <div class="navbar-menu" :class="{ 'menu-active': menuActive }">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/" @click="closeMenu">
                <i class="fas fa-home me-1"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" @click="closeMenu">
                <i class="fas fa-info-circle me-1"></i> About
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="toggleTheme">
                <i class="fas" :class="[isDarkTheme ? 'fa-sun' : 'fa-moon']"></i>
                <span class="ms-1">{{ isDarkTheme ? 'Light' : 'Dark' }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Premium accent line -->
      <div class="navbar-accent-line"></div>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuActive: false,
      isScrolled: false,
      isDarkTheme: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    closeMenu() {
      this.menuActive = false;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      document.body.classList.toggle('dark-theme', this.isDarkTheme);
      localStorage.setItem('weatherAppTheme', this.isDarkTheme ? 'dark' : 'light');
    },
    initTheme() {
      // Check if user has previously set a theme preference
      const savedTheme = localStorage.getItem('weatherAppTheme');
      if (savedTheme) {
        this.isDarkTheme = savedTheme === 'dark';
        document.body.classList.toggle('dark-theme', this.isDarkTheme);
      } else {
        // Check if user prefers dark mode in their OS
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          this.isDarkTheme = true;
          document.body.classList.add('dark-theme');
        }
      }
    }
  },
  mounted() {
    // Add Font Awesome CDN
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
    document.head.appendChild(fontAwesome);
    
    // Add Google Fonts for premium look
    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(googleFonts);
    
    // Add scroll listener for navbar effects
    window.addEventListener('scroll', this.handleScroll);
    
    // Initialize theme
    this.initTheme();
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss">
/* Reset and base styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-gradient);
  transition: background 0.3s ease, color 0.3s ease;
  min-height: 100vh;
}

/* App Container */
.app-container {
  min-height: 100vh;
}

/* Premium Navbar Styles */
.premium-navbar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.4s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.premium-navbar.scrolled {
  padding: 12px 0;
  background: rgba(79, 70, 229, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.navbar-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-family: 'Poppins', sans-serif;
  position: relative;
  z-index: 2;
}

.brand-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  margin-right: 15px;
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
  transition: all 0.3s ease;
}

.premium-navbar.scrolled .brand-icon-wrapper {
  transform: scale(0.9);
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.3);
}

.navbar-logo {
  font-size: 1.6rem;
  color: #fff;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  transition: all 0.3s ease;
}

.brand-text {
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1.2;
  transition: all 0.3s ease;
}

.premium-navbar.scrolled .brand-text {
  transform: translateX(5px);
}

.brand-accent {
  color: #fcd34d; /* Yellow accent */
  position: relative;
  z-index: 1;
}

.brand-tagline {
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 4px;
  opacity: 0.85;
}

/* Fancy hamburger menu */
.navbar-toggler {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.hamburger {
  width: 30px;
  height: 24px;
  position: relative;
  transition: 0.5s ease-in-out;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: white;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.hamburger span:nth-child(1) { top: 0px; }
.hamburger span:nth-child(2) { top: 10px; }
.hamburger span:nth-child(3) { top: 20px; }

.hamburger.is-active span:nth-child(1) {
  top: 10px;
  transform: rotate(135deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.hamburger.is-active span:nth-child(3) {
  top: 10px;
  transform: rotate(-135deg);
}

/* Navigation menu */
.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item {
  margin-left: 40px;
  position: relative;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  padding: 8px 0;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.nav-link:hover, .router-link-active {
  color: #fcd34d; /* Yellow accent */
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fcd34d;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  opacity: 0;
}

.nav-link:hover::after, .router-link-active::after {
  opacity: 1;
  width: 25px;
  border-radius: 3px;
}

/* Premium accent line */
.navbar-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(252,211,77,0.8) 50%, 
    rgba(255,255,255,0) 100%);
  opacity: 0.7;
  transform: translateY(1px);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Common utility classes */
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 3rem; }

.ms-1 { margin-left: 0.25rem; }
.ms-2 { margin-left: 0.5rem; }
.me-1 { margin-right: 0.25rem; }
.me-2 { margin-right: 0.5rem; }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 1rem; }
.p-4 { padding: 1.5rem; }
.p-5 { padding: 3rem; }

.d-flex { display: flex; }
.flex-column { flex-direction: column; }
.align-items-center { align-items: center; }
.justify-content-center { justify-content: center; }
.justify-content-between { justify-content: space-between; }

.text-center { text-align: center; }
.text-primary { color: var(--accent-color); }
.text-secondary { color: var(--text-secondary); }

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0 20px;
  }
  
  .navbar-toggler {
    display: block;
  }
  
  .brand-tagline {
    display: none;
  }

  .navbar-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 300px;
    height: 100vh;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.97), rgba(124, 58, 237, 0.97));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 90px 30px 30px;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
    overflow-y: auto;
  }

  .menu-active {
    right: 0;
  }
  
  .navbar-nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-item {
    margin: 0 0 20px;
    width: 100%;
  }
  
  .nav-link {
    font-size: 1.1rem;
    padding: 12px 0;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-link::after {
    bottom: -1px;
    left: 0;
    transform: none;
    height: 2px;
    width: 0;
    border-radius: 0;
  }
  
  .nav-link:hover::after, .router-link-active::after {
    width: 30px;
    border-radius: 0;
  }
  
  /* Add overlay when menu is open */
  .menu-active::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
    animation: fadeIn 0.3s forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

/* CSS Variables for Theme Toggle */
:root {
  --bg-gradient: linear-gradient(135deg, #f0f9ff, #e0f2fe, #dbeafe);
  --header-bg: rgba(240, 249, 255, 0.85);
  --card-bg: rgba(255, 255, 255, 0.9);
  --footer-bg: rgba(255, 255, 255, 0.7);
  --text-primary: #334155;
  --text-secondary: #64748b;
  --accent-color: #6366f1;
  --border-color: rgba(203, 213, 225, 0.5);
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  --card-shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --btn-hover-bg: rgba(99, 102, 241, 0.1);
}

/* Dark theme variables */
body.dark-theme {
  --bg-gradient: linear-gradient(135deg, #0f172a, #1e293b, #334155);
  --header-bg: rgba(15, 23, 42, 0.85);
  --card-bg: rgba(30, 41, 59, 0.9);
  --footer-bg: rgba(15, 23, 42, 0.7);
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --accent-color: #818cf8;
  --border-color: rgba(51, 65, 85, 0.5);
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  --card-shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.3);
  --btn-hover-bg: rgba(129, 140, 248, 0.1);
}
</style>
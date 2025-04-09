<template>
    <nav>
      <NuxtLink to="/" class="logo-link">
        <h2>QRfort</h2>
      </NuxtLink>
      <div>
        <NuxtLink to="/qrcode/scan" class="nav-link">Scan</NuxtLink>
        <NuxtLink to="/qrcode/storage" class="nav-link">Lista</NuxtLink>
      </div>
    </nav>
  </template>
  
  <script setup></script>
  
  <style scoped>
  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: var(--spacer);
    gap: 2rem;
    font-size: 1.2rem;
    position: relative;
    height: 3.5rem; /* Adjust height slightly for better spacing */
    background-color: #1E1E1E; /* Dark background for the navbar */
    color: #FFFFFF; /* Light text color for the navbar */
  }
  
  nav::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--primary);
    width: calc(100% - 2*var(--spacer));
    height: 0.1rem;
    margin-inline: var(--spacer);
    box-shadow: 0 0 10px 1px var(--primary); /* Slightly softer shadow */
  }
  
  nav > div {
    display: flex;
    gap: 1rem;
  }
  
  .logo-link {
    text-decoration: none; /* Remove underline from logo link */
    color: inherit; /* Inherit text color from nav */
  }
  
  .nav-link {
    text-decoration: none;
    color: var(--primary); /* Use global primary color for links */
    font-weight: 500;
    padding: 0.5rem 0; /* Add some vertical padding for touch targets */
  }
  
  .nav-link:hover {
    /* You can add a subtle hover effect if you like */
    opacity: 0.8;
  }

  </style>
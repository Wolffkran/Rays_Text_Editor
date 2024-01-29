const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();
    // Wait for the user to respond
    const userChoice = await deferredPrompt.userChoice;
    // Check the user's choice
    if (userChoice.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
  // Additional logic after the app is installed
});

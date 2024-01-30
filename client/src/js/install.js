// Get the install button element
const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Function to handle the beforeinstallprompt event
const handleBeforeInstallPrompt = (event) => {
  // Prevent the default behavior
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
};

// Function to handle the PWA installation
const handleInstallButtonClick = async () => {
  if (deferredPrompt) {
    try {
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
    } catch (error) {
      console.error('Error during PWA installation:', error);
    } finally {
      // Clear the deferredPrompt variable
      deferredPrompt = null;
      // Hide the install button
      butInstall.style.display = 'none';
    }
  }
};

// Function to handle the appinstalled event
const handleAppInstalled = (event) => {
  console.log('App installed successfully');
  // Additional logic after the app is installed
};

// Add an event listener for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

// Add an event listener for the click event on the install button
butInstall.addEventListener('click', handleInstallButtonClick);

// Add an event listener for the appinstalled event
window.addEventListener('appinstalled', handleAppInstalled);

// NASA API key (use 'DEMO_KEY' for demo purposes)
const apiKey = 'DEMO_KEY';

// Fun array of 'Did You Know?' space facts
const spaceFacts = [
  "Did you know? A day on Venus is longer than a year on Venus! ☀️",
  "Did you know? Neutron stars can spin at a rate of 600 rotations per second! 🌀",
  "Did you know? Space is completely silent—there’s no air to carry sound. 🤫",
  "Did you know? The footprints on the Moon will be there for millions of years. 👣🌙",
  "Did you know? Jupiter is so big that over 1,300 Earths could fit inside it! 🪐",
  "Did you know? There are more trees on Earth than stars in the Milky Way. 🌳✨",
  "Did you know? The hottest planet in our solar system is Venus, not Mercury! 🔥",
  "Did you know? One million Earths could fit inside the Sun. ☀️",
  "Did you know? The International Space Station travels at 28,000 km/h! 🚀",
  "Did you know? Saturn’s rings are made mostly of ice and rock. 💍"
];

// Pick a random fact and display it
const factBox = document.getElementById('space-fact');
const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
factBox.textContent = randomFact;

// Get the button and add a click event listener
const button = document.querySelector('button');
button.addEventListener('click', () => {
  // Get the selected start and end dates from the input fields
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  // Get the gallery element where images will be shown
  const gallery = document.getElementById('gallery');

  // Clear any previous images or messages
  gallery.innerHTML = '';

  // Build the NASA API URL using the selected dates and API key
  const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

  // Show a fun loading message while fetching images
  gallery.innerHTML = '<p id="loading-message">🚀 Launching your space gallery… please wait!</p>';

  // Fetch data from the NASA API
  fetch(url)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Remove the loading message before showing images
      gallery.innerHTML = '';
      // If only one image is returned, wrap it in an array
      const items = Array.isArray(data) ? data : [data];
      // Loop through each item in the data
      items.forEach(item => {
        // Only show images (not videos)
        if (item.media_type === 'image') {
          // Create a new div for each image card
          const card = document.createElement('div');
          card.className = 'card';

          // Set the card's HTML using template literals
          card.innerHTML = `
            <img src="${item.url}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p><strong>${item.date}</strong></p>
          `;

          // Add click event to open modal with details
          card.addEventListener('click', () => {
            openModal(item);
          });

          // Add the card to the gallery
          gallery.appendChild(card);
        }
      });
    })
    .catch(error => {
      // Show an error message if something goes wrong
      gallery.innerHTML = '<p>Sorry, there was a problem fetching the data.</p>';
      console.error('Error fetching data:', error);
    });
});

// Modal functionality
// Get modal elements
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const modalClose = document.getElementById('modalClose');

// Function to open the modal with image details
function openModal(item) {
  modalImg.src = item.hdurl || item.url;
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;
  modal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Close modal when clicking the close button or outside modal content
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

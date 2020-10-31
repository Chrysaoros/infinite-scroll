// GLOBALS
const IMAGE_CONTAINER = document.getElementById("image-container");
const LOADER = document.getElementById("loader");

let PHOTOS_ARRAY = [];

// Unsplash API
const query = "space";
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${publicApiKey}&query=${query}&count=${count}`;

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
  let attributes = {};

  PHOTOS_ARRAY.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for a photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Add <img> to <a> element, add <a> to image-container
    item.appendChild(img);
    IMAGE_CONTAINER.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    PHOTOS_ARRAY = await response.json();

    // displayPhotos();
  } catch (error) {}
}

// On Load
// getPhotos();

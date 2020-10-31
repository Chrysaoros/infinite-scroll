// GLOBALS
const IMAGE_CONTAINER = document.getElementById("image-container");
const LOADER = document.getElementById("loader");

let totalImages = 0;
let imagesLoaded = 0;
loadMoreImages = false;
let PHOTOS_ARRAY = [];

// Unsplash API
const query = "space";
const count = 20;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${publicApiKey}&query=${query}&count=${count}`;

function countImagesLoaded() {
  imagesLoaded++;
  console.log("Image loaded");

  if (imagesLoaded === totalImages) {
    loadMoreImages = true;
    console.log("Load more images = ", loadMoreImages);

    if (!LOADER.hidden) LOADER.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
  totalImages = PHOTOS_ARRAY.length;
  console.log("Total Images got:", totalImages);

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

    // Event listener for each loaded image
    img.addEventListener("load", countImagesLoaded);

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

    displayPhotos();
  } catch (error) {}
}

//
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    loadMoreImages
  ) {
    loadMoreImages = false;
    imagesLoaded = 0;
    console.log("Loading more images...");
    getPhotos();
    // console.log("window.innerHeight:", window.innerHeight);
    // console.log("window.scrollY:", window.scrollY);
    // console.log("innerHeight + scrollY:", window.innerHeight + window.scrollY);
    // console.log("offsetHeight - 1000:", document.body.offsetHeight);
  }
});

// On Load
getPhotos();

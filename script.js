const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Create loading and error divs
const loading = document.createElement("div");
loading.id = "loading";
loading.style.display = "none";

const errorDiv = document.createElement("div");
errorDiv.id = "error";

document.body.appendChild(loading);
document.body.appendChild(errorDiv);

// Step 1: Returns a Promise for a single image
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${url}`);
        img.src = url;
    });
}

// Step 2: Downloads ALL images in parallel
async function downloadImages() {
    loading.textContent = "⏳ Loading images...";
    loading.style.display = "block";
    output.innerHTML = "";     // clear previous images
    errorDiv.textContent = ""; // clear previous errors

    const promises = images.map((image) => downloadImage(image.url));

    try {
        const imgElements = await Promise.all(promises);

        loading.style.display = "none";
        imgElements.forEach((img) => output.appendChild(img));

    } catch (err) {
        loading.style.display = "none";
        errorDiv.textContent = `❌ Error: ${err}`;
    }
}

// Step 3: Trigger
if (btn) {
    btn.addEventListener("click", downloadImages);
} else {
    downloadImages(); // auto-run if no button
}
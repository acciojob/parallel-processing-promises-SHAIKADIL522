const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
    img.src = url;
  });
}

async function downloadImages() {
  loading.style.display = "block";
  output.innerHTML = "";
  errorDiv.textContent = "";

  const promises = images.map((image) => downloadImage(image.url));

  try {
    const imgElements = await Promise.all(promises);
    loading.style.display = "none";
    imgElements.forEach((img) => output.appendChild(img));
  } catch (err) {
    loading.style.display = "none";
    errorDiv.textContent = `Error: ${err}`;
  }
}

document
  .getElementById("download-images-button")
  .addEventListener("click", downloadImages);

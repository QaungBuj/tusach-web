const postcard_backgrounds = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
  "./assets/5.png",
  "./assets/6.png",
  "./assets/7.png",
  "./assets/8.png",
  "./assets/9.png",
  "./assets/10.png",
  "./assets/11.png",
  "./assets/12.png",
  "./assets/13.png",
];

// Store the processed image data URL
let processedImageDataUrl = null;

function generatePostcard() {
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;

  if (!name) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * postcard_backgrounds.length);
  const selectedBackground = postcard_backgrounds[randomIndex];

  // Get xung ho based on gender
  let xungHo = "Bạn";
  if (gender === "male") xungHo = "Anh";
  else if (gender === "female") xungHo = "Chị";

  const fullText = `${xungHo} ${name}`;

  // Create image directly on canvas
  createImageWithText(selectedBackground, fullText)
    .then((dataUrl) => {
      // Save the processed image URL for later download
      processedImageDataUrl = dataUrl;

      // Display the processed image
      const postcardElement = document.getElementById("postcard");
      postcardElement.style.backgroundImage = `url('${dataUrl}')`;
      postcardElement.style.display = "block";

      // Show download button
      document.getElementById("download-btn").style.display = "inline-block";

      // Optional: You can still update the text overlay if needed
      document.getElementById("postcard-text").innerHTML = "";
    })
    .catch((error) => {
      console.error("Error generating postcard:", error);
      alert("Có lỗi xảy ra khi tạo bưu thiếp: " + error.message);
    });
}

// Function to create an image with text on canvas
function createImageWithText(imageSrc, text) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Handle CORS if needed

    img.onload = () => {
      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Configure text styling
      ctx.fillStyle = "#981"; // White text
      // ctx.strokeStyle = "#000000"; // Black outline
      ctx.lineWidth = 1;

      // Font size based on image dimensions (adjust as needed)
      const fontSize = Math.max(24, Math.floor(canvas.width / 40));
      ctx.font = `bold ${fontSize}px Lobster`;
      ctx.textAlign = "center";

      // Position the text (adjust as needed)
      const textX = 420;
      const textY = 260; // 70% down from the top

      // Draw text with outline for better visibility
      ctx.strokeText(text, textX, textY);
      ctx.fillText(text, textX, textY);

      // Convert to data URL
      const dataUrl = canvas.toDataURL("image/png");
      resolve(dataUrl);
    };

    img.onerror = (error) => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageSrc;
  });
}

function downloadPostcard() {
  if (!processedImageDataUrl) {
    alert("Vui lòng tạo bưu thiếp trước khi tải xuống.");
    return;
  }

  const downloadBtn = document.getElementById("download-btn");
  const originalText = downloadBtn.innerHTML;
  downloadBtn.innerHTML = "Đang xử lý...";
  downloadBtn.disabled = true;

  try {
    // Create download link for the processed image
    const link = document.createElement("a");
    link.href = processedImageDataUrl;
    link.download = "postcard.png";
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
    }, 100);
  } catch (error) {
    console.error("Lỗi khi tải xuống bưu thiếp:", error);
    alert("Có lỗi xảy ra khi tải xuống bưu thiếp: " + error.message);
    downloadBtn.innerHTML = originalText;
    downloadBtn.disabled = false;
  }
}

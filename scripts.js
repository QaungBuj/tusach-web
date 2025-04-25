function generatePostcard() {
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;

  // if (!name || !gender || !dob) {
  //   alert("Vui lòng điền đầy đủ thông tin.");
  //   return;
  // }

  if (!name) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  let xungHo = "Bạn";
  if (gender === "male") xungHo = "Anh";
  else if (gender === "female") xungHo = "Chị";

  const formattedDob = new Date(dob).toLocaleDateString("vi-VN");

  const message = `<span class="postcard-name">${xungHo} <strong>${name}</strong></span><br>

 
   .`;

  document.getElementById("postcard-text").innerHTML = message;
  document.getElementById("postcard").style.display = "block";
  document.getElementById("download-btn").style.display = "inline-block";
}

function downloadPostcard() {
  const element = document.getElementById("postcard");
  element.style.display = "block";

  html2canvas(element, {
    useCORS: true,
    backgroundColor: null, // Để giữ nền trong suốt hoặc từ CSS
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "postcard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

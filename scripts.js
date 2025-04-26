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

  const message = `<span class="postcard-name">${xungHo} <strong>${name}</strong></span><br>.`;

  document.getElementById("postcard-text").innerHTML = message;
  document.getElementById("postcard").style.display = "block";
  document.getElementById("download-btn").style.display = "inline-block";
}

function downloadPostcard() {
  const element = document.querySelector("#postcard");
  const downloadBtn = document.getElementById("download-btn");
  const originalText = downloadBtn.innerHTML;
  downloadBtn.innerHTML = "Đang xử lý...";
  downloadBtn.disabled = true;

  element.style.display = "block";
  element.style.visibility = "visible";

  html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    scale: 2,
  })
    .then((canvas) => {
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "postcard.png";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
      }, 100);
    })
    .catch(function (error) {
      console.error("Lỗi khi tạo postcard:", error);
      alert("Có lỗi xảy ra khi tải xuống bưu thiếp: " + error.message);
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
    });
}

document.body.insertAdjacentHTML(
  "beforeend",
  `<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Scan the QR code with your phone</p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=550x550&data=https://abdosarmini.github.io/Restaurant-Menu/" >
  </div>
</div>
`
);

const modal = document.getElementById("myModal");
const openBtn = document.getElementById("qrButton");
const closeBtn = document.querySelector(".close");

// Open modal
openBtn.onclick = () => {
  modal.style.display = "block";
  setTimeout(function () {
    document.querySelector(".modal-content").classList.add("modal-visible");
  }, 50);
  document.body.style.overflow = "hidden"; // Disable scrolling
};

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
  document.body.style.overflow = ""; // Disable scrolling
  document.querySelector(".modal-content").classList.remove("modal-visible");
};

// Close modal when clicking outside
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Restore scrolling
    document.querySelector(".modal-content").classList.remove("modal-visible");
  }
};

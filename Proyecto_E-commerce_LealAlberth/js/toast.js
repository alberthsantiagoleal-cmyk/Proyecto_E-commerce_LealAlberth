function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");

  const toast = document.createElement("div");

  toast.classList.add("toast");

  toast.classList.add(type);

  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/*--------------------FUNCTIONS-------------------- */
const showModal = () => {
  const modal = document.getElementById("new-project-modal");
  modal.showModal();
};

// Event listener foor showing new project modal
const newProjectBtn = document.getElementById("new-project-btn");
newProjectBtn.addEventListener("click", showModal);

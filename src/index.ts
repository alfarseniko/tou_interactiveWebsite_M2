/** ################################################### */
/*--------------------IMPORTS-------------------- */
/** ################################################### */
import { IProject, Role, Status } from "./class/Project";
import { ProjectsManager } from "./class/ProjectsManager";
import { ErrorPopup } from "./class/ErrorPopup";

/** ################################################### */
/*--------------------FUNCTIONS-------------------- */
/** ################################################### */
function toggleModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal.open) {
    modal.close();
  } else {
    modal.showModal();
  }
}

/** ################################################### */
// Event listener for showing new project modal
/** ################################################### */
const newProjectBtn = document.getElementById("new-project-btn");
if (newProjectBtn) {
  newProjectBtn.addEventListener("click", () => {
    toggleModal("new-project-modal");
    const closeButton = document.getElementById(
      "close-button-form"
    ) as HTMLButtonElement;
    closeButton.addEventListener("click", () => {
      toggleModal("new-project-modal");
    });
  });
} else {
  console.warn("The new project button was not found!");
}

/** ################################################### */
/*----------------PROJECTS MANAGER CLASS-------------------- */
/** ################################################### */
const projectsListUi = document.getElementById("projects-list") as HTMLElement;
const projectsManager = new ProjectsManager(projectsListUi);

/** ################################################### */
/*----------------IMPORT/EXPORT BUTTONS-------------------- */
/** ################################################### */
const exportButton = document.getElementById(
  "export-button"
) as HTMLButtonElement;
if (exportButton) {
  exportButton.addEventListener("click", () => {
    projectsManager.exportAsJSON();
  });
}
const importButton = document.getElementById(
  "import-button"
) as HTMLButtonElement;
if (importButton) {
  importButton.addEventListener("click", () => {
    projectsManager.importFromJSON();
    console.log("all good");
  });
}

/** ################################################### */
/*------------BUTTON TO GO BACK TO MAIN PAGE----------- */
/** ################################################### */

const projectsButton = document.getElementById(
  "projects-button"
) as HTMLDataListElement;
projectsButton.addEventListener("click", () => {
  const projectsPage = document.getElementById("projects-page");
  const detailsPage = document.getElementById("project-details");
  if (!projectsPage || !detailsPage) {
    return;
  }
  projectsPage.style.display = "flex";
  detailsPage.style.display = "none";
});
/** ################################################### */
/*----------BUTTON TO OPEN EDIT PROJECT FORM----------- */
/** ################################################### */
const editProjectButton = document.getElementById(
  "edit-project-button"
) as HTMLButtonElement;
if (editProjectButton) {
  editProjectButton.addEventListener("click", () => {
    toggleModal("edit-project-modal");
    const closeButton = document.getElementById(
      "close-button-edit-form"
    ) as HTMLButtonElement;
    closeButton.addEventListener("click", () => {
      toggleModal("edit-project-modal");
    });
  });
} else {
  console.warn("The edit project button was not found!");
}

/** ################################################### */
/**-----------------------NEW PROJECT------------------ */
/** ################################################### */

/*----------------Getting Form Data NEW PROJECT----------------- */
const projectForm = document.getElementById("new-project-form");
// Checking if form exists and if it is of correct data type
if (projectForm && projectForm instanceof HTMLFormElement) {
  projectForm.addEventListener("submit", (e) => {
    // Preventing default behaviour of form
    e.preventDefault();
    const formData = new FormData(projectForm);
    // Initializing an object of type IProject to store project data
    let data: IProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      role: formData.get("role") as Role,
      status: formData.get("status") as Status,
      finishDate: new Date(formData.get("finishDate") as string),
    };
    try {
      // Calling NEWPROJECT function
      const project = projectsManager.newProject(data);
      projectForm.reset();
      toggleModal("new-project-modal");
      console.log(project);
    } catch (err) {
      new ErrorPopup(err.message);
    }
  });
} else {
  // WARNING in case of not finding the required form
  console.warn(
    "The project form was not found! The project form:",
    projectForm
  );
}

/** ################################################### */
/**-----------------------EDIT PROJECT----------------- */
/** ################################################### */

/*----------------Getting Form Data EDIT PROJECT----------------- */
const editForm = document.getElementById(
  "edit-project-form"
) as HTMLFormElement;
if (editForm) {
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(editForm);
    // Initializing an object of type IProject to store project data
    let data: IProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      role: formData.get("role") as Role,
      status: formData.get("status") as Status,
      finishDate: new Date(formData.get("finishDate") as string),
    };
    try {
      // Calling NEWPROJECT function
      projectsManager.editProject(projectsManager.currentProject, data);
      editForm.reset();
      toggleModal("edit-project-modal");
    } catch (err) {
      new ErrorPopup(err.message);
    }
  });
} else {
  console.warn("The edit form was not found.");
}

/** ################################################### */
/**-----------------------TODO------------------------- */
/** ################################################### */
const addTodoButton = document.getElementById(
  "add-todo-button"
) as HTMLSpanElement;
addTodoButton.addEventListener("click", () => {
  toggleModal("add-todo-modal");
});
const todoForm = document.getElementById("add-todo-form") as HTMLFormElement;
if (todoForm) {
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(todoForm);
    // Initializing an object of type IProject to store project data
    let data: IProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      role: formData.get("role") as Role,
      status: formData.get("status") as Status,
      finishDate: new Date(formData.get("finishDate") as string),
    };
    try {
      // Calling NEWPROJECT function
      projectsManager.editProject(projectsManager.currentProject, data);
      editForm.reset();
      toggleModal("edit-project-modal");
    } catch (err) {
      new ErrorPopup(err.message);
    }
  });
} else {
  console.warn("The edit form was not found.");
}

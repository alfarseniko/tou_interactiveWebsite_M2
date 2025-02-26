import { ErrorPopup } from "./ErrorPopup";
import { IProject, Project } from "./Project";

export class ProjectsManager {
  // A list of projects in the app initialized empty
  list: Project[] = [];
  // HTML Container for all project cards
  ui: HTMLElement;

  /*--------------------CONSTRUCTOR-------------------- */
  // CONTAINER is the HTMLElement which will house all the project cards
  constructor(container: HTMLElement) {
    /* The container will be assigned to the UI of the object
        and will be replaced with the HTML in the main file to
        be rendered as project cards */
    this.ui = container;

    /* The following code has been written to create a default project
       when the project starts */
    const data: IProject = {
      name: "Project Name",
      description: "A normal description",
      status: "Active",
      role: "Architect",
      finishDate: new Date(),
    };
    this.newProject(data);
  }

  newProject(data: IProject) {
    /*  The map() method iterates over the whole array and then returns a list of required elements */
    const projectNames = this.list.map((project) => {
      return project.name;
    });
    // A custom ERROR has been created for same instances of name
    if (projectNames.includes(data.name)) {
      throw new Error(
        `A project with the name, "${data.name}", already exists in the database.`
      );
    }
    const project = new Project(data);
    /*  project.UI is the PROJECT CARD
        this.UI is the container for the project cards */
    this.ui.append(project.ui);
    // data is stored in the class
    this.list.push(project);
    // EventListener for going to details page
    this.ui.addEventListener("click", () => {
      const projectsPage = document.getElementById("projects-page");
      const detailsPage = document.getElementById("project-details");
      if (!projectsPage || !detailsPage) {
        return;
      }
      projectsPage.style.display = "none";
      detailsPage.style.display = "flex";
      // To provide project specific info on details page
      this.setDetailsPage(project);
    });

    return project;
  }
  /**------------------SETTING DETAILS PAGE DATA----------------- */
  setDetailsPage(project) {
    const detailsPage = document.getElementById("project-details");
    if (!detailsPage) {
      return;
    }
    // ---------NAME HEADING-----------
    const nameHeading = detailsPage.querySelector(
      "[details-page-info='name-heading']"
    );
    if (nameHeading) {
      nameHeading.textContent = project.name;
    }
    // ---------DESCRIPTION HEADING-----------
    const descriptionHeading = detailsPage.querySelector(
      "[details-page-info='description-heading']"
    );
    if (descriptionHeading) {
      descriptionHeading.textContent = project.description;
    }
    // ---------NAME-----------
    const name = detailsPage.querySelector("[details-page-info='name']");
    if (name) {
      name.textContent = project.name;
    }
    // ---------DESCRIPTION-----------
    const description = detailsPage.querySelector(
      "[details-page-info='description']"
    );
    if (description) {
      description.textContent = project.description;
    }
    // ---------STATUS-----------
    const status = detailsPage.querySelector("[details-page-info='status']");
    if (status) {
      status.textContent = project.status;
    }
    // ---------COST-----------
    const cost = detailsPage.querySelector("[details-page-info='cost']");
    if (cost) {
      cost.textContent = "$" + Math.round(project.cost).toString();
    }
    // ---------ROLE-----------
    const role = detailsPage.querySelector("[details-page-info='role']");
    if (role) {
      role.textContent = project.role;
    }
    // ---------FINISH DATE-----------
    const finishDate = detailsPage.querySelector(
      "[details-page-info='finishDate']"
    );
    if (finishDate) {
      finishDate.textContent = project.finishDate.toISOString().split("T")[0];
    }
  }

  getProject(id: string) {
    /*  The find() method takes a callback function in which we must
        return a boolean value. The find() method checks which element
        of the array got true and returns the element */
    const project = this.list.find((project) => {
      return project.id === id;
    });
    return project;
  }

  deleteProject(id: string) {
    /*  The filter() method takes a callback function in which we must return 
        a boolean value. The filter() method checks for all true values and retains the elements while for all false values it removes from the result */
    const remaining = this.list.filter((project) => {
      return project.id !== id;
    });
    // Replacing the whole list with 'remaining' which doesnt contain the deleted element
    this.list = remaining;
  }

  totalCost() {
    let totalCost = 0;
    /*  The forEach() method is a for loop that runs over each element of
        the array. Do whatever you want with the logic */
    this.list.forEach((project) => {
      totalCost += project.cost;
    });
    return totalCost;
  }

  getProjectByName(name: string) {
    /*  The find() method takes a callback function in which we must
        return a boolean value. The find() method checks which element
        of the array got true and returns the element */
    const projectByName = this.list.find((project) => {
      return project.name.toLowerCase == name.toLowerCase;
    });
    return projectByName;
  }

  exportAsJSON(fileName: string = "Projects") {
    /*  JSON.stringify converts any object or array of objects into JSON format
        Arg1 is for the object to be converted
        Arg2 is a replacer function to omit or change the original object
        Arg3 is a space value for stringification
    */
    const json = JSON.stringify(this.list, null, 2);
    /** A Blob() object takes a data value for conversion and a type to get rules for conversion to binary data
     */
    const blob = new Blob([json], { type: "application/json" });
    // Creates a url that can be tied to the blob
    const url = URL.createObjectURL(blob);
    // URL needs to be associated with a HTML element
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    // url is revoked to prevent memory leaks
    URL.revokeObjectURL(url);
  }

  importFromJSON() {
    // Create an input element to upload files
    const input = document.createElement("input");
    // Define the type of input
    input.type = "file";
    // Define what the input accepts
    input.accept = "application/json";
    // FileReader() is a class to read the files from any user input
    const reader = new FileReader();

    // when a user selects a file, the change event is fired
    input.addEventListener("change", () => {
      // input.files contains the required files
      const filesList = input.files;
      // exit the block if filesList is empty
      if (!filesList) {
        return;
      }
      //  file has been loaded in the reader as string data
      reader.readAsText(filesList[0]);
    });

    // once the reader has been loaded with the files
    reader.addEventListener("load", () => {
      // the string data can be used by accessing reader.result
      const json = reader.result;
      // return if result is empty
      if (!json) {
        return;
      }
      // feed the array back into the IProject format
      // json as string is type assertion
      // JSON.parse converts string to JSON
      const projects: IProject[] = JSON.parse(json as string);
      // for loop to add all projects to the projectsManager
      for (const project of projects) {
        try {
          this.newProject(project);
        } catch (error) {
          new ErrorPopup(error.message);
        }
      }
    });
    input.click();
  }
}

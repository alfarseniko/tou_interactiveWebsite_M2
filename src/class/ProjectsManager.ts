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
      status: "active",
      role: "architect",
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
    return project;
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

  uploadToJSON() {
    // JSON.stringify converts any object or array of objects into JSON format
    const json = JSON.stringify(this.list, null, 2);
    const blob = new Blob([json], { type: "application/json" });
  }

  downloadFromJSON() {}
}

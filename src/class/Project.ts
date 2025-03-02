/*--------------------IMPORTS-------------------- */
import { v4 as uuidv4 } from "uuid";

/*--------------------EXPORTING TYPES-------------------- */
export type Status = "Pending" | "Active" | "Finished";
export type Role = "Architect" | "Engineer" | "Developer";

/*--------------------EXPORTING INTERFACES-------------------- */
export interface IProject {
  name: string;
  description: string;
  role: Role;
  status: Status;
  finishDate: Date;
}

/*--------------------EXPORTING CLASS-------------------- */
export class Project implements IProject {
  // Defining variables in a class to satisfy IProject
  name: string;
  description: string;
  status: Status;
  role: Role;
  finishDate: Date;

  // Initiating internal properties
  ui: HTMLDivElement;
  cost: number = Math.random() * 100000000;
  progress: number = Math.random() * 100;
  id: string;

  /*--------------------CONSTRUCTOR-------------------- */
  constructor(data: IProject) {
    for (const key in data) {
      this[key] = data[key];
    }
    if (this.finishDate instanceof Date && isNaN(this.finishDate.getTime())) {
      this.finishDate = new Date("December 25, 2000 03:24:00");
    }
    this.id = uuidv4();
    this.setUi();
  }

  editProject(data: IProject) {
    // time to start working again
  }

  private setUi() {
    // Initiating a HTML Div for PROJECT CARD with new data
    this.ui = document.createElement("div");
    // Setting the class name for Div
    this.ui.className = "project-card";
    // Defining the children for Div Element
    this.ui.innerHTML = `<div class="card-header">
            <p style="background-color: ${this.randomColor()}; padding: 10px; border-radius: 8px; aspect-ratio: 1; text-transform: uppercase;">${
      this.name[0] + this.name[1]
    }</p>
            <div>
              <h5>${this.name}</h5>
              <p>${this.description}</p>
            </div>
          </div>
          <div class="card-content">
            <div class="card-property">
              <p style="color: #969696;">Status</p>
              <p>${this.status}</p>
            </div>
            <div class="card-property">
              <p style="color: #969696;">Role</p>
              <p>${this.role}</p>
            </div>
            <div class="card-property">
              <p style="color: #969696;">Cost</p>
              <p>$${Math.round(this.cost)}</p>
            </div>
            <div class="card-property">
              <p style="color: #969696;">Estimated Progress</p>
              <p>${this.progress.toFixed(2)}%</p>
            </div>
          </div>`;
  }

  private randomColor() {
    const colors = ["#EDAE49", "#D1495B", "#00798C", "#30638E", "#003D5B"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

/*--------------------IMPORTS-------------------- */
import { v4 as uuidv4 } from "uuid";

/*--------------------EXPORTING TYPES-------------------- */
export type Status = "pending" | "active" | "finished";
export type Role = "architect" | "engineer" | "developer";

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
  status: "pending" | "active" | "finished";
  role: "architect" | "engineer" | "developer";
  finishDate: Date;

  // Initiating internal properties
  ui: HTMLDivElement;
  cost: number = Math.random() * 100000000;
  progress: number = Math.random() * 100;
  id: string;

  /*--------------------CONSTRUCTOR-------------------- */
  constructor(data: IProject) {
    this.name = data.name;
    this.description = data.description;
    this.role = data.role;
    this.status = data.status;
    this.finishDate = data.finishDate;
    this.id = uuidv4();
    // Function for generating UI
    this.setUi();
  }

  private setUi() {
    // Initiating a HTML Div for PROJECT CARD with new data
    this.ui = document.createElement("div");
    // Setting the class name for Div
    this.ui.className = "project-card";
    // Defining the children for Div Element
    this.ui.innerHTML = `<div class="card-header">
            <p style="background-color: #ca8134; padding: 10px; border-radius: 8px; aspect-ratio: 1;">HC</p>
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
}

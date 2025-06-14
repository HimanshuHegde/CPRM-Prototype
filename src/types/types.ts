import type { Department, Emergency_alert, Token_queue } from "../../backend/generated/prisma";

export interface TokenWithDepartment extends Token_queue {
  department?: Department;
}

export interface AlertWithDepartment extends Emergency_alert {
  department?: Department;
}
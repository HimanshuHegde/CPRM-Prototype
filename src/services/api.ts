const Token = localStorage.getItem('token');
import type { Blood_bank, Department, Drug_inventory, Emergency_alert } from "../../backend/generated/prisma";
import type { TokenWithDepartment } from "../types/types";
export const getSyncedTokens = async (data: {token_id?: number, departmentId?: number, status?: string,departmentName?:string}): Promise<TokenWithDepartment[]> => {
  const res = await fetch("http://localhost:8080/api/tokens/get",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res.json();
};

export const getDepartments = async (data:{dept_id?:number , department_name?:string , location?:string}): Promise<Department[]> => {
  const res = await fetch("http://localhost:8080/api/department/get",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res.json();
};

export const addTokens = async (data: {departmentId:number, patient_name:string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/tokens",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const deleteTokens = async (data: {token_id?: number, departmentId?: number, status?: string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/tokens",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Delete",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const updateTokens = async (data: {token_id?: number, departmentId?: number, status?: string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/tokens",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Put",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const getDrugInventory = async (data: {drug_name?:string , stock_qty?:number , reorder_level?:number , status?:string}): Promise<Drug_inventory[]> => {
  const res = await fetch("http://localhost:8080/api/drugs/get",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res.json()
};

export const createDrug = async (data: {drug_name:string , stock_qty:number , reorder_level:number , status:string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/drugs",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const updateDrug = async (data: {drug_id?:number ,drug_name?:string , stock_qty?:number , reorder_level?:number , status?:string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/drugs",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Put",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const deleteDrug = async (data: {drug_id:number}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/drugs",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Delete",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const getBloodInventory = async (data: {blood_id?:number ,blood_type?:string , units_available?:number , critical_level?:number , status?:string}): Promise<Blood_bank[]> => {
  const res = await fetch("http://localhost:8080/api/blood/get",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res.json()
};

export const createBloodUnit = async (data: {blood_type:string , units_available:number , critical_level:number , status:string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/blood",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const updateBloodUnit = async (data: {blood_id?:number ,blood_type?:string , units_available?:number , critical_level?:number , status?:string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/blood",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Put",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const deleteBloodUnit = async (data: {blood_id:number}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/blood",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Delete",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const alertGet = async (data: {alert_id?:number ,code_type?:string , status?:string,departmentId?:number,timestamp?:string,departmentName?:string}): Promise<Emergency_alert[]> => {
  const res = await fetch("http://localhost:8080/api/alert/get",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res.json()
};

export const alertUpdate = async (data: {alert_id?:number ,code_type?:string , status?:string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/alert",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Put",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const alertDelete = async (data: {alert_id:number}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/alert",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Delete",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};

export const alertCreate = async (data: {code_type:string , status:string,departmentId:number,timestamp:string}): Promise<Response> => {
  const res = await fetch("http://localhost:8080/api/alert",{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    method: "Post",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return res
};
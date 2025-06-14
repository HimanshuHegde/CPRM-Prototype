import {jwtDecode} from "jwt-decode";

export interface DecodedToken {
 userId: string,
  email: string
  role: string
}

export const decodeToken = (): DecodedToken | null =>{
    const token = localStorage.getItem('token');
    if(!token) return null;
    return jwtDecode(token);
}
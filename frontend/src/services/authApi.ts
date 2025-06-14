export async function signup(e:{name:string,role:string,email:string,password:string}){
   return await fetch('https://centralized-patient-resource-management.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(e),
      });
}

export async function signin(e:{email:string,password:string}){
    return await fetch('https://centralized-patient-resource-management.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(e),
      });
}

export async function logout(){
    return await fetch('https://centralized-patient-resource-management.onrender.com/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
}
import { useState } from "react";
import { signin, signup } from "../services/authApi";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role,setRole] = useState("")
  async function handleAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!isSignIn){
        const res = await signup({name,role,email,password})
        if(res.status === 201){
          setIsSignIn(true)
        }
        return 0;
    }else{
      const res = await signin({email,password})
      const data = await res.json()
      if(res.status === 200){
        localStorage.setItem('token',data.token)
        window.location.href = '/dashboard'
      }
    }
    
    
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isSignIn ? "Sign in" : "Sign up"}
        </h2>

        {isSignIn ? (
          <>
            <form className="space-y-4"
            onSubmit={(e)=>handleAuth(e)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* <div className="text-right text-sm">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div> */}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
              >
                Sign in
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsSignIn(false)}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <form className="space-y-4" onSubmit={(e) => handleAuth(e)
            }>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
  required
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="">Select Role</option>
  <option value="Doctor">Doctor</option>
  <option value="admin">Admin</option>
  <option value="Blood Inventory Operator">Blood Inventory Operator</option>
  <option value="Drug Inventory Operator">Drug Inventory Operator</option>
  <option value="Token Screen">Token Screen</option>
  <option value="Token Operator">Token Operator</option>
</select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
              >
                Sign up
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setIsSignIn(true)}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

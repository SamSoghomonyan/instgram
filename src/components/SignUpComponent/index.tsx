"use client"
import instagramlogo from "@/images/Instagramlogo.png";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";


export default function SignUpComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registered, setRegistration] = useState(false);
  const router = useRouter();

  const handleSignUpClick = () =>{
    const signUp = {
      email: email,
      password: password,
      username: username,
    }
    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUp)
    }) .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Index failed');
      }

      console.log('Index success:', data.message);
      if(data.message === 'successfully') {
        setRegistration(true);
      }
    }).catch((err) => {
      console.error("Signup error:", err.message);
    });
  }
  useEffect(() => {
    if (registered) {
      router.push("/");
      setRegistration(false);
    }
  }, [registered, router]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-80">
        <img src={instagramlogo.src} alt="Instagram" className='bg-transparent' />
        <span className="text-center max-w-md text-xl font-semibold text-gray-800 font-serif" >
          Sign up to see photos and videos from your friends.
        </span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded" placeholder="Email" />
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded" placeholder="Username" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded" placeholder="Password" type="password" />
        <button onClick={handleSignUpClick} className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</button>
      </div>
    </div>
  );
}

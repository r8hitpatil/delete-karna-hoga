"use client";

import { useState } from "react";
import { login,register } from "../../actions";

export function AuthForm(){

    const [showRegister,setShowRegister] = useState(false);

    return (
        <div>
            {!showRegister ? (
                <form action={async (formData) => { await login(formData); }} className="flex flex-col">
                    <h2 className="text-3xl">LOGIN</h2>
                    <br />
                    <h1 className="text-lg">Email</h1>
                <input className="border-2 placeholder:text-center" placeholder="Enter email" name="email" /><br />
                    <h1 className="text-lg">Password</h1>
                <input  className="border-2 placeholder:text-center" placeholder="Enter password" name="password" type="password"/><br />
                <button type="submit" className="bg-white text-black w-full rounded-md">Login</button> <br />
                <p>
                    Need an account ? { " " }
                    <button type="button" className="bg-white text-black w-full rounded-md" onClick={() => setShowRegister(true)}>Register</button>
                </p>
            </form>
            ) : (
                <form action={async (formData) => { await register(formData); } } className="flex flex-col">
                    <h2 className="text-3xl">SIGNUP</h2>
                    <br />
                    <h1 className="text-lg">Email</h1>
                <input className="border-2 placeholder:text-center" placeholder="Enter email" name="email" /><br />
                <h1 className="text-lg">Password</h1>
                <input  className="border-2 placeholder:text-center" name="password" type="password" placeholder="Enter password"/><br />
                <button type="submit" className="bg-white text-black w-full rounded-md">Create account</button> <br />
                <p>
                    Already have an account ? { " " }
                    <button type="button" className="bg-white text-black w-full rounded-md" onClick={() => setShowRegister(false)}>Login</button>
                </p>
                </form>
            )}
        </div>
    );
}
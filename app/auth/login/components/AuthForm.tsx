"use client";

import { useState } from "react";
import { login, register } from "../../../api/auth/action";
import { registerSchema } from "@/app/lib/schemas/auth.schema";
import { email } from "zod";

export function AuthForm() {
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(formData : FormData) {
        setError("");

        const result = registerSchema.safeParse({
            email : formData.get("email"),
            password : formData.get("password")
        })

        if(!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        try {
            if(showRegister) {
            const regResponse = await register(formData);
            if(!regResponse.success) {
                setError(regResponse.message);
                return;
            }
        }
           const logResponse = await login(formData);
           if(logResponse && !logResponse.success) {
            setError(logResponse.message)
        }
        } catch (error) {
            setError("Something went wrong. Please try again.");
       }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl backdrop-blur-sm">
            {!showRegister ? (
                <form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Login</h2>
                        <p className="text-xs text-muted-foreground mt-1">Enter your credentials to access your account</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                        <input
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Enter email"
                            name="email"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                        <input
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Enter password"
                            name="password"
                            type="password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                    >
                        Login
                    </button>

                    <div className="text-center text-xs text-muted-foreground mt-2">
                        Need an account ?{" "}
                        <button
                            type="button"
                            className="font-semibold text-primary hover:underline cursor-pointer ml-1"
                            onClick={() => setShowRegister(true)}
                        >
                            Register
                        </button>
                    </div>
                </form>
            ) : (
                <form action={handleSubmit} className="flex flex-col gap-4">
                    <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign Up</h2>
                        <p className="text-xs text-muted-foreground mt-1">Create a new account to get started</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                        <input
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Enter email"
                            name="email"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                        <input
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
                    >
                        Create account
                    </button>

                    <div className="text-center text-xs text-muted-foreground mt-2">
                        Already have an account ?{" "}
                        <button
                            type="button"
                            className="font-semibold text-primary hover:underline cursor-pointer ml-1"
                            onClick={() => setShowRegister(false)}
                        >
                            Login
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
"use client";

import { useState } from "react";
import { login, register } from "../../actions";

export function AuthForm() {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl backdrop-blur-sm">
            {!showRegister ? (
                <form action={async (formData) => { await login(formData); }} className="flex flex-col gap-4">
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
                <form action={async (formData) => { await register(formData); }} className="flex flex-col gap-4">
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
"use client";

import { login } from "../../actions";

export function LoginForm(){
    return (
        <form action={async (formData) => { await login(formData); }}>
            <input name="email" /><br />
            <input name="password" type="password"/><br />
            <button type="submit">
                Login
            </button>
        </form>
    );
}
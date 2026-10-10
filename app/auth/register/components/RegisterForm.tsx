"use client";

import { register } from "../../actions";

export function RegisterForm(){
    return (
        <form action={async (formData) => { await register(formData); }}>
            <input name="email" /><br />
            <input name="password" type="password"/><br />
            <button type="submit">
                Register
            </button>
        </form>
    );
}
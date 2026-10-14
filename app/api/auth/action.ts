"use server"

import { prisma } from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerSchema } from "@/app/lib/schemas/auth.schema";

async function findUserByMail(email:string){
    return prisma.user.findUnique({
        where : { email },
    });
}

export async function register(formData:FormData) {
    const result = registerSchema.safeParse({
        email : formData.get("email"),
        password : formData.get("password")
    })

    if(!result.success) {
        return { success : false, message : "Email and password required." };
    }

    const { email , password } = result.data;

    try {
        const existingUser = await findUserByMail(email);

        if(existingUser){
            return { success: false, message: "Email already registered" };
        }
        const hashedPass = await argon2.hash(password);

        const newUser = await prisma.user.create({
            data : {
                email : email,
                password : hashedPass
            }
        });

        return {
            success : true,
            user : { id : newUser.id , email : newUser.email },
            message : "Registered users successfully"
        };
    } catch (error) {
       console.log('Registration error : ',error);
       return { success : false, message : "Unexpected error occurred during registration." }
    }
}

export async function login(formData: FormData) {
    const result = registerSchema.safeParse({
        email : formData.get("email"),
        password : formData.get("password")
    })

    if(!result.success) {
        return { success : false, message : "Email and password required." };
    }

    const { email , password } = result.data;

    const existingUser = await findUserByMail(email);

    if(!existingUser){
        return { success : false, message : "Email is not registered." };
    }

    try {
        const pass = await argon2.verify(existingUser.password,password);
        if(!pass){
            return { success : false, message : "Wrong credentials" };
        }

        const token = jwt.sign(
            { sub : existingUser.id },
            process.env.JWT_SECRET!
        );
        const cookieStore = await cookies();

        cookieStore.set("access_token",token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            path : "/",
        });
    } catch (error) {
        return { success : false, message : "Wrong credentials please try again." };
    }
    redirect("/news")
}

export async function logout(){
    const cookieStore = await cookies();

    cookieStore.delete("access_token");
}
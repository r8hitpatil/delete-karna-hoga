"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    try {
        if(!token){
            // return { success : 'false',message : 'Access token not found' }; not this but null ?
            return null;
        }
        const decrypt = jwt.verify(token,process.env.JWT_SECRET!) as { sub: string } ;

        // console.log('token',token);
        // console.log('cookieStore',cookieStore);
        if(!decrypt){
            // return { success : 'false',message : 'Decryption went wrong.' }; same here
            return null;
        }

        const usr = await prisma.user.findUnique({
            where : {
                id : decrypt.sub
            },
            select : {
                id : true,
                email : true,
                createdAt : true,
            }
        })
        return usr;
    } catch (error) {
        return null; // why null ??
    }
}
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";


export async function GET(){
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if(!token){
        return { success : 'false',message : 'Access token not found' };
    }
    const user = jwt.verify(token,process.env.JWT_SECRET!) as { sub: string } ;

    if(!user){
        return Response.json({ success : false,message : 'Access token not found' }, {
            status : 401
        });
    }

    const usr = await prisma.user.findUnique({
        where : {
            id : user.sub
        }
    })
    return Response.json(usr);
}
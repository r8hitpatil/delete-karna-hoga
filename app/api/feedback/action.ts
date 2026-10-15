"use server";

import { prisma } from "../../lib/prisma";

type InputFields ={
    name : string;
    age : number;
    feedback : string;
    email : string;
}

export async function createFeedback(data : InputFields,usrId:string,newsId:string){

    if(!data){
        return { success : false, message : "All fields are required" };
    }
    
    try {
        const result = await prisma.feedback.create({
            data : {
                name: data.name,
                age: Number(data.age),
                feedback: data.feedback,
                email : data.email,
                userId: usrId,
                newsId: newsId
            }
        })
        return { success : true, message : 'Successfully submitted the form' , data : result };
    } catch (error) {
        console.error('Error in feedback,',error);
        return { success : false, message : 'Server error on feedback' };
    }
}

export async function createFeedbackv2(data : InputFields,usrId:string,newsId:string){

    if(!data){
        return { success : false, message : "All fields are required" };
    }
    
    try {
        const result = await prisma.feedbackv2.create({
            data : {
                name: data.name,
                age: Number(data.age),
                feedback: data.feedback,
                email : data.email,
                userId: usrId,
                newsId: newsId
            }
        })
        return { success : true, message : 'Successfully submitted the form' , data : result };
    } catch (error) {
        console.error('Error in feedback,',error);
        return { success : false, message : 'Server error on feedback' };
    }
}

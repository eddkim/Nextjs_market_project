import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/helpers/prismadb';

export async function getSession(){
    return await getServerSession(authOptions);

}

export default async function getCurrentUser(){
    try{
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma?.user.findUnique({
            where : {
                email : session.user.email
            }
        })

        if(!currentUser){
            console.log('현재 유저 없음')
            return null;
        }
        return currentUser

        //13버전 이전
        // return {...currentUser,
        //     createdAt : currentUser.createdAt.toISOString(),
        //     updatedAt : currentUser.updatedAt.toISOString()}

    }catch(error){
        console.log(error);
        return null
    }
}
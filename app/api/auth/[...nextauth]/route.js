// Using NextAuth for Autthentication Providers such as Google Providers, API backend endpoints
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database'
// Importing DB connectiion 
import User from '@models/user'
// Importing the User Schema type db


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
    async session({session}){
        const sessionUser = await User.findOne({
            email: session.user.email,
        })
        session.user.id = sessionUser._id.toString();
        return session;
    },
    async signIn({profile}){
        try{
            //every nextjs route -> serverless route -> Lambda -> dynamoDB
            await connectToDB();
            // check if a user already exists
            const userExists = await User.findOne({email: profile.email})
            //if not, create a new user
            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(/\s+/g, "").toLowerCase(),
                    image: profile.picture
                })
            }
            return true;
        }
        catch{
            console.log(error);
            return false;
        }

    },
    }
    
})

export {handler as GET, handler as POST}
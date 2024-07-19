import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt';
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export const GET = async (request) => {

    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator')
        // return new Response(JSON.stringify(prompts), {
        //     status: 200,
        //      headers: {
        //         'Content-Type': 'application/json',
        //         'Cache-Control': 'no-store'
        //     }
        // })
        
    //To dynamically get the path
    const path = request.nextUrl.searchParams.get("path") || "/";

    revalidatePath(path);

    return NextResponse.json(prompts);

    } catch (error) {
        console.log(error)
        return new Response(" Failed to fetch all prompts", {
            status: 500
        })
    }
}
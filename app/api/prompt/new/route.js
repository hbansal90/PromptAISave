import {connectToDB} from '@utils/database'
import Prompt from '@models/prompt';
export const POST = async(req) =>{
    const {userId, prompt, tag} = await req.json();
    try {
        // connectToDB is a lambda function, ie it will be die after its one call
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), {
        status: 201
    })
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a Prompt", {status: 500})
    }
}
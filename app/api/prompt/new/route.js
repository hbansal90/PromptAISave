import {connectToDB} from '@utils/database'
import Prompt from '@models/prompt';


export const POST = async(request) =>{
    const {userId, prompt, tag} = await request.json();
    try {
        // connectToDB is a lambda function, ie it will be die after its one call
        await connectToDB();
        console.log("Connected To DB")
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
    await newPrompt.save()
    console.log(newPrompt)
    return new Response(JSON.stringify(newPrompt), {
        status: 201
    })
    } catch (error) {
        return new Response("Failed to create a Prompt", {status: 500})
    }
}
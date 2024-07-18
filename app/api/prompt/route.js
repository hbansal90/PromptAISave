import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt';

export const GET = async (request) => {

    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), {
            status: 200,
             headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        })

    } catch (error) {
        console.log(error)
        return new Response(" Failed to fetch all prompts", {
            status: 500,
            headers: {
                'Cache-Control': 'no-store'
            }
        })
    }
}
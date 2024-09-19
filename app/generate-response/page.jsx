'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AiForm from '@components/AiForm'
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  import 'react-toastify/dist/ReactToastify.css';
const GenerateResponse = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    const [output, setOutput] = useState("");
    const generateAiContent = async (e) => {
        // to prevent default property: ie while submitting the form, by default it will reload the page, and in react and next, we like to reduce the number of reloads
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch("/api/generate/", {
                method: 'POST',
                body: JSON.stringify({
                    body: post.prompt,
                })
            })
            // Waits for the response to be converted to JSON format and stores it in the data variable
            const data = await response.json();
            if (!response.ok) {
                toast.error('Some Error with LLM Model Gemini', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setOutput(data.error);
            }
            else{
                 setOutput(data.output);
            }

        }
        catch (error) {
            console.log(error);
            toast.error('Some Error with LLM Model Gemini', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
        })

        }
        finally {
            setSubmitting(false);
        }


    }
    return (

        <AiForm
            type="Generate Response"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={generateAiContent}
            aiResponse={output}

        />
    )
}

export default GenerateResponse
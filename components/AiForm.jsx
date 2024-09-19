import Link from "next/link";
import Image from "next/image"; // Make sure you import Image for handling the icon
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Markdown from "markdown-to-jsx";
import MDEditor from "@uiw/react-md-editor";

const AiForm = ({ type, post, setPost, submitting, handleSubmit, aiResponse }) => {
    const [copied, setCopied] = useState("");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(text);
            setTimeout(() => setCopied(""), 2000); // Reset the copied state after 2 seconds
        });
    };

    return (
        <section className="w-full max-w-full flex flex-col justify-between gap-20 mb-10 -mt-10 sm:flex-row">
            <div className="w-1/2 flex-start flex-col">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
                <h1 className="head_text text-left">
                    <span className="blue_gradient text-4xl">{type} Post ✏️</span>
                </h1>
                <p className="desc text-left max-w-md">
                    {type} and share your amazing prompts that you always wanted to with the world🌎 and let your imagination run wild with any AI-powered platform.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism  glassmorphism dark-shadow"
                >
                    <label>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-satoshi font-semibold text-base text-gray-700"> Your AI Prompt</span>
                            <button
                                type="button"
                                onClick={() => copyToClipboard(post.prompt)}
                                className="ml-2">
                                <Image
                                    src={copied === post.prompt
                                        ? "/assets/icons/tick.svg"
                                        : "/assets/icons/copy.svg"
                                    }
                                    alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                        <textarea
                            value={post.prompt}
                            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                            placeholder="Write your prompt here...." required
                            className="form_textarea dark-shadow border-slim"
                        />


                    </label>
                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700"> Tag <span className="font-normal"> ( #product, #webDevelopment, #idea, etc. )</span></span>
                        <input
                            value={post.tag}
                            onChange={(e) => setPost({ ...post, tag: e.target.value })}
                            type='text'
                            placeholder="Tag " required
                            className="form_input"
                        />
                    </label>
                    <div className="flex-end mx-3 mb-5 gap-4">
                        <Link
                            href="/"
                            className="text-gray-500 text-sm"
                        >Cancel
                        </Link>
                        <Link href="/create-prompt">
                            <span className="bg-blue-600 rounded-full text-white px-5 py-1.5 text-sm">
                                Save Prompt
                            </span>
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
                            {submitting ? `${type}...` : type}
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 flex-start flex-col">
                <h1 className="head_text text-left">
                    <span className="blue_gradient  text-4xl">AI Response 🤖</span>
                </h1>
                <p className="desc text-left max-w-md">
                    Here is the response generated by the AI based on your prompt. We are using Google Generative Model Gemini Pro for this purpose.
                </p>
                <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
                    <label>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-satoshi font-semibold text-base text-gray-700"> AI Response with your prompt</span>
                            <button
                                type="button"
                                onClick={() => copyToClipboard(aiResponse)}
                                className="ml-2">
                                <Image
                                    src={copied === aiResponse
                                        ? "/assets/icons/tick.svg"
                                        : "/assets/icons/copy.svg"
                                    }
                                    alt={copied === aiResponse ? "tick_icon" : "copy_icon"}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                        <div
                            value={aiResponse}
                            className="w-full flex rounded-lg h-[380px] mt-2 p-3 text-sm text-gray-500 outline-0 bg-white overflow-y-auto"
                        >
                        
                            <Markdown>{aiResponse}</Markdown>
                        </div>


                    </label>
                </div>
            </div>
        </section>
    );
};

export default AiForm;

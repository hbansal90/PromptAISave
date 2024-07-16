import Feed from "@components/Feed"
import Link from "next/link"
const Home = () => {

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Save, Search and Share
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center"> AI-powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptAISave is your tool for saving ⬇️, discovering 🤔, and sharing 📲 creative prompts ✍️ to generate enhanced responses from your favorite LLM model 🤖.
      </p>
      <Feed/>
      <h2 className="text-center mb-3 font-medium  mt-10 font-mono">Made with 💖 by 
      <a 
        href="https://github.com/hbansal90" 
        target="_blank"
        className="hover:cursor-pointer blue_gradient"
      > Harsh Bansal</a></h2>
    </section>
  )
}

export default Home
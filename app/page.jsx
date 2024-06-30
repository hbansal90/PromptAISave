import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover and Share
      <br className="max-md:hidden"/>
      <span className="orange_gradient text-center"> AI-powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptSaveAI is an open-source tool to Save, Discover, and Share your AI LNM models generated creative prompts.
      </p>
      <Feed/>
    </section>
  )
}

export default Home
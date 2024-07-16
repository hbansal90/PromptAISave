"use client"
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState("")

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }
  const handleProfileClick = () => {
    if (post.creator?._id == session?.user.id) return router.push("/profile")
    router.push(`/profile/${post.creator?._id}?name=${post.creator?.username}`)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-2 ">
        <div
          className='flex-1 flex-shrink flex  justify-between items-center cursor-pointer gap-2'

        >
          <Image
            src={post.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={handleProfileClick}
          />
          <div className="flex flex-col  flex-shrink" onClick={handleProfileClick} >
            <h3 className="font-satoshi font-semibold text-gray-900 flex-shrink">{post.creator?.username}</h3>
            <p className="font-inter text-sm text-gray-500 flex-shrink sm:text-xs" >{post.creator?.email}</p>
          </div>

          <div className="copy_btn ml-1 mr-2 flex-shrink-0" onClick={handleCopy}>
            <Image
              src={copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
              }
              alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={()=> handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (

        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
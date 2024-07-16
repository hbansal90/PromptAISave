
'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = ({params}) => {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([])

    const username = searchParams.get("name")
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const data = await response.json()
            setPosts(data)
        }
        setTimeout(()=>{}, 1000000000000)
        if(params?.id) fetchPosts()
    }, [params.id])
    return (
        
        <Profile
            name={`${username}'s`}
            desc={`Welcome to the ${username}'s profile. You can explore all of their prompts for various tags and copy them to your clipboard.`}
            data={posts}
        />
    )
}

export default MyProfile;
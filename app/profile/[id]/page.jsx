"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const name = searchParams.get("name");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`, {cache: 'no-store'});
            const data = await response.json();

            setPosts(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Profile
            name={name}
            desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
            data={posts}
        />
       
    );
};

export default UserProfile;
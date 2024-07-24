import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import { toast } from 'react-toastify'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        service.getAllPost([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            }).catch((error) => {
                toast.error("Error in fetching posts. Something went wrong!")
            })
            .finally(() => setIsLoading(false))
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                {/* <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div> */}


                <div className="bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8">All Posts</h1>

                        {isLoading ? (
                            <p>Loading posts...</p>
                        ) : posts.length > 0 ? (
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map((post) => (
                                    <div key={post.$id} className=''>
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No posts yet</p>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AllPost
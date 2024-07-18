import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux'



function Home() {
    const [posts, setPosts] = useState([])
    const [authMessage, setAuthMessage] = useState("")
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        service.getAllPost()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        if (authStatus) setAuthMessage("Welcome to BlogVerse")
        else setAuthMessage("You are not logged in")
    }, [authStatus])


    return (
        <div className='w-full'>
            <Container>
                <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* <h1 className="text-3xl font-bold mb-8">Home Page</h1> */}
                        <div className='flex flex-col gap-1 py-4 mb-8'>
                            {userData && <p className='text-2xl md:text-3xl'>Hello! 👋🏻 <span className='font-medium text-[#ff585f]'>{userData.name}</span></p>}
                            <h1 className='text-3xl md:text-4xl'>Welcome to <span className='font-medium'>BlogVerse</span></h1>
                        </div>
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

export default Home
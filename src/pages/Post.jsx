import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, ConfirmationPopup } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import '../index.css'

export default function Post() {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    function formateDate(dateString){
        const date = new Date(dateString);
        return date.toLocaleDateString()
    }

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        Prism.highlightAll();
    }, [post]);

    const handleDelete = () => {
        setShowConfirmation(true)
    }
    const handleCancelDelete = () => {
        setShowConfirmation(false)
    }

    const handleConfirmDelete = () => {
        appwriteService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            })
            .finally(() => {
                setShowConfirmation(false)
            })
    };

    return (
        <Container>
            <div className="max-w-4xl mx-auto relative bg-gray-900 text-white p-4 sm:p-8 rounded-lg my-8">
                {
                    isLoading ? (
                        <p className="text-center text-gray-300">Loading post...</p>
                    ) : post ? (
                        <div className=" flex flex-col gap-8">
                            <div className="w-full text-center mb-4">
                                <h1 className="text-3xl md:text-4xl font-semibold">{post.title}</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-300">Published At : <span className="font-medium text-white">{formateDate(post.$createdAt)}</span></p>
                                {isAuthor && (
                                    <div className="flex justify-end items-center gap-2">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button bgColor="bg-green-600" className="hover:bg-green-700">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button bgColor="bg-red-600" onClick={handleDelete} className="hover:bg-red-700">
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto  object-contain rounded-lg shadow-lg"
                            />
                            <div className="prose-base prose-ul:list-disc prose-pre:bg-gray-800 prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-a:underline">
                                {parse(post.content)}
                            </div>

                        </div>
                    ) : (
                        <p className="text-center text-gray-300">Post not found</p>
                    )
                }

                {showConfirmation && (
                    <ConfirmationPopup
                        message="Are you sure you want to delete this post?"
                        onCancel={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </div>
        </Container>

    )
}
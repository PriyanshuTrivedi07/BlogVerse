import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from "../index"
import authService from '../../appwrite/auth'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)


    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {
                // Delete the old featured image
                await service.deleteFile(post.featuredImage)

                // Update the post with the new featured image
                await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                    .then((dbPost) => {
                        toast.success('Post updated successfully')
                        if (dbPost) navigate(`/post/${dbPost.$id}`)
                    }).catch((error) => {
                        toast.error(`Failed to update post: ${error.message}`);
                    })
            }
            else {
                // If no new file is uploaded, just update other post details
                await service.updatePost(post.$id, data)
                    .then((dbPost) => {
                        toast.success('Post updated successfully')
                        if (dbPost) navigate(`/post/${dbPost.$id}`)
                    }).catch((error) => {
                        toast.error(`Failed to update post: ${error.message}`);
                    })
            }
        } else {
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                await service.createPost({ ...data, userId: userData.$id })
                    .then((dbPost) => {
                        toast.success('Post created successfully')
                        if (dbPost) navigate(`/post/${dbPost.$id}`)
                    }).catch((error) => {
                        toast.error(`Failed to create post: ${error.message}`);
                    })
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col md:flex-row gap-16 md:gap-0">

            <div className="w-full md:w-2/3 px-2 flex flex-col gap-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className=""
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className=""
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-full md:w-1/3 px-2 flex flex-col gap-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className=""
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status :"
                    className=""
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>

        </form>
    );
}

export default PostForm
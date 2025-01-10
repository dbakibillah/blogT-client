import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const BlogDetails = () => {
    const blog = useLoaderData();
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://blog-t-server.vercel.app/comments`, { params: { blogId: blog._id } })
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });
    }, [blog._id]);

    const handleCommentSubmit = () => {
        axios
            .post(
                `https://blog-t-server.vercel.app/comments`,
                {
                    blogId: blog._id,
                    userId: user?.uid,
                    userName: user?.displayName,
                    userProfilePicture: user?.photoURL,
                    comment: newComment,
                },
                { withCredentials: true }
            )
            .then(() => {
                setNewComment("");
                Swal.fire({
                    icon: "success",
                    title: "Comment added successfully!",
                    showConfirmButton: true,
                    timer: 1000,
                });
                axios
                    .get(`https://blog-t-server.vercel.app/comments`, { params: { blogId: blog._id } })
                    .then((response) => {
                        setComments(response.data);
                    });
            })
            .catch((error) => {
                console.error("Error posting comment:", error);
            });
    };

    return (
        <section className="bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto p-4 dark:bg-gray-900">
                {/* Blog Details */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:flex gap-5">
                    <figure className="flex-1">
                        <img className="rounded-lg w-full" src={blog.imageUrl} alt="" />
                    </figure>
                    <div className="flex-1 space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{blog.title}</h2>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">By {blog.author}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Date: {blog.createdAt}</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{blog.shortDescription}</p>
                        <p className="inline-block text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded">
                            {blog.category}
                        </p>

                        <p className="text-gray-600 dark:text-gray-200">{blog.longDescription}</p>

                        {/* Update Button */}
                        {user?.email === blog.author && (
                            <button
                                onClick={() => navigate(`/blogs/update/${blog._id}`)}
                                className="btn bg-blue-500 text-white rounded border-none"
                            >
                                Update Blog
                            </button>
                        )}
                    </div>
                </div>



                {/* Comments Section */}
                <div className="mt-6 md:flex md:gap-5">
                    {/* show comments */}
                    <div className="mt-4 flex-1">
                        <h3 className="text-xl font-bold mb-4 dark:text-gray-100">Comments</h3>
                        {comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="p-4 border-b border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center mb-2">
                                    <img
                                        src={comment.userProfilePicture}
                                        alt={comment.userName}
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <span className="font-bold dark:text-gray-100">
                                        {comment.userName}
                                    </span>
                                </div>
                                <p className="dark:text-gray-300">{comment.comment}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* comment textarea */}
                    <div className="flex-1">
                        {user?.email === blog.author ? (
                            <p className="text-red-500 dark:text-red-400">
                                Cannot comment on your own blog.
                            </p>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold mb-4 dark:text-gray-100">Write a Comment</h3>
                                <textarea
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                ></textarea>
                                <button
                                    onClick={handleCommentSubmit}
                                    className="btn bg-green-500 text-white font-bold rounded mt-2 border-none hover:bg-green-700"
                                >
                                    Post Comment
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;

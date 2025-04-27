import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
          <Container>
  <div className="max-w-3xl mx-auto border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white relative">
    <img
      src={appwriteService.getFilePreview(post.featuredImage)}
      alt={post.title}
      className="rounded-xl w-full max-h-72 object-cover mb-4"
    />

    {isAuthor && (
      <div className="absolute right-5 top-5 flex space-x-3 bg-white bg-opacity-90 rounded-md p-2 shadow-md z-10">
        <Link to={`/edit-post/${post.$id}`}>
          <Button
            bgColor="bg-green-500"
            className="px-4 py-1 text-sm hover:bg-green-600 transition-colors duration-300"
          >
            Edit
          </Button>
        </Link>
        <Button
          bgColor="bg-red-500"
          onClick={deletePost}
          className="px-4 py-1 text-sm hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </Button>
      </div>
    )}

    <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{post.title}</h1>

    <div className="browser-css prose max-w-none text-gray-800 leading-relaxed">
      {parse(post.content)}
    </div>
  </div>
</Container>
        </div>
    ) : null;
}
// GetPosts.js
import React, { useEffect, useState } from "react";
import useGetPosts from "./useGetPosts";
import { Address } from "viem";
import { formatDate, shortenAccount } from "@/utils";

type Props = {};

const GetPosts = (props: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const fetchPosts = useGetPosts();

  useEffect(() => {
    fetchPosts(0, 14).then((data) => {
      const formattedData = (data as unknown as any[]).map((post) =>
        formatPost(post)
      );

      setPosts(formattedData);
    });
  }, [fetchPosts]);

  return (
    <>
      <h2 className="items-center justify-center mx-auto text-center mt-10 text-3xl">
        All Posts
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border-2 rounded-2xl p-4">
            <h2>{post.content}</h2>
            <p>Posted by: {shortenAccount(post.poster)}</p>
            <p>Time posted: {formatDate(post.timePosted)}</p>
            <p>Tips: {post.tips}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default GetPosts;

const formatPost = (post: any): IPost => ({
  id: Number(post.id),
  timePosted: Number(post.timePosted),
  tips: Number(post.tips),
  content: post.content,
  poster: post.poster,
});

export interface IPost {
  content: string;
  id: number;
  poster: Address;
  timePosted: number;
  tips: number;
}

import React from "react";
import { CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import PostCategories from "./components/categories";
import db from "@/db";
import { categories, posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Badge } from "../ui/badge";

async function fetchPosts() {
  const res = await db.select().from(posts).orderBy(desc(posts.createdAt)).innerJoin(users, eq(posts.userId, users.id)).innerJoin(categories, eq(posts.categoryId, categories.id));
  return res;
}

// interface PostProp {
//   id: string;
//   title: string;
//   image: string;
//   author: {
//     username: string;
//     image: string;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

export default async function Posts() {
  const posts = await fetchPosts();
  return (
    <div>
      <PostCategories />
      <h1 className="text-xl font-bold my-5">Latest posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.posts.id} className="pt-0">
            <Image
              src={post.posts.image || ""}
              alt="Shadowspace"
              height={1000}
              width={1000}
              loading="lazy"
              quality={80}
              className="mb-2 rounded-md object-cover max-w-full"
            />
            <Link href={`/posts/post/${post.posts.id}`}>
              <CardTitle>{post.posts.title}</CardTitle>
            </Link>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={post.users.image || ""} />
                    <AvatarFallback>{post.users.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardDescription>{post.users.name}</CardDescription>
                    <CardDescription>{post.posts.createdAt?.toLocaleDateString()}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{post.categories.name}</Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

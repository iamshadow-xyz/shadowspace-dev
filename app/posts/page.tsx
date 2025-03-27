import db from "@/db";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default async function page() {
  const AllPosts = await db.select().from(posts).innerJoin(users, eq(users.id, posts.user))
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AllPosts.map((post) => (
          <Card key={post.post.id} className="h-full">
            {post.post.image ? (
              <>
                <CardHeader className="pt-0">
                  <Image
                    src={post.post.image}
                    alt="Post Image"
                    width={1000}
                    height={1000}
                    className="rounded-lg h-40 object-cover w-full max-w-full shadow-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold mb-2">{post.post.title}</CardTitle>
                  <p className="text-gray-600">{post.post.content}</p>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="flex flex-col items-start">
                  <CardTitle className="text-xl font-semibold mb-2">{post.post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{post.post.content}</p>
                </CardContent>
              </>
            )}
            <CardFooter className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={post.user.image || ""} />
                <AvatarFallback>{post.user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{post.user.name}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
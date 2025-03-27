import db from "@/db";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default async function page() {
  // Get all users with their posts
  const allUsers = await db
    .select()
    .from(users)
    .leftJoin(posts, eq(posts.user, users.id));

  // Group posts by user
  const usersWithPosts = allUsers.reduce((acc, current) => {
    const userId = current.user.id;

    if (!acc[userId]) {
      acc[userId] = {
        user: current.user,
        posts: [],
      };
    }

    // Only add post if it exists (not null)
    if (current.post) {
      acc[userId].posts.push(current.post);
    }

    return acc;
  }, {} as Record<string, { user: (typeof allUsers)[0]["user"]; posts: (typeof allUsers)[0]["post"][] }>);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(usersWithPosts).map((userData) => (
          <Card key={userData.user.id} className="h-full">
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src={userData.user.image || ""} />
                <AvatarFallback>{userData.user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-semibold">
                  {userData.user.name}
                </CardTitle>
                <p className="text-sm text-gray-500">{userData.user.email}</p>
              </div>
            </CardHeader>

            <CardContent>
              <h3 className="font-medium mb-2">
                Posts ({userData.posts.length})
              </h3>
              {userData.posts.length > 0 ? (
                <div className="space-y-3">
                  {userData.posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="border rounded-md p-3">
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.content}
                      </p>
                      {post.image && (
                        <div className="mt-2">
                          <Image
                            src={post.image}
                            alt="Post Image"
                            width={300}
                            height={200}
                            className="rounded-md h-24 object-cover w-full"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {userData.posts.length > 3 && (
                    <p className="text-sm text-blue-500">
                      +{userData.posts.length - 3} more posts
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No posts yet</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

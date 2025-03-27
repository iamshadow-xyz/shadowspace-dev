import db from "@/db";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const Posts = await db.select().from(posts).innerJoin(users, eq(users.id, posts.user))
  const user = Posts[0].user
  return (
    <div className="container">
      <h1>{user.name}</h1>
      <p>{Posts[0].post.title}</p>
    </div>
  );
}

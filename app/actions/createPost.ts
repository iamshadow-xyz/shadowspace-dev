"use server"
import { auth } from "@/auth";
import db from "@/db";
import { posts } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  try {
    const session = await auth();

    // Check if user is authenticated
    if (!session || !session.user || !session.user.id) {
      return {
        success: false,
        error: "You must be logged in to create a post",
      };
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const userId = session.user.id;

    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    await db.insert(posts).values({
      title,
      content,
      image: image || null,
      user: userId,
    });

    revalidatePath("/posts");
    return { success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

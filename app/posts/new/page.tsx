"use client";

import { createPostAction } from "@/app/actions/createPost";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";

export default function PostsPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", e.currentTarget.title.value);
    formData.append("content", e.currentTarget.content.value);
    formData.append("image", uploadedImageUrl || "");

    const result = await createPostAction(formData);

    if (result.success) {
      alert("Post created successfully!");
      // Reset form
      setFormData({
        title: "",
        content: "",
      });
      setUploadedImageUrl(null);
    } else {
      alert(result.error || "Failed to create post");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image (Optional)</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                setUploadedImageUrl(res[0].ufsUrl);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Upload failed: ${error.message}`);
            }}
          />

          {uploadedImageUrl && (
            <div className="mt-2">
              <img
                src={uploadedImageUrl}
                alt="Preview"
                className="h-32 object-cover rounded"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

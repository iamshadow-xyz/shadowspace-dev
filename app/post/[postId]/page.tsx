interface Props {
  params: Promise<{ postId: string }>;
}

export default async function page({ params }: Props) {
  const { postId } = await params;
  return (
    <div className="container">
      <h1>Single post page of : {postId}</h1>
    </div>
  );
}

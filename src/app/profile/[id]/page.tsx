type PageParams = {
  params: {
    id: string;
  };
};

export default function UserProfilePage({ params }: PageParams) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-4xl">
        UserProfilePage{" "}
        <span className="bg-blue-500 text-black px-2">{params.id}</span>
      </p>
    </div>
  );
}

import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-2xl">
        You are not authorized to check this page plz go back to home
      </p>
      <Link href={"/"}>Home</Link>
    </div>
  );
}

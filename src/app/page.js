import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutButton from "./components/LogoutButton";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col gap-6 items-center justify-center">
        <h1 className="text-4xl">You are not authenticated</h1>
        <Link href="/login" className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200">Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl">Welcome to the protected home page</h1>
      <p>Hi, {session?.user?.email}</p>
      <LogoutButton />
    </div>
  );
}

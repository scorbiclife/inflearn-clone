import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <div>
        <p>{`현재 로그인한 유저는 ${session.user.email}입니다.`}</p>
        <SignOut />
      </div>
    );
  } else {
    return (
      <div>
        <p>현재 로그인 상태가 아닙니다.</p>
        <Link href="/signin">로그인</Link>
      </div>
    )
  }
}

export function SignOut() {
  async function handleSubmit() {
    "use server";
    await signOut();
  }
  return (
    <form action={handleSubmit}>
      <button type="submit">로그아웃</button>
    </form>
  );
}

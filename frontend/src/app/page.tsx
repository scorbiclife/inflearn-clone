import { authUser, signOut } from "@/auth";
import Link from "next/link";
import { ROUTE_SIGNIN } from "@/config/routes";

export default async function Home() {
  const user = await authUser();
  if (user) {
    return (
      <div>
        <p>{`현재 로그인한 유저는 ${user.email}입니다.`}</p>
        <SignOut />
      </div>
    );
  } else {
    return (
      <div>
        <p>현재 로그인 상태가 아닙니다.</p>
        <Link href={ROUTE_SIGNIN}>로그인</Link>
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

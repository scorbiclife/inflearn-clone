"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { ROUTE_HOME, ROUTE_SIGNUP } from "@/config/routes";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirectTo: ROUTE_HOME,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="text-gray-700">인프런 계정으로 로그인할 수 있어요.</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 min-w-[300px]">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@inflab.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-1 border border-2 rounded-sm border-gray-300"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="px-2 py-1 border border-2 rounded-sm border-gray-300"
        />
        <button
          type="submit"
          className="px-2 py-1 rounded-sm bg-green-600 text-white font-bold hover:bg-green-500">
          로그인
        </button>

        <Link
          href={ROUTE_SIGNUP}
          className="px-2 py-1 rounded-sm text-center border border-1 border-gray-700">
          회원가입
        </Link>
      </form>
    </div>
  );
}

"use client";

import { signUp } from "@/app/actions/auth-actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인 문자가 일치하지 않습니다!");
      return;
    }

    const result = await signUp({ email, password });
    if (result.status === "ok") {
      redirect("/signin");
    }
    if (result.status === "error") {
      alert(result.message);
    }
    alert("알 수 없는 오류입니다.")
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-3xl font-bold">회원 가입</h1>
      <p className="text-gray-700">인프런에서 다양한 학습의 기회를 얻으세요.</p>

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
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="password"
          className="px-2 py-1 border border-2 rounded-sm border-gray-300"
        />
        <button
          type="submit"
          className="px-2 py-1 rounded-sm bg-green-600 text-white font-bold hover:bg-green-500">
          회원가입
        </button>

        <Link
          href="/signin"
          className="px-2 py-1 rounded-sm text-center border border-1 border-gray-700">
          로그인
        </Link>
      </form>
    </div>
  );
}

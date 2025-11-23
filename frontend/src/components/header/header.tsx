import React, { JSX } from "react";
import Link from "next/link";
import { auth } from "@/auth";

const NAV_ITEMS = ["강의", "로드맵", "멘토링", "커뮤니티"];

export default async function Header(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="inline-flex items-center">
              <img
                src="https://cdn.inflearn.com/assets/images/header/inflearn_logo_default.svg"
                alt="inflearn"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex md:flex-1 md:justify-center">
            <ul className="flex items-center space-x-8">
              {NAV_ITEMS.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: User menus */}
          <div className="flex items-center space-x-4">
            <Link
              href="/instructor"
              className="text-sm font-medium text-gray-700 hover:text-gray-900">
              지식공유
            </Link>

            {session?.user ? (
              <button
                type="button"
                aria-label="Profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="h-9 w-9 object-cover"
                />
              </button>
            ) : (
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 transition-colors">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

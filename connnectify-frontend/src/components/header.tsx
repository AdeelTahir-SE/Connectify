"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import RegisterationModal from "./registeration-modal";
import Image from "next/image";
import { useUser } from "@/utils/context";

export default function Header() {
  const [isModalActive, setIsModalActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {user} = useUser();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        isModalActive &&
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsModalActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <nav className="sticky top-0 z-50 bg-transparent flex items-center justify-center w-full text-purple-800">
      <ul className="flex items-center text-xl justify-between font-bold p-2 px-12 w-full">
        <li>
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-purple-600"
          >
            <Image
              src="/star-shine.svg"
              width={50}
              height={50}
              alt="Logo"
              priority
            />
            Connectify
          </Link>
        </li>
        <li>
          {user?.name?(
            <Link
              href="/dashboard"
              className="cursor-pointer hover:text-purple-600"
            >
              {user?.name}
            </Link>
          ):(
            <button
              ref={buttonRef}
              onClick={() => setIsModalActive((prev) => !prev)}
              className="cursor-pointer"
            >
              {user?.name ?? "Signup"}
            </button>
          )}
          
        </li>
      </ul>

      {isModalActive && (
        <div
          ref={modalRef}
          className="absolute top-full left-0 w-full bg-white shadow-lg z-50"
        >
          <RegisterationModal />
        </div>
      )}
    </nav>
  );
}

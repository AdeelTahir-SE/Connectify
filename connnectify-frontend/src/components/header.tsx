"use client";
import RegisterationModal from "./registeration-modal";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isModalActive &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsModalActive(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalActive]);

  return (
    <nav className="flex flex-row items-center justify-center w-full text-purple-800">
      <ul className="flex flex-row items-center justify-end mr-4 font-bold p-2 w-full">
        <li
          ref={buttonRef}
          onClick={() => {
            setIsModalActive((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          Signup
        </li>
      </ul>
      {isModalActive && (
        <div ref={modalRef}>
          <RegisterationModal />
        </div>
      )}
    </nav>
  );
}

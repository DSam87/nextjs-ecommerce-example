"use client";

import { Session } from "next-auth";
import Image from "next/image";
import profilePicDefault from "@/assets/profile-pic-placeholder.png";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null;
}

function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image ? user.image : profilePicDefault}
            alt="profile pic"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <Image
            src={profilePicDefault}
            alt="profile pic"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default UserMenuButton;

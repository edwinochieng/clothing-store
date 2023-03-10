"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { signOut } from "next-auth/react";
import useStore from "@/store/store";

export const Account = () => {
  const clearCart = useStore((state) => state.clearCart);

  const logOutHandler = () => {
    clearCart();
    signOut({ callbackUrl: "/" });
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='outline-none'>
        <BiUser size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className='bg-white w-[150px] p-1 rounded shadow-lg '>
          <DropdownMenu.Item className='pl-4 cursor-pointer rounded hover:bg-gray-100 hover:outline-none'>
            <Link href='/orders'>My Orders</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={logOutHandler}
            className='pl-4 cursor-pointer rounded hover:bg-gray-100 hover:outline-none'
          >
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

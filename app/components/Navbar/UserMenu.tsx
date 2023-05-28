"use client";


import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import {  useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";

import {useRouter} from "next/navigation"
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
//this will show the user menu
//use state hook allows us to track state in a function component
// useState accepts an initial state and returns two values:


// The current state.
// A function that updates the state.

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  //callback hooks
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);


  const onRent = useCallback(()=>{
if(!currentUser){
  return loginModal.onOpen();


}
rentModal.onOpen();
  },[currentUser,loginModal,rentModal])
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer

            "
        >
          Wanderwise Your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src = {currentUser?.image}/>
          </div>
        </div>
      </div>
      {/* if the toggle fun is open we are going to render this div */}
      {isOpen && (
        <div
          className="
  absolute 
  rounded-xl
  shadow-md
  w-[40vw]
  md:w-3/4
  bg-white
  overflow-hidden
  right-0
  top-12
  text-sm


  "
        >
          <div
            className="
flex
flex-col
cursor-pointer"
          >
            {/* we will write some conditions on which the the menu bar will behave depending  upon if the user is logged in or not  */}

            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favourites" />
                <MenuItem onClick={() => {}} label="My Reservations" />
                <MenuItem onClick={() => {}} label="My Restraunts" />
{/* this home button will disappear on mobile phones */}

                <MenuItem onClick={rentModal.onOpen} label="WanderWise My Home" />
<hr />

                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

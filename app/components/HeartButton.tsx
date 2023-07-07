"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFav from "../hooks/useFavorite";
interface HeartButtonProps {
  listingID: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingID,
  currentUser,
}) => {
  const {hasFavorited,toggleFav} = useFav({
    listingID,
    currentUser
  });

  return (
    <div
      onClick={toggleFav}
      className="
    relative
    hover:opacity-80
    transition
    cursor-pointer
   
    
    ">
      <AiOutlineHeart
        size={28}
        className="
      fill-white
      absolute 
      -top-[2px]
      -right-[2px] 
      "
      />

      <AiFillHeart
        size={24}
        className={hasFavorited ? " fill-[#305cad]" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;

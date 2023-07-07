'use client'

import { IconType } from "react-icons/lib";

interface ButtonProps{
label:string;
onClick:(e:React.MouseEvent<HTMLButtonElement>)=> void;
disabled?:boolean;
outline?:boolean;
small?:boolean;
icon?:IconType;


}


const Button :React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon:Icon,

}) => {
  return (
   <button
   onClick={onClick}
   disabled={disabled}
   className={`
   relative
   disabled:opacity-70
   disabled:cursor-not-allowed
   rounded-lg
   hover:opacity-80
   transition
   w-full
   px-6
   py-2




   ${outline?'bg-white':'bg-[#305cad]'}
   ${outline?'border-black':'border-[#305cad]'}
   ${outline?'text-black':'text-white'}
   ${outline?'text-black':'text-white'}
   ${small?'py-1':'py-3'}
   ${small?'text-sm':'text-md'}
   ${small?'font-light':'font-semibold'}
   ${small?'border-[1px]':'border-2'}


   `}>

{/* we will add an option to add an icon here */}


{Icon &&(
    <Icon size={24}
    className="absolute
    left-4
    top-3
    "/>
)}

    {label}
   </button>
  )
}

export default Button

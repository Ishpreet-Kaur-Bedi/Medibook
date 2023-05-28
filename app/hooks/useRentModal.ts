// this hook will control whether the login modal is open or closed

import {create} from 'zustand';
 
interface RentModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}


const useRentModal = create<RentModalStore>((set)=>({
    isOpen:false,
    onOpen:()=> set({ isOpen:true}),
    onClose:()=>set({ isOpen:false}),

}));


export default useRentModal;

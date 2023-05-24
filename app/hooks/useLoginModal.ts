// this hook will control whether the login modal is open or closed

import {create} from 'zustand';
 
interface LoginModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}


const useLoginModal = create<LoginModalStore>((set)=>({
    isOpen:false,
    onOpen:()=> set({ isOpen:true}),
    onClose:()=>set({ isOpen:false}),

}));


export default useLoginModal;

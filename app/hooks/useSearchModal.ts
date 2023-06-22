// this hook will control whether the login modal is open or closed

import {create} from 'zustand';
 
interface searchModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}


const useSearchModal = create<searchModalStore>((set)=>({
    isOpen:false,
    onOpen:()=> set({ isOpen:true}),
    onClose:()=>set({ isOpen:false}),

}));


export default useSearchModal;

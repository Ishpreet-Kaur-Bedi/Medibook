
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback,useMemo } from "react";
import { Toast, toast
 } from "react-hot-toast";
 import { SafeUser } from "../types";
 import useLoginModal from "./useLoginModal";



interface IUseFav{

listingID:string;
currentUser?:SafeUser|null

}

const useFav=({
    listingID,
    currentUser
}:IUseFav)=>{


const router = useRouter()
const loginModal = useLoginModal()
const hasFavorited  = useMemo(()=>{
    const list = currentUser?.favoriteIds||[]

return list.includes((listingID));

},[currentUser,listingID]);

const toggleFav  = useCallback(async(
    e:React.MouseEvent<HTMLDivElement>
)=>{
    e.stopPropagation()

if(!currentUser){
    return loginModal.onOpen();
}
try{let request

if(hasFavorited){
    request=()=> axios.delete(`/api/favorites/${listingID}`)
}
else{
    request = ()=>axios.post(`/api/favorites/${listingID}`)
}
await request();
router.refresh()
toast.success('Success')

}
catch (error)
{
    toast.error('Something went wrong');
}

},
[
currentUser,
hasFavorited,
listingID,
loginModal,
router


])
return {hasFavorited,
toggleFav
}

}

export default useFav;
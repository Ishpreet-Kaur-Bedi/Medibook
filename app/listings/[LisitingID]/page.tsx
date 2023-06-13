import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingbyID'


import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';


interface IParams{
    listingID?:string  ;
}

const ListingPage = async({params}:{params:IParams}) => {

const listing = await getListingById(params)
const currentUser = await getCurrentUser()
if(!listing){
    return(
<ClientOnly>
    <EmptyState/>
</ClientOnly>


    )
}
  return (
    <div>

        <ClientOnly>
            <ListingClient
    listing = {listing}
        currentUser ={currentUser}
        
        />

        </ClientOnly>

    </div>
  )
}

export default ListingPage

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingbyID";
import getReservations from "@/app/actions/getreservations";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingID?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById({ listingID: params.listingID });

  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  if (!currentUser) {
    return null; // or return a loading state or handle the null case in another way
  }
  const formattedUser = {
    ...currentUser,
    createdAt: currentUser.createdAt.toString(),
    updatedAt: currentUser.updatedAt.toString(),
    emailVerified: currentUser.emailVerified?.toString() || null,
  };
  const formattedListing = {
    ...listing,
    createdAt: listing.createdAt.toString(),
    user: formattedUser,
  };
  return (
    <div>
    {listing.title}
    </div>
  );
};

export default ListingPage;
"use client";
import { useRouter } from "next/navigation";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, SafeListing } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { error } from "console";
import ListingCard from "../components/listings/ListingCard";
import Footer from "../components/Footer";
interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingID, setDeletingID] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingID(id);

      axios
        .delete(`/api/listings/${id}`)

        .then(() => {
          toast.success("Hospital deleted");
          router.refresh();
        })

        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })

        .finally(() => {
          setDeletingID(" ");
        });
    },
    [router]
  );
  return (
    <div>
      <Container>
      <Heading title="Hospitals" subtitle="Discover our extensive collection of top-notch hospitals, where exceptional care meets architectural brilliance." />

      <div
        className="mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingID === listing.id}
            actionLabel=" Delete Hospital"
            currentUser={currentUser}
          />
        ))}
      </div>
      
    </Container>
   
    </div>
  );
};

export default TripsClient;

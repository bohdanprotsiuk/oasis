import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
    const { bookingID } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["bookings", bookingID],
        queryFn: () => getBooking(bookingID),
        retry: false,
    });

    return { data, isLoading };
}

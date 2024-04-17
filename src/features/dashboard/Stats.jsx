/* eslint-disable react/prop-types */
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings, confirmedStays, numDays, numCabins }) {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const checkins = confirmedStays.length
    const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * numCabins)
    return (
        <>
            <Stat
                title="bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check-ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + '%'}
            />
        </>
    );
}

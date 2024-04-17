import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmedPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    const moveBack = useMoveBack();

    const { settings, isLoading: isLoadingSettings } = useSettings();
    const { mutate, isLoading: isCheckingin } = useCheckin();
    const { data, isLoading } = useBooking();

    useEffect(() => {
        setConfirmedPaid(data?.isPaid ?? false);
    }, [data]);

    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = data;

    const breakfastPrice = settings.breakfastPrice * numNights * numGuests;

    function handleCheckin() {

        if (addBreakfast) {
            mutate({bookingId, breakfast:{
                hasBreakfast: true,
                extrasPrice: breakfastPrice,
                totalPrice: totalPrice + breakfastPrice,
            }});
        } else mutate({bookingId, breakfast: {}});
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={data} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((v) => !v);
                            setConfirmedPaid(false);
                        }}
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(breakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmedPaid((v) => !v)}
                    disabled={confirmPaid}
                    id="breakfast"
                >
                    I confirm that {guests.fullname} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + breakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              breakfastPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingin}
                    id="checkin"
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;

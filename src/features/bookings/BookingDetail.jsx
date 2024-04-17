import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { data, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking } = useDeleteBooking();
    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (!data) return <Empty resource="booking" />;

    const { status, id } = data;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={data} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/checkin/${id}`)}>
                        Check In
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        onClick={() => checkout(id)}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}
                <Modal>
                    <Modal.Open opens="delete">
                        <Button variation="danger">Delete</Button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            onConfirm={() => {
                                deleteBooking(id, { onSettled: moveBack() });
                            }}
                        />
                    </Modal.Window>
                </Modal>

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;

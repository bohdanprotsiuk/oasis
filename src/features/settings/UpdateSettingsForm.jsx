import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            minBookingsLength,
            maxBookingsLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {},
    } = useSettings();
    const { isEditing, editSettings } = useEditSettings();

    if (isLoading) return <Spinner />;

    function handleUpdate(e, fieldName) {
        const {value} = e.target

        if(!value) return
        editSettings({[fieldName]: value})
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingsLength}
                    onBlur={(e) => handleUpdate(e, 'minBookingsLength')}
                    disabled={isEditing}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingsLength}
                    onBlur={(e) => handleUpdate(e, 'maxBookingsLength')}
                    disabled={isEditing}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
                    disabled={isEditing}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
                    disabled={isEditing}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;

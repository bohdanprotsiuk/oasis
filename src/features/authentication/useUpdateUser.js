import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateUserData,
        onSuccess: ({user}) => {
            toast.success("User successfully edited");
            queryClient.setQueryData(['user'], user)
        },
        onError: (err) => toast.error(err.message),
    });
    
    return {updateUser, isUpdating}
}
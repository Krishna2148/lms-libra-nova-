import Button from "@/components/Button";
import SelectUseForm from "@/components/Table/SelectUseForm";
import Toast from "@/components/Toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useGetAllBooksQuery } from "@/redux/book-mgmt/bookApiSlice";
import { useAddReservationMutation } from "@/redux/reservation/reservationApiSlice";
import { useGetAllUsersQuery } from "@/redux/user-mgmt/user/userApiSlice"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

const AddEditReservation = ({ open, setOpen }: any) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [addReservation, { isLoading: addLoading }] = useAddReservationMutation();
    const { data: memberDetails } = useGetAllUsersQuery({});
    const [memberData, setMemberData] = useState([]);
    const { data: bookDetails } = useGetAllBooksQuery({})
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        if (memberDetails) {
            setMemberData(memberDetails?.data?.content)
        } else {
            setMemberData([])
        }
    }, [memberDetails])

    useEffect(() => {
        if (bookDetails) {
            setBookData(bookDetails?.data?.content)
        } else {
            setBookData([])
        }
    }, [bookDetails])

    const onSubmit = async (data: any) => {
        const bookId = Number(data?.bookId)
        const memberId = Number(data?.memberId)
        const payload = {
            bookId,
            memberId,
        }
        try {
            const response = await addReservation({ body: payload, bookId: bookId, memberId: memberId }).unwrap();
            if (response.success) {
                Toast(response.message, "success");
                setOpen(false);
                reset();
            } else {
                Toast(response.message || "Something went wrong", "error");
            }

        } catch (err: any) {
            Toast(err?.data?.message || err.message || "Something went wrong", "error");
        }
    }
    const handleCancel = () => {
        setOpen(false)
        reset()
    }
    const handleDialogChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            reset();
        }
    };

    const memberOption = memberData?.map((item: any) => ({
        value: item.id,
        label: `${item.firstName} ${item.middleName} ${item.lastName} (${item.phoneNumber})`,
    }))
    const bookOption = bookData?.map((item: any) => ({
        value: item.id,
        label: `${item.title} (Available: ${item.availableCopies})`,
    }))

    return (
        <>
            <Dialog open={open} onOpenChange={handleDialogChange} >
                <DialogTrigger></DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Reservation</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1rem]">
                        <SelectUseForm required
                            label="Select Member"
                            register={register}
                            name="memberId"
                            options={memberOption}
                            error={errors.memberId?.message}
                        />
                        <SelectUseForm required
                            label="Select a Book"
                            register={register}
                            name="bookId"
                            options={bookOption}
                            error={errors.bookId?.message}
                        />
                        <div className="flex justify-end gap-2">
                            <Button color="#f7f7f7" textColor="black" handleClick={handleCancel}>Cancel</Button>
                            <Button type="submit" disabled={addLoading}>{addLoading ? "Loading..." : "Submit"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddEditReservation
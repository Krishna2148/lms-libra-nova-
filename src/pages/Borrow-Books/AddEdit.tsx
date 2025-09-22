import Button from "@/components/Button";
import SelectUseForm from "@/components/Table/SelectUseForm";
import Toast from "@/components/Toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGetAllBooksQuery } from "@/redux/book-mgmt/bookApiSlice";
import { useAddBorrowBookMutation, useGetSingleBorrowBookQuery, useUpdateBorrowBookMutation } from "@/redux/borrow-book/borrowApiSlice";
import { useGetAllUsersQuery } from "@/redux/user-mgmt/user/userApiSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddEditBorrow = ({ open, setOpen, borrowId }: any) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [books, setBooks] = useState([])
    const [borrower, setBorrower] = useState([])

    const { data: bookData } = useGetAllBooksQuery({});
    const { data: borrowerData } = useGetAllUsersQuery({});
    const { data: borrowBookData } = useGetSingleBorrowBookQuery(borrowId, { skip: !borrowId });

    const [addBorrow, { isLoading: addLoading }] = useAddBorrowBookMutation();
    const [updateBorrow, { isLoading: updateLoading }] = useUpdateBorrowBookMutation();

    useEffect(() => {
        if (bookData) {
            setBooks(bookData.data.content)
        } else {
            setBooks([])
        }
    }, [bookData])

    useEffect(() => {
        if (borrowerData) {
            setBorrower(borrowerData.data.content)
        } else {
            setBorrower([])
        }
    }, [borrowerData])

    useEffect(() => {
        if (borrowBookData?.data) {
            reset({
                books: borrowBookData.data.books?.id,
                user: borrowBookData.data.users?.id,
            });
        }
    }, [borrowBookData, reset])

    const bookOption = books.map((item: any) => ({
        label: item.title,
        value: item.id
    }))

    const borrowerOption = borrower.map((item: any) => ({
        label: `${item.firstName} ${item.middleName} ${item.lastName}`,
        value: item.id
    }))
    const handleCancle = () => {
        setOpen(false)
        reset()
    }

    const onSubmit = async (data: any) => {
        const payload = {
            books: {
                id: Number(data.books),
            },
            users: {
                id: Number(data.user),
            },
        }
        try {
            if (borrowId) {
                const response = await updateBorrow({ id: borrowId, body: payload }).unwrap();
                if (response.success) {
                    Toast(response.message, "success");
                    setOpen(false);
                    reset();
                } else {
                    Toast(response.message || "Something went wrong", "error");
                }
            } else {
                const response = await addBorrow(payload).unwrap();
                if (response.success) {
                    Toast(response.message, "success");
                    setOpen(false);
                    reset();
                } else {
                    Toast(response.message || "Something went wrong", "error");
                }
            }
        } catch (e: any) {
            Toast(e?.data?.message || e.message || "Something went wrong", "error");
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[400px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Borrow Books</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <SelectUseForm required
                            label="Select Book"
                            name={"books"}
                            register={register}
                            options={bookOption}
                            error={errors.books?.message}
                        />
                        <SelectUseForm required
                            label="Select Borrower"
                            name={"user"}
                            register={register}
                            options={borrowerOption}
                            error={errors.user?.message}
                        />
                        <div className="flex justify-end gap-2">
                            <Button color="#f7f7f7" textColor="black" handleClick={handleCancle}>Cancel</Button>
                            <Button type="submit" disabled={addLoading || updateLoading}>{addLoading || updateLoading ? "Loading..." : "Submit"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddEditBorrow
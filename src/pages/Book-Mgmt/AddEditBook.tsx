import Button from "@/components/Button";
import InputUseForm from "@/components/Input/UseFormInput";
import Toast from "@/components/Toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddBookMutation, useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/book-mgmt/bookApiSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
    open: boolean,
    setOpen: any,
    selectedBook?: any
}
interface BookType {
    title: string,
    author: string,
    genre: string,
    publisher: string,
    isbn: string,
    availableCopies: number,
    totalCopies: number
}
const AddEditBook = ({ open, setOpen, selectedBook }: ModalProps) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<BookType>();

    const [addBook, { isLoading: addLoading }] = useAddBookMutation();
    const [editBook, { isLoading: editLoading }] = useUpdateBookMutation();
    const { data: bookDetails } = useGetSingleBookQuery(selectedBook, {
        skip: !selectedBook
    });

    useEffect(() => {
        if (bookDetails?.data) {
            reset({
                title: bookDetails.data.title,
                author: bookDetails.data.author,
                genre: bookDetails.data.genre,
                publisher: bookDetails.data.publisher,
                isbn: bookDetails.data.isbn,
                availableCopies: bookDetails.data.availableCopies,
                totalCopies: bookDetails.data.totalCopies,
            });
        } else {
            reset();
        }
    }, [bookDetails, reset]);

    const onSubmit = async (data: BookType) => {
        const payload = {
            title: data.title,
            author: data.author,
            genre: data.genre,
            publisher: data.publisher,
            isbn: data.isbn,
            availableCopies: data.availableCopies,
            totalCopies: data.totalCopies,
        };
        console.log(payload, "6++");

        try {
            let response;
            if (selectedBook) {
                response = await editBook({ id: selectedBook, body: payload }).unwrap();
            } else {
                response = await addBook(payload).unwrap();
            }
            if (response?.success) {
                Toast(response.message, "success");
                setOpen(false);
                reset();
            } else {
                Toast(response.message || "Something went wrong", "error");
            }
        } catch (e: any) {
            Toast(e?.data?.message || e.message || "Something went wrong", "error");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="md:max-w-[700px] border-0 shadow-none bg-white">
                <DialogHeader>
                    <DialogTitle>{selectedBook ? "Edit Book" : "Add Book"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <InputUseForm label="Title" required placeholder="Enter Title"
                            {...register("title", { required: "Title is required" })}
                            error={errors.title?.message}
                        />
                        <InputUseForm label="Author" required placeholder="Enter Author"
                            {...register("author", { required: "Author is required" })}
                            error={errors.author?.message}
                        />
                        <InputUseForm label="Genre" required placeholder="Enter Genre"
                            {...register("genre", { required: "Genre is required" })}
                            error={errors.genre?.message}
                        />
                        <InputUseForm label="Publisher" required placeholder="Enter Publisher"
                            {...register("publisher", { required: "Publisher is required" })}
                            error={errors.publisher?.message}
                        />
                        <InputUseForm label="ISBN" required placeholder="Enter ISBN"
                            {...register("isbn", { required: "ISBN is required" })}
                            error={errors.isbn?.message}
                        />
                        <InputUseForm label="Available Copies" required placeholder="Enter Available Copies"
                            {...register("availableCopies", { required: "Available Copies is required" })}
                            error={errors.availableCopies?.message}
                        />
                        <InputUseForm label="Total Copies" required placeholder="Enter Total Copies"
                            {...register("totalCopies", { required: "Total Copies is required" })}
                            error={errors.totalCopies?.message}
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button handleClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={addLoading || editLoading}>
                            {selectedBook ? "Update" : "Submit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddEditBook;
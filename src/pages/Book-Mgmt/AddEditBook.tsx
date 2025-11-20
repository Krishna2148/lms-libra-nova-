import Button from "@/components/Button";
import ImageUploader from "@/components/Image";
import InputUseForm from "@/components/Input/UseFormInput";
import Toast from "@/components/Toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddBookMutation, useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/book-mgmt/bookApiSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
    open: boolean;
    setOpen: any;
    selectedBook?: any;
}

interface BookType {
    title: string;
    author: string;
    genre: string;
    publisher: string;
    isbn: string;
    availableCopies: number;
    totalCopies: number;
}

const AddEditBook = ({ open, setOpen, selectedBook }: ModalProps) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<BookType>();

    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [existingFileName, setExistingFileName] = useState<string>("");

    const [addBook, { isLoading: addLoading }] = useAddBookMutation();
    const [editBook, { isLoading: editLoading }] = useUpdateBookMutation();
    const { data: bookDetails } = useGetSingleBookQuery(selectedBook, { skip: !selectedBook });

    const imageBaseUrl = "http://localhost:8080/pics/";

    useEffect(() => {
        if (bookDetails?.data) {
            const book = bookDetails.data;
            reset({
                title: book.title,
                author: book.author,
                genre: book.genre,
                publisher: book.publisher,
                isbn: book.isbn,
                availableCopies: book.availableCopies,
                totalCopies: book.totalCopies,
            });
            // Set existing file name and preview if available
            if (book.documents?.[0]?.fileName) {
                const fileName = book.documents[0].fileName;
                setExistingFileName(fileName);
                setPreview(`${imageBaseUrl}${fileName}`);
            } else {
                setExistingFileName("");
                setPreview("");
            }
        } else {
            reset();
            setPreview("");
            setExistingFileName("");
            setDocumentFile(null);
        }
    }, [bookDetails, reset]);

    const handleDocumentSelect = (file: File | null) => {
        setDocumentFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            // If no file selected, revert to existing image
            if (existingFileName) {
                setPreview(`${imageBaseUrl}${existingFileName}`);
            } else {
                setPreview("");
            }
        }
    };

    const handleDeleteDocument = () => {
        setDocumentFile(null);
        setPreview("");
        setExistingFileName(""); // Clear existing file name when deleted
    };

    const onSubmit = async (data: BookType) => {
        const formData = new FormData();

        // Append book DTO as blob (same as POST request)
        formData.append("bookDto", new Blob([JSON.stringify(data)], { type: "application/json" }));

        // Append new document if exists
        if (documentFile) {
            formData.append("documents", documentFile);
            formData.append("documentTypes", "BOOK_DOCUMENT");
        }

        // Handle document deletion - if preview is empty, it means image was deleted
        if (!preview && existingFileName) {
            formData.append("deletedDocuments", JSON.stringify([existingFileName]));
        }

        try {
            let response;
            if (selectedBook) {
                // Use the same FormData approach for both add and edit
                response = await editBook({ id: selectedBook, body: formData }).unwrap();
            } else {
                response = await addBook(formData).unwrap();
            }

            if (response?.success) {
                Toast(response.message, "success");
                setOpen(false);
                reset();
                setDocumentFile(null);
                setPreview("");
                setExistingFileName("");
            } else {
                Toast(response.message || "Something went wrong", "error");
            }
        } catch (e: any) {
            console.error("Submission error:", e);
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
                        <InputUseForm
                            label="Title"
                            required
                            placeholder="Enter Title"
                            {...register("title", { required: "Title is required" })}
                            error={errors.title?.message}
                        />
                        <InputUseForm
                            label="Author"
                            required
                            placeholder="Enter Author"
                            {...register("author", { required: "Author is required" })}
                            error={errors.author?.message}
                        />
                        <InputUseForm
                            label="Genre"
                            required
                            placeholder="Enter Genre"
                            {...register("genre", { required: "Genre is required" })}
                            error={errors.genre?.message}
                        />
                        <InputUseForm
                            label="Publisher"
                            required
                            placeholder="Enter Publisher"
                            {...register("publisher", { required: "Publisher is required" })}
                            error={errors.publisher?.message}
                        />
                        <InputUseForm
                            label="ISBN"
                            required
                            placeholder="Enter ISBN"
                            {...register("isbn", { required: "ISBN is required" })}
                            error={errors.isbn?.message}
                        />
                        <InputUseForm
                            label="Available Copies"
                            required
                            placeholder="Enter Available Copies"
                            {...register("availableCopies", { 
                                required: "Available Copies is required",
                                min: { value: 0, message: "Available copies cannot be negative" }
                            })}
                            error={errors.availableCopies?.message}
                            type="number"
                        />
                        <InputUseForm
                            label="Total Copies"
                            required
                            placeholder="Enter Total Copies"
                            {...register("totalCopies", { 
                                required: "Total Copies is required",
                                min: { value: 1, message: "Total copies must be at least 1" }
                            })}
                            error={errors.totalCopies?.message}
                            type="number"
                        />

                        {/* SINGLE IMAGE UPLOADER */}
                        <div className="col-span-2">
                            <ImageUploader
                                onImageSelect={handleDocumentSelect}
                                previewURL={preview}
                                handleDeleteImage={handleDeleteDocument}
                                label="Book Document"
                                required={!selectedBook} // Required only for new books
                                existingImageUrl={preview}
                            />
                        </div>
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
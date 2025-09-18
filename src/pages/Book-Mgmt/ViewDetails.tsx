import DetailItem from "@/components/Input/Card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGetSingleBookQuery } from "@/redux/book-mgmt/bookApiSlice";
import moment from "moment";

interface ModalType {
    open: boolean;
    setOpen: (open: boolean) => void;
    viewId: number | null;
}

const ViewDetails = ({ open, setOpen, viewId }: ModalType) => {
    const { data: bookDetails, isLoading } = useGetSingleBookQuery(viewId, {
        skip: !viewId,
    });

    const book = bookDetails?.data;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white md:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle >View Book Details</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem label="ID" value={book?.id} direction="col" />
                        <DetailItem label="Title" value={book?.title} direction="col" />
                        <DetailItem label="Author" value={book?.author} direction="col" />
                        <DetailItem label="Publisher" value={book?.publisher} direction="col" />
                        <DetailItem label="ISBN" value={book?.isbn} direction="col" />
                        <DetailItem label="Genre" value={book?.genre} direction="col" />
                        <DetailItem label="Total Copies" value={book?.totalCopies} direction="col" />
                        <DetailItem label="Available Copies" value={book?.availableCopies} direction="col" />
                        <DetailItem
                            label="Available"
                            value={book?.isAvailable ? "Yes" : "No"}
                            direction="col"
                        />
                        <DetailItem label="Created At" value={moment(book?.createdAt).format("YYYY-MM-DD")} direction="col" />
                        <DetailItem label="Updated At" value={moment(book?.updatedAt).format("YYYY-MM-DD")} direction="col" />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewDetails;

import FormContainer from "@/components/Form-Container"
import DetailItem from "@/components/Input/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useGetSingleReservationQuery } from "@/redux/reservation/reservationApiSlice"

const ViewReservation = ({ open, setOpen, viewId }: any) => {
    const { data: reservation } = useGetSingleReservationQuery(viewId, {
        skip: !viewId
    })
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-[1rem]">View Reservation</DialogTitle>
                        <FormContainer>
                            <DetailItem label="ID" value={reservation?.data?.id || "-"} />
                            <DetailItem label="Member Name (ID)" value={`${reservation?.data?.memberName}(${reservation?.data?.memberId})`} />
                            <DetailItem label="Reservation Date" value={reservation?.data?.reservationDate || "-"} />
                            <DetailItem label="Book Name (ID)" value={`${reservation?.data?.bookTitle} (${reservation?.data?.bookId})`} />
                            <DetailItem label="Expiry Date" value={reservation?.data?.expiryDate || "-"} />
                            <DetailItem label="Notification Date" value={reservation?.data?.notificationDate || "-"  } />
                            <DetailItem label="Status" value={reservation?.data?.status || "-"} />
                        </FormContainer>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ViewReservation
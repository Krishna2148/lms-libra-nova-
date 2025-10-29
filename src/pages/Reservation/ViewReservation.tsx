import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useGetSingleReservationQuery } from "@/redux/reservation/reservationApiSlice"

const ViewReservation = ({ open, setOpen, viewId }: any) => {

    const { data: reservation } = useGetSingleReservationQuery(viewId,{
        skip: !viewId
    })

    console.log(reservation)
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle>View Reservation</DialogTitle>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ViewReservation
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from "react-hook-form";

const ReturnBook = ({ open, setOpen, returnId }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        const payload = {
            
        }
    };
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="bg-white md:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Return Book</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ReturnBook
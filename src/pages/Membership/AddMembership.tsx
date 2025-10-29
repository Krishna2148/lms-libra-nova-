import Button from "@/components/Button";
import SelectUseForm from "@/components/Table/SelectUseForm";
import Toast from "@/components/Toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAddMembershipMutation } from "@/redux/membership/membershipApiSlice";
import { useGetAllUsersQuery } from "@/redux/user-mgmt/user/userApiSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddMembership = ({ open, setOpen }: any) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [userData, setUserData] = useState([]);
  

    const { data: users } = useGetAllUsersQuery({});
    const [addMembership, { isLoading: addLoading }] = useAddMembershipMutation();

    useEffect(() => {
        if (users) {
            setUserData(users?.data?.content)
        } else {
            setUserData([])
        }
    }, [users])

    const userOptions = userData.map((user: any) => ({
        label: `${user.firstName} ${user.middleName} ${user.lastName} (${user.username})`,
        value: user.id
    }))

    const onSubmit = async (data: any) => {
        const userId = Number(data?.user)
        const payload = {
            userId,
            membershipType: data?.membershipType
        }
        console.log(payload)
        try {
            const response = await addMembership({ body: payload, id: userId }).unwrap();
            if (response.success) {
                Toast(response.message, "success");
                setOpen(false);
                reset();
            } else {
                Toast(response.message || "Something went wrong", "error");
            }

        } catch (e: any) {
            Toast(e?.data?.message || e.message || "Something went wrong", "error");
        }
    }
    const handleCancle = () => {
        setOpen(false)
        reset()
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="bg-white sm:w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add Membership</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1rem]">
                        <SelectUseForm required
                            label="Membership Type"
                            name="membershipType"
                            options={membershipOptions}
                            register={register}
                            error={errors.membershipType?.message}
                        />
                        <SelectUseForm required
                            label="User"
                            name="user"
                            options={userOptions}
                            register={register}
                            error={errors.user?.message}
                        />
                        <div className="flex justify-end gap-2">
                            <Button color="#f7f7f7" textColor="black" handleClick={handleCancle}>Cancel</Button>
                            <Button type="submit" disabled={addLoading} >{addLoading ? "Submitting..." : "Submit"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddMembership
const membershipOptions = [
    {
        label: "Student",
        value: "Student"
    },
    {
        label: "Regular",
        value: "Regular"
    },
    {
        label: "Premium",
        value: "Premium"
    }
]
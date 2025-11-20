import Button from "@/components/Button"
import InputUseForm from "@/components/Input/UseFormInput"
import SelectUseForm from "@/components/Table/SelectUseForm"
import Toast from "@/components/Toastify"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useGetAllRolesQuery } from "@/redux/user-mgmt/role/roleApiSlice"
import { useAddUserMutation } from "@/redux/user-mgmt/user/userApiSlice"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const AddEditUser = ({ open, setOpen }: any) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [getRole, setRole] = useState([])

  const [addUser, { isLoading: addLoading }] = useAddUserMutation();
  const { data: roleData } = useGetAllRolesQuery({});

  useEffect(() => {
    if (roleData) {
      setRole(roleData.data.content)
    }
  }, [roleData])

  const roleOption = getRole?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }))

  const onSubmit = async (data: any) => {
    const payload = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      roles: [{ id: data.roles }]
    };
    try {
      const response = await addUser(payload).unwrap();
      if (response.success) {
        Toast(response.message, "success");
        setOpen(false);
        reset();
      }
      else {
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
          <DialogTitle>Add Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="grid grid-cols-2 gap-4 py-4 " >
            <InputUseForm
              placeholder="First Name"
              label="First Name"
              required
              {...register("firstName", { required: "First Name is required" })}
              error={errors.firstName?.message}
            />
            <InputUseForm placeholder="Middle Name" label="Middle Name" {...register("middleName")} />
            <InputUseForm placeholder="Last Name"
              label="Last Name"
              required
              {...register("lastName", { required: "Last Name is required" })}
              error={errors.lastName?.message}
            />
            <InputUseForm placeholder="Username"
              label="Username"
              required
              {...register("username", { required: "Username is required" })}
              error={errors.username?.message}
            />
            <InputUseForm placeholder="Password"
              label="Password"
              required
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            <InputUseForm placeholder="Phone Number"
              label="Phone Number"
              required
              {...register("phoneNumber", { required: "Phone Number is required" })}
              error={errors.phoneNumber?.message}
            />
            <InputUseForm placeholder="Email"
              label="Email"
              required
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />
            <InputUseForm placeholder="Address"
              label="Address"
              required
              {...register("address", { required: "Address is required" })}
              error={errors.address?.message}
            />
            <SelectUseForm
              required
              label="Role"
              name="roles"
              register={register}
              options={roleOption}
              error={errors.roles?.message}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="reset" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={addLoading}>Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;
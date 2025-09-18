import Button from "@/components/Button"
import BackButton from "@/components/Button/Back"
import FormContainer from "@/components/Form-Container"
import PageHeaders from "@/components/PageHeader"
import Table from "@/components/Table"

const Membership = () => {
  return (
    <>
    <PageHeaders title="Membership" description="Manage membership details and membership plans." />
    <FormContainer className="flex flex-col gap-[1rem]">
      <div className="flex justify-between">
        <div>Search...</div>
        <div className="flex gap-2">
          <BackButton>Back</BackButton>
          <Button variant="default">Add Membership Plan</Button>
        </div>
      </div>
      < Table tableHead={tableHead}/>
    </FormContainer>
    </>
  )
}

export default Membership
const tableHead=[
  "S.No.",
  "Membership Type",
  "Date of Joining",
  "Expiry Date",
  "Borrow Limit",
  "Actions",
]
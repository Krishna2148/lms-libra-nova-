import Button from '@/components/Button'
import BackButton from '@/components/Button/Back'
import FormContainer from '@/components/Form-Container'
import PageHeaders from '@/components/PageHeader'
import Table from '@/components/Table'

const Reservation = () => {
  return (
    <>
      <PageHeaders title="Reservation" description="Easily reserve books and keep track of pending reservations." />
      <FormContainer className='flex flex-col gap-[1rem]'>
        <div className='flex justify-between'>
          <div>Search...</div>
          <div className='flex gap-2'>
            <BackButton>Back</BackButton>
            <Button variant="default">Reserve Book</Button>
          </div>
        </div>
        <Table tableHead={tableHead}/>
      </FormContainer>
    </>
  )
}

export default Reservation
const tableHead = [
  "S.No.",
  "Title",
  "Member Name",
  "Reservation Date",
  "Notification Date",
  "Expire Date",
  "Status",
  "Actions",
]
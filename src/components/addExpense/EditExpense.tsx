import Modal from "@mui/material/Modal";
import AddExpenseRoot from ".";

interface IProps {
  show: boolean
}

const EditExpense = (props: IProps) => {
  const {show} = props;
  return (
    <Modal open={show}>
      <AddExpenseRoot />
    </Modal>
  )
}

export default EditExpense;
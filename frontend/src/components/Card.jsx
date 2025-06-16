import {
  FaCartPlus,
  FaCashRegister,
  FaEdit,
  FaIdCard,
  FaLocationArrow,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const Card = ({ transaction }) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetStatistics"],
  });

  const handleDelete = async () => {
    try {
      await deleteTransaction({ variables: { id: transaction._id } });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const background = {
    income: "from-green-700 to-green-400",
    expense: "from-red-700 to-red-400",
    saving: "from-blue-700 to-blue-400",
  };

  return (
    <div
      className={`rounded-lg flex flex-col p-4 gap-2 w-72 md:w-96 mx-4 md:mx-0 text-white text-lg bg-gradient-to-br ${
        background[transaction.category]
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl capitalize">{transaction.category}</h3>
        <div className="flex items-center gap-4">
          <button onClick={handleDelete}>
            <FaTrash />
          </button>
          <Link to={`/transaction/${transaction._id}`}>
            <FaEdit />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FaIdCard />
        <p className="truncate">Description: {transaction.description}</p>
      </div>
      <div className="flex items-center gap-2 capitalize">
        <FaCartPlus />
        <p>Payment Type: {transaction.type}</p>
      </div>
      <div className="flex items-center gap-2">
        <FaCashRegister />
        <p className="truncate">Amount: ${transaction.amount}</p>
      </div>
      <div className="flex items-center gap-2">
        <FaLocationArrow />
        <p className="truncate">
          Location:{" "}
          {transaction.location ? transaction.location : "No location info"}
        </p>
      </div>
    </div>
  );
};

export default Card;

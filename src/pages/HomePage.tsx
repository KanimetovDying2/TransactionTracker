import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTransactions } from "../features/transactions/transactionsSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { addTransaction } from "../features/transactions/transactionsSlice";
import TransactionForm from "../components/TransactionForm";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const transactions = useAppSelector((state) => state.transactions.items);
  const categories = useAppSelector((state) => state.categories.items);
  const isLoading = useAppSelector((state) => state.transactions.isLoading);

  const [isModalOpen, setIsModalOpen] = useState(
    location.pathname === "/add-transaction",
  );

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setIsModalOpen(location.pathname === "/add-transaction");
  }, [location.pathname]);

  const handleAddTransaction = async (data: {
    category: string;
    amount: number;
    createdAt: string;
  }) => {
    try {
      await dispatch(addTransaction(data)).unwrap();
      setIsModalOpen(false);
      navigate("/");
      dispatch(fetchTransactions());
    } catch (e) {
      alert("Error! Can't add this transaction!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const total = transactions.reduce((acc, t) => {
    const category = categories.find((c) => c.id === t.category);
    if (!category) return acc;
    return category.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
        <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider mb-2">
          Total Balance
        </p>
        <h1 className="text-5xl font-bold mb-4">
          {total.toLocaleString()} KGS
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-sm"
        >
          + Add Transaction
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TransactionForm onSubmit={handleAddTransaction} />
      </Modal>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
        {sortedTransactions.map((t) => {
          const category = categories.find((c) => c.id === t.category);
          if (!category) return null;

          const isIncome = category.type === "income";

          return (
            <div
              key={t.id}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {category.name}
                </span>
                <span className="text-xs text-gray-400">
                  {dayjs(t.createdAt).format("DD MMM, HH:mm")}
                </span>
              </div>
              <span
                className={`font-bold text-lg ${isIncome ? "text-green-600" : "text-red-600"}`}
              >
                {isIncome ? "+" : "-"} {t.amount.toLocaleString()} KGS
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;

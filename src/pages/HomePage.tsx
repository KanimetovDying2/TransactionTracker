import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTransactions } from "../features/transactions/transactionsSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { addTransaction } from "../features/transactions/transactionsSlice";
import TransactionForm from "../components/TransactionForm";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.items);
  const categories = useAppSelector((state) => state.categories.items);
  const isLoading = useAppSelector((state) => state.transactions.isLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddTransaction = async (data: {
    category: string;
    amount: number;
    createdAt: string;
  }) => {
    await dispatch(addTransaction(data));
    setIsModalOpen(false);
    dispatch(fetchTransactions());
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
    <div>
      <h1>Total: {total} KGS</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Transaction</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm onSubmit={handleAddTransaction} />
      </Modal>

      {sortedTransactions.map((t) => {
        const category = categories.find((c) => c.id === t.category);
        if (!category) return null;

        const sign = category.type === "income" ? "+" : "-";

        return (
          <div key={t.id} className="border p-2 mb-2">
            <span>{dayjs(t.createdAt).format("DD.MM.YYYY HH:mm:ss")}</span>
            <span> {category.name} </span>
            <span>
              {sign}
              {t.amount} KGS
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;

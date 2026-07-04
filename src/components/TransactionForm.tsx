import { useState } from "react";
import { useAppSelector } from "../app/hooks";

interface Props {
  onSubmit: (data: {
    category: string;
    amount: number;
    createdAt: string;
  }) => void;
}

const TransactionForm = ({ onSubmit }: Props) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const categories = useAppSelector((state) => state.categories.items);
  const filteredCategories = categories.filter((c) => c.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!category || !amount || numAmount < 1) {
      alert("Transaction amount must be higher than 0");
      return;
    }

    onSubmit({
      category,
      amount: numAmount,
      createdAt: new Date().toISOString(),
    });
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">New Transaction</h2>

      <select
        className={inputStyle}
        value={type}
        onChange={(e) => {
          setType(e.target.value as "income" | "expense");
          setCategory("");
        }}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select
        className={inputStyle}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select category</option>
        {filteredCategories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="relative">
        <input
          className={`${inputStyle} pr-12`}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <span className="absolute right-4 top-3.5 text-gray-400 font-medium">
          KGS
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
      >
        Save Transaction
      </button>
    </form>
  );
};

export default TransactionForm;

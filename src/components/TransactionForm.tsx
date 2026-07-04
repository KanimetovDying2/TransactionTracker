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
      alert("Transaction amount must be higher that 0");
      return;
    }

    onSubmit({
      category,
      amount: parseFloat(amount),
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <select
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

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};
export default TransactionForm;

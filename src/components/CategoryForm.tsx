import { useState } from "react";

interface Props {
  onSubmit: (data: { name: string; type: "income" | "expense" }) => void;
  initialData?: { name: string; type: "income" | "expense" };
}

const CategoryForm = ({ onSubmit, initialData }: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState<"income" | "expense">(
    initialData?.type || "expense",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      alert("Please type something before sending!");
      return;
    }

    onSubmit({ name: name.trim(), type });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default CategoryForm;

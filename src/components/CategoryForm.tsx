import { useState } from "react";

interface Props {
  onSubmit: (data: { name: string; type: "income" | "expense" }) => void;
}

const CategoryForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, type });
      }}
    >
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

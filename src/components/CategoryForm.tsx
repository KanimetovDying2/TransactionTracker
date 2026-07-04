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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">
        {initialData ? "Edit Category" : "Add New Category"}
      </h2>

      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        required
      />

      <select
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
      >
        Save
      </button>
    </form>
  );
};

export default CategoryForm;

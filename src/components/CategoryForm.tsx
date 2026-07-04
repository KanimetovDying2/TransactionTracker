import { useState } from "react";

interface Props {
  onSubmit: (data: {
    name: string;
    type: "income" | "expense";
  }) => Promise<void>;
  initialData?: { name: string; type: "income" | "expense" };
}

const CategoryForm = ({ onSubmit, initialData }: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState<"income" | "expense">(
    initialData?.type || "expense",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      alert("Please type something before sending!");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), type });
    } finally {
      setIsSubmitting(false);
    }
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
        disabled={isSubmitting}
      />

      <select
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        disabled={isSubmitting}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md disabled:bg-gray-400"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CategoryForm;

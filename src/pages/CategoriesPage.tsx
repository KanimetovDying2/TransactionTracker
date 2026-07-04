import { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Modal from "../components/Modal";
import CategoryForm from "../components/CategoryForm";
import Spinner from "../components/Spinner";
import type { Category } from "../types";

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories.items);
  const isDeleting = useAppSelector((state) => state.categories.isDeleting);
  const error = useAppSelector((state) => state.categories.error);
  const isLoading = useAppSelector((state) => state.categories.isLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = async (data: {
    name: string;
    type: "income" | "expense";
  }) => {
    await dispatch(addCategory(data));
    setIsModalOpen(false);
    dispatch(fetchCategories());
  };

  if (error) return <div>Error!</div>;
  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          + Add Category
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryForm onSubmit={handleAddCategory} />
      </Modal>

      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
      >
        <CategoryForm
          initialData={
            editingCategory
              ? { name: editingCategory.name, type: editingCategory.type }
              : undefined
          }
          onSubmit={async (data) => {
            if (editingCategory) {
              await dispatch(updateCategory({ id: editingCategory.id, data }));
              setEditingCategory(null);
              dispatch(fetchCategories());
            }
          }}
        />
      </Modal>

      <div className="grid gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition"
          >
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${cat.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {cat.type}
              </span>
              <span className="font-medium text-lg text-gray-700">
                {cat.name}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingCategory(cat)}
                className="text-gray-500 hover:text-indigo-600 px-3 py-1 transition"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteCategory(cat.id))}
                disabled={isDeleting}
                className="text-gray-400 hover:text-red-600 px-3 py-1 transition"
              >
                {isDeleting ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;

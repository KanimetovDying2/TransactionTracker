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

  if (error) return <div>Error!</div>;
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  const handleAddCategory = async (data: {
    name: string;
    type: "income" | "expense";
  }) => {
    await dispatch(addCategory(data));
    setIsModalOpen(false);
    dispatch(fetchCategories());
  };

  return (
    <div>
      <h1>Categories!</h1>
      <button onClick={() => setIsModalOpen(true)}>Add</button>
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

      {categories.map((cat) => (
        <div key={cat.id} className="flex gap-4 items-center mb-2">
          <span>
            {cat.name} ({cat.type})
          </span>
          <button
            onClick={() => dispatch(deleteCategory(cat.id))}
            disabled={isDeleting}
          >
            {isDeleting ? "..." : "Delete"}
          </button>
          <button onClick={() => setEditingCategory(cat)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;

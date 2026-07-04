import { useEffect, useState } from "react";
import {
  addCategory,
  fetchCategories,
} from "../features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Modal from "../components/Modal";
import CategoryForm from "../components/CategoryForm";
const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

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

  return (
    <div>
      <h1>Categories!</h1>
      <button onClick={() => setIsModalOpen(true)}>Add</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryForm onSubmit={handleAddCategory} />
      </Modal>

      {categories.map((cat) => (
        <div key={cat.id}>
          {cat.name} ({cat.type})
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;

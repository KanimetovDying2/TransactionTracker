import { useEffect, useState } from "react";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Modal from "../components/Modal";
const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h1>Categories!</h1>
      <button onClick={() => setIsModalOpen(true)}>Add</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>Skoro sdelay formy</div>
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

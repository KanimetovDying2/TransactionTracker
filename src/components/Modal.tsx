interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 cursor-pointer"
    >
      <div className="bg-white p-6 rounded shadow-lg w-96 cursor-default">
        <button
          type="button"
          onClick={onClose}
          className="float-right text-gray-500"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

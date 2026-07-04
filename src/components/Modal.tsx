interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <button onClick={onClose} className="float-right text-gray-500">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

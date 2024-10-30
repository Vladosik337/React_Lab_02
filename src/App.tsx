import React, { useState } from 'react';
import useFocusTrap from './hook/useFocusTrap'; // Імпортуємо наш хук

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const trapRef = useFocusTrap(isOpen);

  if (!isOpen) return null;

  return (
    <div className="modal" ref={trapRef} tabIndex={-1} style={{ padding: '20px', border: '1px solid black' }}>
      <h2>Modal Title</h2>
      <button onClick={onClose}>Close</button>
      <input type="text" placeholder="Type here..." />
      <a href="#">Focusable Link</a>
    </div>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default App;

// /src/components/SaveMixModal.jsx

import React, { useState } from 'react';

function SaveMixModal({ isOpen, onClose, onSave }) {
  const [mixName, setMixName] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (mixName.trim()) {
      onSave(mixName); // Kirim nama mix ke parent
      onClose();
    } else {
      alert('Nama mix tidak boleh kosong!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Save Your Mix</h2>
        <form onSubmit={handleSave}>
          <label htmlFor="mix-name">Mix Name</label>
          <input 
            type="text" 
            id="mix-name" 
            value={mixName}
            onChange={(e) => setMixName(e.target.value)}
            required 
            autoFocus
          />
          <button type="submit" className="modal-action-btn">Save Mix</button>
        </form>
      </div>
    </div>
  );
}

export default SaveMixModal;
// /src/components/MyMixesModal.jsx

import React from 'react';

function MixItem({ mix, onLoad, onDelete }) {
  return (
    <div className="mix-item">
      <span className="mix-item-name">{mix.mixName}</span>
      <div className="mix-item-controls">
        <div className="mix-icon-btn load-icon" title="Load Mix" onClick={() => onLoad(mix.settings)}>
          <i className="ri-play-fill"></i>
        </div>
        <div className="mix-icon-btn delete-icon" title="Delete Mix" onClick={() => onDelete(mix._id)}>
          <i className="ri-delete-bin-line"></i>
        </div>
      </div>
    </div>);
}


function MyMixesModal({ isOpen, onClose, mixes, onLoadMix, onDeleteMix }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>My Mixes</h2>
        <div className="my-mixes-list">
          {mixes.length > 0 ? (
            mixes.map(mix => (
              <MixItem 
                key={mix._id} 
                mix={mix} 
                onLoad={onLoadMix} 
                onDelete={onDeleteMix}
              />
            ))
          ) : (
            <p className="empty-list-text">Kamu belum punya mix yang disimpan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyMixesModal;
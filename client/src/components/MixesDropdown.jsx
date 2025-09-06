// /src/components/MixesDropdown.jsx

import React from 'react';

function MixItem({ mix, onLoad, onDelete }) {
  return (
    <div className="mix-item-dropdown">
      <span className="mix-item-name">{mix.mixName}</span>
      <div className="mix-item-controls">
        <div className="mix-icon-btn load-icon" title="Load Mix" onClick={() => onLoad(mix.settings, mix.mixName)}>
          <i className="ri-play-fill"></i>
        </div>
        <div className="mix-icon-btn delete-icon" title="Delete Mix" onClick={() => onDelete(mix._id)}>
          <i className="ri-delete-bin-line"></i>
        </div>
      </div>
    </div>
  );
}

function MixesDropdown({ mixes, onLoadMix, onDeleteMix }) {
  return (
    <div className="mixes-dropdown-container">
      <div className="mixes-dropdown-header">
        <h4>My Mixes</h4>
      </div>
      <div className="mixes-dropdown-list">
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
          <p className="empty-list-text">You don't have any saved mixes yet.</p>
        )}
      </div>
    </div>
  );
}

export default MixesDropdown;
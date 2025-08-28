// /client/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import AmbienceMixer from './components/AmbienceMixer.jsx';
import PlayerBar from './components/PlayerBar.jsx';
import AuthModal from './components/AuthModal.jsx';
import SaveMixModal from './components/SaveMixModal.jsx';
import SettingsPage from './components/SettingsPage';
import CreditsPage from './components/CreditsPage.jsx';

function MainLayout() {

  const [isAuthModalOpen, setAuthModalOpen] = useState(false); 
  const [isSaveMixModalOpen, setSaveMixModalOpen] = useState(false);
  const [isMyMixesModalOpen, setMyMixesModalOpen] = useState(false); 

  // ----- DUMMY DATA -------
  const [user, setUser] = useState(null);
  const [myMixes, setMyMixes] = useState([ // 👈 Gunakan data dummy dulu untuk tes UI
    { _id: '1', mixName: 'Fokus Coding Malam', settings: { musicVolume: 75 } },
    { _id: '2', mixName: 'Hujan Sore Santai', settings: { musicVolume: 60 } },
    { _id: '3', mixName: 'Kerja di Kafe', settings: { musicVolume: 80 } },
  ]);

  // ------------------------

  
  const handleSaveMixClick = () => {
    // Simulasi sudah login untuk tes
    const userIsLoggedIn = true; 

    if (userIsLoggedIn) {
      setSaveMixModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const saveMixToServer = (mixName) => {
    console.log(`Menyimpan mix dengan nama: "${mixName}"`);
    // TODO: LOGIKA SAVE KE BACKEND
    
  };

  const loadMixSettings = (settings) => {
    console.log('Memuat settings:', settings);
    // Di sini update state utama aplikasi setelah load satu mix
    setMyMixesModalOpen(false); // Tutup modal setelah load
  };

  const deleteMix = (mixId) => {
    console.log('--- LOGIKA DELETE MIX API DISINI ---', mixId);
    // Setelah berhasil hapus di server, update state di frontend
    setMyMixes(myMixes.filter(mix => mix._id !== mixId));
  };

  const tracks=[{title: "track1",
  displayName: "display of track 1",                  // Nama untuk ditampilkan di UI (opsional)
  artistName: "artist of track 1",
  url: "www.url.com",
  sourceUrl: "www.sourceurl.com"}];


  return (
    <div className="container">
     
      <Header 
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        myMixes={myMixes}
        onLoadMix={loadMixSettings}
        onDeleteMix={deleteMix}
      /> 


      <main className="main-content">
        <MusicPlayer tracks={tracks}/>
        <AmbienceMixer />
      </main>
      <PlayerBar onSaveMixClick={handleSaveMixClick}/>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      <SaveMixModal 
        isOpen={isSaveMixModalOpen}
        onClose={() => setSaveMixModalOpen(false)}
        onSave={saveMixToServer}
      />
  
    </div>
  );
}


function App() {
  const tracks=[{title: "track1",
  displayName: "display of track 1",                  // Nama untuk ditampilkan di UI (opsional)
  artistName: "artist of track 1",
  url: "www.url.com",
  sourceUrl: "www.sourceurl.com"}];  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route 
          path="/credits" 
          element={<CreditsPage musicTracks={tracks} ambienceSounds={tracks} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
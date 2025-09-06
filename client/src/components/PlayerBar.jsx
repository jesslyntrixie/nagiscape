// /src/components/PlayerBar.jsx

function PlayerBar({ currentTrack, isAppPlaying, isMusicPlaying, onSaveMixClick, onPlayPauseClick, currentMixName }){
    return(
        <div className="player-bar">
            <div className="now-playing">
                <div className="now-playing-icon">
                    <i className="ri-headphone-line"></i>
                </div>
                <div className="now-playing-info">
                    <div className="now-playing-label">Now Playing</div>
                    <div className="now-playing-name">
                        {currentMixName ? currentMixName : (currentTrack ? currentTrack.displayName : 'Select a track')}
                    </div>
                </div>
            </div>
            
            <div className="player-controls">
                <div className="play-pause-btn" onClick={onPlayPauseClick}>
                    {isAppPlaying ? <i className="ri-pause-fill"></i> : <i className="ri-play-fill"></i>}
                </div>
            </div>
            <div className="save-btn-container"> 
                <button className="save-btn" onClick={onSaveMixClick}>
                    <i className="ri-save-line"></i>
                    <span>Save Mix</span>
                </button>
            </div>
        </div>  
    );
}

export default PlayerBar;
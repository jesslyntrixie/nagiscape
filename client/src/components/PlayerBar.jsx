// /src/components/PlayerBar.jsx

function PlayerBar({ currentTrack, isAppPlaying, isMusicPlaying, onSaveMixClick, onPlayPauseClick, currentMixName }){
    return(
        <div className="player-bar glass-effect flex-between">
            <div className="now-playing">
                <div className="now-playing-icon flex-center">
                    <i className="ri-headphone-line"></i>
                </div>
                <div className="now-playing-info">
                    <div className="now-playing-label">Now Playing</div>
                    <div className="now-playing-name">
                        {currentMixName ? currentMixName : (currentTrack ? currentTrack.displayName : 'Select a track')}
                    </div>
                </div>
            </div>
            
            <div className="player-bar-right">
                <div className="player-controls">
                    <button className="play-pause-btn flex-center" onClick={onPlayPauseClick}>
                        {isAppPlaying ? <i className="ri-pause-fill"></i> : <i className="ri-play-fill"></i>}
                    </button>
                </div>
                <div className="save-btn-container"> 
                    <button className="btn btn--filled" onClick={onSaveMixClick}>
                        <i className="ri-add-line"></i>
                        <span>Save Mix</span>
                    </button>
                </div>
            </div>
        </div>  
    );
}

export default PlayerBar;
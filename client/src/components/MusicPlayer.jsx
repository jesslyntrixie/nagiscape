function MusicPlayer({tracks}){

    return(
        <div className="panel left-panel">
            <div className="panel-header">
                <h2 className="panel-title">Music Tracks</h2>
            </div>
            
            <div className="volume-control">
                <i className="ri-volume-up-line volume-icon"></i>
                <input type="range" min="0" max="100" value="70" className="slider"/>
            </div>
            
            <div className="track-list">
                {tracks.map(track => (
                    <div className="track-item" key={track._id}>
                       <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                        <div className="track-info">
                            <div className="track-title">{track.displayName || track.title}</div>
                            <div className="track-artist">{track.artistName}</div>
                        </div>
                        <div className="track-controls"><i className="ri-play-mini-fill"></i></div>
                    </div>    
                ))}
            </div>
        </div>
    );
}


        
export default MusicPlayer;
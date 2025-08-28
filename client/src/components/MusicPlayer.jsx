function MusicPlayer(){

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
                <div className="track-item active">
                    <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                    <div className="track-info">
                        <div className="track-title">Rainy Day Dreams</div>
                        <div className="track-artist">Lofi Collective</div>
                    </div>
                    <div className="track-controls"><i className="ri-pause-mini-fill"></i></div>
                </div>
                
                <div className="track-item">
                    <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                    <div className="track-info">
                        <div className="track-title">Midnight Study</div>
                        <div className="track-artist">Chill Beats</div>
                    </div>
                    <div className="track-controls"><i className="ri-play-mini-fill"></i></div>
                </div>
                
                <div className="track-item">
                    <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                    <div className="track-info">
                        <div className="track-title">Cozy Memories</div>
                        <div className="track-artist">Sleepy Cat</div>
                    </div>
                    <div className="track-controls"><i className="ri-play-mini-fill"></i></div>
                </div>
                
                <div className="track-item">
                    <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                    <div className="track-info">
                        <div className="track-title">Autumn Leaves</div>
                        <div className="track-artist">Warm Coffee</div>
                    </div>
                    <div className="track-controls"><i className="ri-play-mini-fill"></i></div>
                </div>
                
                <div className="track-item">
                    <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                    <div className="track-info">
                        <div className="track-title">Gentle Piano</div>
                        <div className="track-artist">Moonlight Dreams</div>
                    </div>
                    <div className="track-controls"><i className="ri-play-mini-fill"></i></div>
                </div>
                
                <div className="track-item">
                    <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                    <div className="track-info">
                        <div className="track-title">Sunset Vibes</div>
                        <div className="track-artist">Orange Sky</div>
                    </div>
                    <div className="track-controls"><i className="ri-play-mini-fill"></i></div>
                </div>
                
                <div className="track-item">
                    <div className="track-thumbnail"><i className="ri-music-2-line"></i></div>
                    <div className="track-info">
                        <div className="track-title">Dreamy Nights</div>
                        <div className="track-artist">Starry Skies</div>
                    </div>
                    <div className="track-controls"><i className="ri-play-mini-fill"></i></div>
                </div>
            </div>
        </div>
    );
}


        
export default MusicPlayer;
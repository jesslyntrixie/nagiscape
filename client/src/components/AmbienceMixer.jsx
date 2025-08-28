import React, { useState } from 'react';

function AmbienceMixer() {

    return(
        <div className="panel right-panel">
            <div className="panel-header">
                <h2 className="panel-title">Ambience Mixer</h2>
            </div>
            
            <div className="ambience-list">
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-rainy-line"></i></div>
                        <div className="ambience-name">Rain</div>
                    </div>
                    <input type="range" min="0" max="100" value="80" className="slider ambience-slider"/>
                </div>
                
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-fire-line"></i></div>
                        <div className="ambience-name">Fireplace</div>
                    </div>
                    <input type="range" min="0" max="100" value="40" className="slider ambience-slider"/>
                </div>
                
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-windy-line"></i></div>
                        <div className="ambience-name">Wind</div>
                    </div>
                    <input type="range" min="0" max="100" value="20" className="slider ambience-slider"/>
                </div>
                
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-thunderstorms-line"></i></div>
                        <div className="ambience-name">Thunder</div>
                    </div>
                    <input type="range" min="0" max="100" value="10" className="slider ambience-slider"/>
                </div>
                
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-water-flash-line"></i></div>
                        <div className="ambience-name">Ocean Waves</div>
                    </div>
                    <input type="range" min="0" max="100" value="0" className="slider ambience-slider"/>
                </div>
                
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-road-map-line"></i></div>
                        <div className="ambience-name">City Traffic</div>
                    </div>
                    <input type="range" min="0" max="100" value="0" className="slider ambience-slider"/>
                </div>
                
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-restaurant-line"></i></div>
                        <div className="ambience-name">Café Ambience</div>
                    </div>
                    <input type="range" min="0" max="100" value="60" className="slider ambience-slider"/>
                </div>
                
                <div className="ambience-item">
                    <div className="ambience-header">
                        <div className="ambience-icon"><i className="ri-keyboard-line"></i></div>
                        <div className="ambience-name">Keyboard Typing</div>
                    </div>
                    <input type="range" min="0" max="100" value="30" className="slider ambience-slider"/>
                </div>
            </div>
        </div>
    );
}

export default AmbienceMixer;


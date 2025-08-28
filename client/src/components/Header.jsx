function Header({ onMyMixesClick }) {
    return (
        <header>
            <div className="logo">nagiscape<span>_</span></div>
            <div className="header-right">
                <button className="my-mixes-btn" onClick={onMyMixesClick}>My Mixes</button>
                <div className="profile-icon">
                    <i className="ri-user-line"></i>
                </div>
            </div>
        </header>
    );
}

export default Header;



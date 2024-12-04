import "./footer.scss";

import riotGamesLogo from "../../assets/images/riot-games.png";
import rockstarGamesLogo from "../../assets/images/rockstargames.png";
import epicGamesLogo from "../../assets/images/Epic_Games_logo.svg.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="slogan">Incredible convenient</div>
      <div className="company-logos">
        <a href="https://www.riotgames.com" target="_blank" rel="noopener noreferrer">
          <img src={riotGamesLogo} alt="Riot-Games" className="company-logo" />
        </a>
        <a href="https://www.rockstargames.com" target="_blank" rel="noopener noreferrer">
          <img src={rockstarGamesLogo} alt="Rockstar-Games" className="company-logo" />
        </a>
        <a href="https://www.epicgames.com" target="_blank" rel="noopener noreferrer">
          <img src={epicGamesLogo} alt="Epic-Games" className="company-logo" />
        </a>
        {/* Add more company icons here */}
      </div>
    </footer>
  );
}

export default Footer;

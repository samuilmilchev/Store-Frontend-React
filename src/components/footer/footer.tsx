import * as styles from "./footer.module.scss";

import riotGamesLogo from "../../assets/images/riot-games.png";
import rockstarGamesLogo from "../../assets/images/rockstargames.png";
import epicGamesLogo from "../../assets/images/Epic_Games_logo.svg.png";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.slogan}>Incredible convenient</div>
      <div className={styles.companyLogos}>
        <a href="https://www.riotgames.com" target="_blank" rel="noopener noreferrer">
          <img src={riotGamesLogo} alt="Riot-Games" className={styles.companyLogo} />
        </a>
        <a href="https://www.rockstargames.com" target="_blank" rel="noopener noreferrer">
          <img src={rockstarGamesLogo} alt="Rockstar-Games" className={styles.companyLogo} />
        </a>
        <a href="https://www.epicgames.com" target="_blank" rel="noopener noreferrer">
          <img src={epicGamesLogo} alt="Epic-Games" className={styles.companyLogo} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

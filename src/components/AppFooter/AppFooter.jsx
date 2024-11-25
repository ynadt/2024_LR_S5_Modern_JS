import styles from './AppFooter.module.css';
import LogoIcon from 'assets/icons/logo-icon.svg';
import { linkSections, socialIcons } from 'data/footerData.js';

const AppFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.mainContent}>
                    <div className={styles.logoSection}>
                        <img src={LogoIcon} alt="Logo" className={styles.logo} />
                        <p className={styles.footerText}>Takeaway & Delivery template for small - medium businesses.</p>
                    </div>

                    <div className={styles.linksContainer}>
                        {linkSections.map((section) => (
                            <div key={section.title} className={styles.linkColumn}>
                                <h4 className={styles.linkTitle}>{section.title}</h4>
                                {section.links.map((link) =>
                                    link.url === '#' ? (
                                        <span key={link.label} className={styles.link}>
                                            {link.label}
                                        </span>
                                    ) : (
                                        <a key={link.label} href={link.url} className={styles.link} target="_blank" rel="noopener noreferrer">
                                            {link.label}
                                        </a>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottomContent}>
                    <div className={styles.builtWith}>
                        <span>Built by</span>
                        <a href="/" className={styles.highlightedText}>
                            Flowbase
                        </a>
                        <span>· Powered by</span>
                        <a href="/" className={styles.highlightedText}>
                            Webflow
                        </a>
                    </div>
                    <div className={styles.socialIcons}>
                        {socialIcons.map((social) => (
                            <a key={social.alt} href={social.url} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                                <img src={social.icon} alt={social.alt} className={styles.iconImage} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;

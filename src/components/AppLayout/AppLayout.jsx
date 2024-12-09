import AppHeader from 'components/AppHeader/AppHeader.jsx';
import AppFooter from 'components/AppFooter/AppFooter.jsx';
import styles from './AppLayout.module.css';

const AppLayout = ({ children }) => {
    return (
        <div className={styles.appLayout}>
            <AppHeader />
            <main className={styles.mainContent}>{children}</main>
            <AppFooter />
        </div>
    );
};

export default AppLayout;

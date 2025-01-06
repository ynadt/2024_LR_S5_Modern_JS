import { Outlet } from 'react-router-dom';
import AppHeader from 'components/AppHeader/AppHeader.tsx';
import AppFooter from 'components/AppFooter/AppFooter.tsx';
import styles from './AppLayout.module.css';

const AppLayout = () => {
    return (
        <div className={styles.appLayout}>
            <AppHeader />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <AppFooter />
        </div>
    );
};

export default AppLayout;

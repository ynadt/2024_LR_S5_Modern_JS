import { FC, ReactNode } from 'react';
import AppHeader from 'components/AppHeader/AppHeader.tsx';
import AppFooter from 'components/AppFooter/AppFooter.tsx';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className={styles.appLayout}>
            <AppHeader />
            <main className={styles.mainContent}>{children}</main>
            <AppFooter />
        </div>
    );
};

export default AppLayout;

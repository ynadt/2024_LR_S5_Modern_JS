import { Component } from 'react';
import AppHeader from 'components/AppHeader/AppHeader.jsx';
import MenuSection from 'components/MenuSection/MenuSection.jsx';
import AppFooter from 'components/AppFooter/AppFooter.jsx';

class MenuPage extends Component {
    render() {
        return (
            <>
                <AppHeader />
                <MenuSection />
                <AppFooter />
            </>
        );
    }
}

export default MenuPage;

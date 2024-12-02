import styled from 'styled-components';
import AppHeader from 'components/AppHeader/AppHeader.jsx';
import HomeHeroSection from 'components/HomeHeroSection/HomeHeroSection.jsx';
import AppFooter from 'components/AppFooter/AppFooter.jsx';

const HomePage = () => (
    <PageWrapper>
        <AppHeader />
        <MainContent>
            <HomeHeroSection />
        </MainContent>
        <AppFooter />
    </PageWrapper>
);

export default HomePage;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

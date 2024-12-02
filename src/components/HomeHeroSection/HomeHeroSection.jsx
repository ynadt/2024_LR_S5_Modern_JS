import styled from 'styled-components';
import Button from 'components/Button/Button.jsx';

import homeBackground from 'src/assets/backgrounds/home_shape_bg.svg';
import foodImage from 'src/assets/backgrounds/home_bg.png';
import trustpilotIcon from 'src/assets/icons/trustpilot-icon.svg';

const HomeHeroSection = () => {
    return (
        <Section>
            <ContentWrapper>
                <TextContent>
                    <Heading>
                        <Highlight>
                            Beautiful food &amp; takeaway, <Accent>delivered</Accent> to your door.
                        </Highlight>
                    </Heading>
                    <Description>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard
                        dummy text ever since the 1500.
                    </Description>
                    <ButtonContainer>
                        <Button onClick={() => console.log('Order Placed!')}>Place an Order</Button>
                    </ButtonContainer>
                    <ReviewSection>
                        <TrustpilotLogo src={trustpilotIcon} alt="Trustpilot Logo" />
                        <ReviewDetails>
                            <Rating>4.8 out of 5</Rating> based on 2000+ reviews
                        </ReviewDetails>
                    </ReviewSection>
                </TextContent>
                <ImageContainer>
                    <HeroImage src={foodImage} alt="Food and Takeaway" />
                </ImageContainer>
            </ContentWrapper>
        </Section>
    );
};

const Section = styled.section`
    background-image: url(${homeBackground});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
`;

const ContentWrapper = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
`;

const TextContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Heading = styled.h1`
    font-size: 4rem;
    font-weight: normal;
    line-height: 4rem;
    margin-bottom: 1rem;
`;

const Highlight = styled.span`
    color: #08090a;
`;

const Accent = styled.span`
    color: #35b8be;
`;

const Description = styled.p`
    color: #546285;
    font-size: 1.1rem;
    line-height: 1.5rem;
    margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
    margin-bottom: 2rem;
`;

const ReviewSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const TrustpilotLogo = styled.img`
    width: 110px;
    height: auto;
    margin-right: 1rem;
`;

const ReviewDetails = styled.div`
    display: flex;
    font-size: 1rem;
`;

const Rating = styled.span`
    color: #35b8be;
    margin-right: 0.5rem;
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding: 2rem;

    @media (max-width: 800px) {
        display: none;
    }
`;

const HeroImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
`;

export default HomeHeroSection;

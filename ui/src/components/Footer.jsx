import React from 'react';
import styled from 'styled-components';
import { FaFacebookSquare ,FaInstagram,FaTwitterSquare,FaPinterestSquare,FaMapMarkerAlt,FaPhoneAlt,FaMailBulk} from "react-icons/fa";
import { mobile } from '../responsive';

const Container = styled.div`
display:flex;
${mobile({flexDirection:"column"})}
`;

const Left = styled.div`
Flex:1;
display:flex;
flex-direction:column;
padding:20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
margin:20px 0px;
`;

const SocialContainer = styled.div`
display:flex
`;

const SocialIcon = styled.div`
width:40px;
height:40px;
border-radius:50%;
color:white;
background-color: #${props=>props.color};
display:flex;
justify-content:center;
align-items:center;
margin-right:18px;
font-size:22px;
`;

const Center = styled.div`
Flex:1;
padding:20px;
${mobile({display:"none"})}
`;

const Title = styled.h3`
Margin-bottom:30px;`;

const List = styled.ul`
margin:0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;
`;

const ListItem = styled.li`
width:50%;
margin-bottom:10px;
`;

const Right = styled.div`
Flex:1;
padding:20px;
${mobile({backgroundColor:"#eee"})}
`;

const ContactItem = styled.div`
margin-bottom:20px;
display:flex;
align-items:center;
`;

const Payment = styled.img`
width:50%;
`;

const Footer = () => {
    return (  
<Container>
    <Left>
        <Logo>
            E-Commerce.
        </Logo>
        <Desc>
        In fact, inserting any fantasy text or a famous text,
         be it a poem, a speech, a literary passage, a song's text, 
         etc., our text generator will provide the random extraction 
         of terms and steps to compose your own exclusive Lorem Ipsum.
        </Desc>
        <SocialContainer>

            <SocialIcon color="385999">
            <FaFacebookSquare/>
            </SocialIcon>

            <SocialIcon color="E4405F">
            <FaInstagram/>
            </SocialIcon>

            <SocialIcon color="55ACEE">
            <FaTwitterSquare/>
            </SocialIcon> 

            <SocialIcon color="E60023">
            <FaPinterestSquare/>
            </SocialIcon> 

        </SocialContainer>
    </Left>
    <Center>

<Title>
USEFUL LINK
</Title>
<List>

<ListItem>HOME</ListItem>
<ListItem>CART</ListItem>
<ListItem>MEN'S FAHION</ListItem>
<ListItem>WOMEN'S FAHION</ListItem>
<ListItem>ACCESSORIES</ListItem>
<ListItem>MY ACCOUNT</ListItem>
<ListItem>ORDER TRACKING</ListItem>
<ListItem>WHISHLIST</ListItem>
<ListItem>TERMS</ListItem>

</List>

    </Center>
    <Right>

        <Title>CONTACT</Title>
        <ContactItem>
        <FaMapMarkerAlt style={{marginRight:"10px",fontSize:"26px"}}/>
        LINE 7 NORTH AHMED BADAWY INTERSECTION, GAMIET AHMED ORABY, EL OBOUR CITY
        </ContactItem>
        <ContactItem>
            <FaPhoneAlt style={{marginRight:"10px",fontSize:"26px"}} />
            012 73720505
        </ContactItem>
        <ContactItem>
            <FaMailBulk style={{marginRight:"10px",fontSize:"26px"}} />
            Contact@FlexDevelopment.com
        </ContactItem>
<Payment src="https://www.dobotspain.es/wp-content/uploads/2021/03/payment-methods.png"/>

    </Right>
</Container>
    );
}
 
export default Footer;
import styled from 'styled-components';
import {ParentChild16}  from '@carbon/icons-react';
import {Button} from 'carbon-components-react';
const StyledDiv = styled.div`
float: left;
    width: 100%;
    background-color: #a900b0;
`;
const ImageDiv = styled.div`
float: left;
    margin: 21px 20px 0px 22px;
    background-color: #a900b0;
svg.login-class {
    fill: white;
  }
`;
const Header = ({ children }) => (
    <StyledDiv>
        <ImageDiv>    
        <ParentChild16 aria-label="" className="login-class" />
            {/* <Button hasIconOnly   className="login-class" renderIcon={ParentChild16}  size="lg" /> */}
         </ImageDiv>
    
    <h3 style={{color:'white'}}>FLOWAPP</h3>
    </StyledDiv>
    );
export default Header;
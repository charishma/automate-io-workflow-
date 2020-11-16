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
    width: 32px;
    height: 32px;
    margin-top: 21px;
`;
const Header = ({ children }) => (
    <StyledDiv>
        <ImageDiv>    
            <Button hasIconOnly   renderIcon={ParentChild16}  size="lg" />
         </ImageDiv>
    
    <h3 style={{color:'white'}}>FLOWAPP</h3>
    </StyledDiv>
    );
export default Header;
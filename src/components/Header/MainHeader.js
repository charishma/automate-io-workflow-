import styled from 'styled-components';
import {ParentChild16}  from '@carbon/icons-react';
import {Button} from 'carbon-components-react';
import {useSelector,useDispatch } from 'react-redux';
import {getLoggedInStatus}from '../duck/selectors';
import {logout} from '../duck/actions';
import { push as pushRoute } from "connected-react-router";
import {PageRoutes} from '../Constants/constants';

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
const ButtonDiv = styled.div`
float: right;
margin: -3% 6% 0% 0%;
.btn{
    background-color:lightgrey;
    color:black;
    padding:8px;
}
`;
const Header = ({ children }) => {
    const loginFlag = useSelector(getLoggedInStatus);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(pushRoute(PageRoutes.login));

 }
    return (
        <StyledDiv>
        <ImageDiv>    
        <ParentChild16 aria-label="" className="login-class" />
            {/* <Button hasIconOnly   className="login-class" renderIcon={ParentChild16}  size="lg" /> */}
         </ImageDiv>
    <h3 style={{color:'white'}}>FLOWAPP</h3>
    {loginFlag&&
    <ButtonDiv>
    <Button className="btn" onClick={handleLogout}>LogOut</Button>
    </ButtonDiv>}
    </StyledDiv>
    );
}
export default Header;
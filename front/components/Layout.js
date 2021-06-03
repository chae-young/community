import PropTypes from 'prop-types';
import Header from './Header';
import {Container} from '../styles/style';

const Layout = ({children})=>{
    return (
        <>
        <Header/>
        <Container>{children}</Container>
        </>
    )
}

Layout.propTypes = {
    children:PropTypes.node.isRequired,
}

export default Layout
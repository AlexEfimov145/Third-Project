import AuthMenu from '../../auth/authMenu/AuthMenu';
import './Header.css';

function Header(): JSX.Element {
    return (
        <div className='Header'>
            <h1>Booking</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;

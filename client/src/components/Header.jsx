import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

const Header = ({ auth }) => {
    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return (
                    <>
                        <li key='payments'>
                            <Payments />
                        </li>
                        <li key='logout'>
                            <a href="/api/logout">Logout</a>
                        </li>
                    </>
                );
        }
    };

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={auth ? '/surveys' : '/'}
                    className="left brand-logo"
                >
                    Emaily
                </Link>
                <ul className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    );
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
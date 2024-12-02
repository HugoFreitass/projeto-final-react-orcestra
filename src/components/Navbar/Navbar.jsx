import '../../components/Navbar/Navbar.scss'
import icone from '../../assets/images/claquete-branca.png'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <img className='nav-icon' src={icone} alt="icone claquete" />
            <h1 className='nav-title'>Claquete virtual</h1>
        </nav>
    )
}

export default Navbar
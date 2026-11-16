import spiderLogo from '/Users/charliestarling/Desktop/demo/SpiderHouse/public/SpiderHouseSol_logo.png'; 
import '../components/logo.css';
function Logo() {
    return (
        <>
            <img src={spiderLogo} alt="SpiderHouseSolutions" className="logo" />
        </>
    );
}

export default Logo;
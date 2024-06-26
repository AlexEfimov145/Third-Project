import "./Spinner.css";
import imageSource from '../../../assets/images/loading.gif';

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={imageSource} alt=""/>
        </div>
    );
}

export default Spinner;

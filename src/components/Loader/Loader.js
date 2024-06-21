import { RotateLoader } from "react-spinners";
import "./loader.css"
const Loader = () => {
    return (
        <div className="loader">
            {/* <RotateLoader
            color="#FF6666"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            /> */}
            <img src="https://cdn.dribbble.com/users/160117/screenshots/3197970/media/1f5c05158cafb49ecca277b87cedcae0.gif" alt="logo"  className="img"/>
        </div> 
    );
}

export default Loader;
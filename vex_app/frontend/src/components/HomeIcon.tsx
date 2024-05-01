import { useNavigate } from "react-router-dom";


export const HomeIcon = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }
    
    return (
        <img
        src="/app_icon.png"
        width="30"
        height="30"
        alt="Avatar"
        className="overflow-hidden rounded-full"
        style={{ cursor: 'pointer' }}
        onClick={navigateToHome}
      />
    )
}


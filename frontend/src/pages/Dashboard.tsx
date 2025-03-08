import { useNavigate } from "react-router-dom"

export const Dashboard:React.FC = ()=>{
        const navigate = useNavigate();
        return (
            <div>
                    <button onClick={()=>{
                        navigate("properties")
                    }}>Properties</button>
            </div>
        )
}
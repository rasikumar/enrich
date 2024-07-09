import { useParams } from "react-router-dom";
import Compliance from "./Compliance";
import Corporates from "./Corporates";
import Individuals from "./Individuals";

const services = [
    {
        id:2,
        component:<Individuals/>
    },
    {
        id:1,
        component:<Corporates/>
    },
    {
        id:3,
        component:<Compliance/>
    }
]

const ServiceDetails =()=>{
    const{id} = useParams();
    const service = services.find(service => service.id===parseInt(id));
    if(!service){
        return <div>there is no any services</div>
    }
    return(
        <div>
            {service.component && <div>{service.component} </div>}
        </div>
    )
}
export default ServiceDetails;
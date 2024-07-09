import { useParams } from "react-router-dom";
import Compliance from "./Compliance";
import Corporates from "./Corporates";
import Individuals from "./Individuals";

const services = [
    {
        id:1,
        title:'Individuals',
        component:<Individuals/>
    },
    {
        id:2,
        title:'Individuals',
        component:<Corporates/>
    },
    {
        id:3,
        title:'Individuals',
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
            <h1>{service.title}</h1>
            {service.component && <div>{service.component} </div>}
        </div>
    )
}
export default ServiceDetails;
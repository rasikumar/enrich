import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

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
    const navigate = useNavigate();
    const{id} = useParams();
    const service = services.find(service => service.id===parseInt(id));
    if(!service){
        return <div>there is no any services</div>
    }
    return(
        <div >
            <div className="relative mt-10">
            <IoArrowBackCircle className='text-3xl absolute xl:top-11 -top-5 xl:left-10 ' onClick={() => navigate(-1)} />
            </div>
            {service.component && <div>{service.component} </div>}
        </div>
    )
}
export default ServiceDetails;
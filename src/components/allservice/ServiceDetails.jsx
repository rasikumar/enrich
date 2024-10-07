// import { useNavigate, useParams } from "react-router-dom";
// import { IoArrowBackCircle } from "react-icons/io5";

// import Compliance from "./Compliance";
// import Corporates from "./Corporates";
// import Individuals from "./Individuals";

// const services = [
//   {
//     id: 2,
//     component: <Individuals />,
//   },
//   {
//     id: 1,
//     component: <Corporates />,
//   },
//   {
//     id: 3,
//     component: <Compliance />,
//   },
//   {
//     id: 4,
//     component: "https://survey.evvisolutions.com/webinar/",
//   },
// ];

// const ServiceDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const service = services.find((service) => service.id === parseInt(id));

//   if (!service) {
//     return <div>There are no services available</div>;
//   }

//   return (
//     <div>
//       <div className="relative mt-10">
//         <IoArrowBackCircle
//           className="text-3xl absolute xl:top-10 -top-5 xl:left-10"
//           onClick={() => navigate(-1)}
//         />
//       </div>
//       {typeof service.component === "string" ? (
//         <iframe
//           src={service.component}
//           width="100%"
//           height="800px"
//           title="Service Details"
//         />
//       ) : (
//         <div>{service.component}</div>
//       )}
//     </div>
//   );
// };

// export default ServiceDetails;

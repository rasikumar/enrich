import arrow from '../assets/arrow.svg';
import image from '../assets/heroImage.jpg';
import logo from '../assets/logo.svg';
import '../components/Program.css'

const program = [
  {
    title: 'Empowering',
    content: "We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",
    icon: arrow,
    bgImg: image,
    logo: logo
  },
  {
    title: 'Empowering',
    content: "We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",
    icon: arrow,
    bgImg: image,
    logo: logo
  },
  {
    title: 'Empowering',
    content: "We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",
    icon: arrow,
    bgImg: image,
    logo: logo
  },
  {
    title: 'Empowering',
    content: "We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",
    icon: arrow,
    bgImg: image,
    logo: logo
  },
  {
    title: 'Empowering',
    content: "We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",
    icon: arrow,
    bgImg: image,
    logo: logo
  },
  {
    title: 'Empowering',
    content: "We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",
    icon: arrow,
    bgImg: image,
    logo: logo
  }
];

const Programlist = () => {
  return (
    <div>
      <a href="#">
        <div className='flex flex-wrap w-full items-center m-auto gap-14 py-10 justify-center'>
          {program.map((value, index) => {
            return (
              <div key={index} className='card-container'>
                <img src={value.bgImg} alt={value.title} className='card-image' />
                <div className='card-icons'>
                  <img src={value.logo} alt={value.title} width={20} />
                  <img src={value.icon} alt={value.title} />
                </div>
                <div className='card-content'>
                  <h1 className='text-xl font-semibold'>{value.title}</h1>
                  <p className='text-[10px]'>{value.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </a>
    </div>
  );
};

export default Programlist;

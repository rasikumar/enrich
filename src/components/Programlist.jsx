import arrow from '../assets/arrow.svg';

import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';

import logo from '../assets/logo.svg';
import '../components/Program.css'

const program = [
  {
    title: 'Personal Effectiveness Power Pack',
    content: "Tailored for professionals seeking to enhance their personal and professional effectiveness and make a lasting impact",
    icon: arrow,
    bgImg: image1,
    logo: logo
  },
  {
    title: 'Communication Mastery Suite',
    content: "Designed for individuals aiming to improve their communication skills and cultivate meaningful connections in both personal and professional settings.",
    icon: arrow,
    bgImg: image2,
    logo: logo
  },
  {
    title: 'Emotional Intelligence Essentials',
    content: "Geared towards individuals looking to develop their emotional intelligence for greater self-awareness, resilience, and success in all areas of life.",
    icon: arrow,
    bgImg: image3,
    logo: logo
  },
  {
    title: 'Executive Leadership Mastery',
    content: "Ideal for aspiring and seasoned leaders committed to honing their leadership skills, executive presence, and impact.",
    icon: arrow,
    bgImg: image4,
    logo: logo
  },
  {
    title: 'Strategic Thinking Toolbox',
    content: "Customized for decision-makers and problem-solvers eager to sharpen their strategic thinking abilities and drive organizational success.",
    icon: arrow,
    bgImg: image5,
    logo: logo
  },
  {
    title: 'Launchpad to Corporate Success',
    content: "Exclusive program to transform academic knowledge into professional skills, ensuring graduates are ready for the campus-to-corporate transition.",
    icon: arrow,
    bgImg: image6,
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
                  <img src={value.icon} alt={value.title} />
                </div>
                <div className='card-content'>
                  <h1 className='text-[18px] leading-5 mb-2 font-semibold'>{value.title}</h1>
                  <p className='text-[10px] text-center'>{value.content}</p>
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

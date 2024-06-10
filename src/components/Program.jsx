import arrow from '../assets/arrow.svg'
const Program = () => {
  const program=[
    {
      title:'Empowering',
      content:"We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",      
      icon : arrow 
    },{
      title:'Empowering',
      content:"We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",      
      icon : arrow 
    },{
      title:'Empowering',
      content:"We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",      
      icon : arrow 
    },{
      title:'Empowering',
      content:"We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",      
      icon : arrow 
    },{
      title:'Empowering',
      content:"We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",      
      icon : arrow 
    },{
      title:'Empowering',
      content:"We have over 20 years of consultancy experience in this area of business and we strive to achieve the following: develop, empower, enable and maintain.",      
      icon : arrow 
    },
    
    ]
  return (
    <div id="program">
      {program.map((program)=>(
      <>
        <h1 key={program}> {program.title} </h1>
        <p>{program.content}</p>
      </>
      ))}
    </div>
  )
}

export default Program
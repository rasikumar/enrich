import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";

import retreatImage from '../assets/blogs/Fullsize/retreatImage.jpg';
import valuableImage from '../assets/blogs/Fullsize/valuableImage.jpg';
import listeningImage from '../assets/blogs/Fullsize/listeningImage.jpg';
import awarnessImage from '../assets/blogs/Fullsize/awarnessImage.jpg'

const articles = [
  { id: 1, 
    title: "Retreat", 
    content: "A retreat is a process of temporary break from one's usual life or routine to seek comfort, reflect on oneself. It often involves secluded environments, away from distractions, that promote the development of new skills. Retreats can serve various purposes, ranging from personal growth and wellness to professional development. By this way our RETREAT will lead you to a wonderful destiny. So just stay connected with us for this amazing journey.", 
    content2:'As we continue to adapt to the constantly changing landscape of the modern workplace, it has become increasingly clear that prioritizing employee wellbeing and mental health is crucial for creating a healthy, productive, and sustainable work environment. Providing support for employee well-being encompasses addressing physical, mental, and emotional health, which are all interconnected and vital for overall satisfaction and performance. Mental health deserves special attention, as it can have a significant impact on employee engagement, productivity, and organizational success.', 
    content3:'Employers can empower their employees to manage stress, maintain work-life balance, and thrive professionally by providing resources such as counseling services, flexible work arrangements, mindfulness programs, and wellness activities. Ultimately, prioritizing employee well-being is a win-win situation for both employees and employers, fostering a culture of positivity and productivity that benefits everyone.',
    content4:'A culture of empathy, understanding, and inclusivity encourages employees to prioritize their mental health, creating a loyal, resilient workforce capable of driving long-term success. Organizations must prioritize employee wellbeing to cultivate a positive work environment that values mental health, trust, and safety.{<br/>}We wanted to remind you to stay connected with us so you can be the first to know about our “RETREAT”. We love keeping in touch with our community and appreciate your engagement. Lets stay connected!"',
    image: retreatImage },

  { id: 2, 
    title: "Valuable", 
    content: "Valuable is the ultimate word which indicates that the Something that has worth is valuable. Often, valuable things are worth money, but a spy can provide valuable information that might save lives. In this Blog how VALUABLE can work in sing individual life which can create the admirable thing though that. By this way our VALUABLE will lead you to a wonderful destiny. So just stay connected with us for this amazing journey.", 
    content2: "In today's fast-paced professional world, it's essential to create a culture that values continuous learning, steadfast achievement, and the cultivation of a lasting legacy. That's where “VALUABLE” comes in - it's an acronym that embodies the essence of nurturing employee talent for unparalleled success.",
    content3: " At its core, VALUABLE represents more than just a framework; it embodies a vision. It's about creating an environment where learning is not only encouraged but celebrated, where each individual's potential is recognized and nurtured to fruition. By setting ambitious goals and empowering employees to reach them, this culture instills unwavering determination and resilience in the face of challenges. ", 
    content4: "But VALUABLE goes beyond individual achievement. It's about building a collective legacy that transcends the confines of any single person or moment. It's about creating a culture where every contribution matters, where each success serves as a building block for something greater. In essence, VALUABLE is not just about reaching milestones; it's about leaving an indelible mark on the organization and the world at large.In the pages that follow, we'll explore the principles of VALUABLE and how they can be applied to unlock the full potential of employee talent. From fostering a culture of continuous learning to cultivating a mindset of unwavering accomplishment, we'll uncover the strategies and insights needed to build a legacy of success that endures for generations to come. So, let's dive in and discover how we can build a VALUABLE culture together!.We wanted to remind you to stay connected with us so you can be the first to know about our “VALUABLE”. We love keeping in touch with our community and appreciate your engagement. Let's stay connected!", 
    image: valuableImage },

  { id: 3, 
    title: "Active listening", 
    content: "Imagine this: you're in a pivotal team meeting. Your colleagues are sharing ideas, thoughts, and concerns. You're not just hearing their words; you're understanding their emotions, needs, and motivations. ", 
    content2: "In the bustling world of leadership, communication is our lifeline and at its heart lies the “Active Listening.” 🗣️ But why is it a crucial skill for you?Imagine this: you're in a pivotal team meeting. Your colleagues are sharing ideas, thoughts, and concerns. You're not just hearing their words; you're understanding their emotions, needs, and motivations. You're fully engaged, asking for clarity, summarizing, and showing attentiveness.This is active listening in action, and it's a game-changer in leadership.", 
    content3: "So, how do you truly connect, understand, and inspire those around you? The answer lies in these 7 steps, a formula that weaves together insights from experts and real-world experiences:", 
    content4: "1. Ask Questions: Be curious and seek clarification when needed. 🤔2. Be Attentive: Give your undivided attention; minimize distractions. 🧘3. Clarify and Summarize: Ensure you comprehend by paraphrasing and summarizing. 📝4. Inquire and Probe: Ask probing questions to uncover deeper insights. 🔍5. Tune into Emotions: Reflect on feelings and resist the urge to interrupt. 🌟6. Practice Patience: Embrace pauses for reflection and thoughtful responses. ⏳7. Empathize: Step into their shoes, understand their perspective. 👣These steps are like building blocks, constructing bridges of trust and understanding. 🌉 By practicing active listening, you're not only hearing words; you're hearing hearts, minds, and dreams. 🤝", 
    content5:'Now, I invite you to share your experiences with active listening. 🗣️ How has it transformed your leadership journey? What challenges have you faced, and how did you overcome them? Lets learn from each others stories in the comments below!🌐 Leverage the power of active listening to elevate your leadership to new heights. Share this post with fellow leaders or invite them to join our learning journey. Together, well master the art of active listening! 💪💡',
    image: listeningImage },
 
  { id: 4, 
    title: "Self-Awareness", 
    content: "Why Self-Awareness is Our Superpower: Imagine this: You're in a meeting, leading your team. The room buzzes with ideas, and emotions run high. In that moment, self-awareness is your compass.", 
    content2: "Why Self-Awareness is Our Superpower: Imagine this: You're in a meeting, leading your team. The room buzzes with ideas, and emotions run high. In that moment, self-awareness is your compass. It helps you pause, listen, and respond thoughtfully. It's the key to understanding your strengths and growth areas.", 
    content3: "The First-Time Manager Mirror: Now, let's get personal. Self-awareness isn't about perfection; it's about progress. It's the ability to look in the mirror and say, I'm growing, I'm learning.", 
    content4: "To put into practice:Grab a journal (or open your notes app).Reflect on a recent leadership moment: What went well, and what challenged you? Dive deeper: What emotions did you feel, and why? Imagine you're advising a colleague facing a similar situation. What guidance would you offer?",
    content5:'Why This Matters for First-Time Managers: As you navigate from colleague to captain, self-awareness becomes your sidekick. Its what helps you understand your team, resolve conflicts, and inspire growth.Remember, we are all on this journey together. Let us embrace self-awareness not as a destination but as an ongoing adventure. Share your thoughts and experiences below. How has self-awareness impacted your leadership journey? Stay tuned for more practical insights on our transformation journey. 💪🌟', 
    image: awarnessImage },
];

const BlogDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <IoArrowBackCircle className='text-3xl' onClick={() => navigate(-1)} />
      <div className="bg-white rounded-xl border  border-gray-200 shadow-md overflow-hidden">
        <div className="p-6 flex flex-col gap-3">
        <img src={article.image} alt={article.title} className="w-full h-full rounded-2xl object-fit" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <p className="text-gray-700 text-lg">{article.content}</p>
          <p className="text-gray-700 text-lg">{article.content2}</p>
          <p className="text-gray-700 text-lg">{article.content3}</p>
          <p className="text-gray-700 text-lg">{article.content4}</p>
          <p className="text-gray-700 text-lg">{article.content5}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
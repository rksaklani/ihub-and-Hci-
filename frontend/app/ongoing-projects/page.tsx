import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ongoing Projects - iHub IIT Mandi',
  description: 'Ongoing research and development projects at iHub IIT Mandi.',
}

const projects = [
  {
    sno: 1,
    title: 'Non-Invasive Glucometer for Diabetes- Detection through breath',
    institute: 'IIT Mandi',
    pi: 'Dr. Varun Dutt',
    coPi: 'Dr. Arnav Bhavsar, Dr. Vikrant Kanwar, Dr. Bhupinder Kumar, Dr. Preyender Singh Thakur',
    amount: '67,48,500',
    duration: '2 Years',
    from: '14th March 2023',
    to: '13th March 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/3',
  },
  {
    sno: 2,
    title: 'Integration of digital olfaction with a mobile phone and television.',
    institute: 'IIT Mandi',
    pi: 'Dr. Shubhajit Roy Chowdhury',
    coPi: 'Dr. Amit Balkrishna Pawar, Dr. Aniruddha Chakraborty, Dr. Aditya Nigam, Dr. Trayambak Basak, Dr. Bhaskar Mondal, Dr. Venkata Ratnam Vakacharla, Dr. Priyatosh Mahish, Dr. Moupriya Das, Dr. Robin Khosla',
    amount: '1,07,44,800',
    duration: '2 Years',
    from: '1st May 2023',
    to: '30th April 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/5',
  },
  {
    sno: 3,
    title: 'Designing advanced, efficient, compact, highly reliable sensors and biomarkers-based systems to combat Alzheimer\'s disease, heart attacks, and early-stage cancer.',
    institute: 'IIT Mandi',
    pi: 'Dr. Anirban Sarkar',
    coPi: 'Dr. G. Shrikanth Reddy',
    amount: '62,04,000',
    duration: '2 Years',
    from: '14th March 2023',
    to: '13th March 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/6',
  },
  {
    sno: 4,
    title: 'EEG Source Localization assisted Ayurvedic Intervention in Brain Disorder Management',
    institute: 'IIT Delhi',
    pi: 'Dr. Lalan Kumar',
    coPi: 'Dr. Pramod R. Yadav',
    amount: '39,77,600',
    duration: '2 Years',
    from: '4th April 2023',
    to: '3rd April 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/7',
  },
  {
    sno: 5,
    title: 'Generation of Hindi-English Code Mixed Computational Lexicon and Chatbot Counselling Application for Depression Disorder',
    institute: 'Netaji Subhas University of Technology, Delhi',
    pi: 'Dr Amita Jain',
    coPi: 'Ms Minni Jain',
    amount: '23,99,100',
    duration: '2 Years',
    from: '6th May 2023',
    to: '5th May 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/8',
  },
  {
    sno: 6,
    title: 'Interactive Virtual Surgery Training Agent',
    institute: 'NIT Tiruchirappalli, Tamil Nadu',
    pi: 'Dr. M. Sridevi',
    coPi: 'Dr. Rajeswari Sridhar',
    amount: '17,32,500',
    duration: '2 Years',
    from: '6th May 2023',
    to: '15th May 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/9',
  },
  {
    sno: 7,
    title: 'Detecting Textual Entities with Representational mining on Big Temporal Knowledge Graphs of Ancient Literature and Social Media Data',
    institute: 'IIIT Dharwad',
    pi: 'Dr. Animesh Chaturvedi',
    coPi: '-',
    amount: '21,80,200',
    duration: '2 Years',
    from: '24th July 2023',
    to: '23rd July 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/10',
  },
  {
    sno: 8,
    title: 'Autonomous Bed System for Bedridden Patients',
    institute: 'IIITDM Jabalpur',
    pi: 'Prof. Prabin Kumar Padhy',
    coPi: 'Prof. Vijay Kumar Gupta',
    amount: '25,63,000',
    duration: '2 Years',
    from: '6th May 2023',
    to: '5th May 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/11',
  },
  {
    sno: 9,
    title: 'Developing AI based cognitive function enhancement app by applying Artificial intelligence and biomarker profiling',
    institute: 'IIT Mandi',
    pi: 'Prof. Amit Prasad',
    coPi: 'Prof. Varun Dutt, Prof. Arnav Bhavsar',
    amount: '81,13,600',
    duration: '2 Years',
    from: '6th May 2023',
    to: '5th May 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/12',
  },
  {
    sno: 10,
    title: 'Development of artificial skin integrated with multipurpose sensors and creating perceptual explanations through artificial skin',
    institute: 'IIT Mandi',
    pi: 'Dr. G. Shrikanth Reddy',
    coPi: 'Dr. Satinder Sharma, Dr. Rohit Saluja, …',
    amount: '2,24,29,000',
    duration: '2 Years',
    from: '24th July 2023',
    to: '23rd July 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/13',
  },
  {
    sno: 11,
    title: 'Edible nano-composite-based 3D printing for the gustatory interface',
    institute: 'IIT Mandi',
    pi: 'Dr. Sumit Murab',
    coPi: 'Dr. Garima Agrawal, Dr. Tanushree Parsai, Dr. Prateek Saxena',
    amount: '1,07,47,000',
    duration: '2 Years',
    from: '24th July 2023',
    to: '23rd July 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/14',
  },
  {
    sno: 12,
    title: 'Design and Development of an Electronic Nose to Detect the organic content in the Soil using AI',
    institute: 'CDAC Mohali',
    pi: 'Dr. Balwinder Singh',
    coPi: 'Dr. Jaspal Singh',
    amount: '41,81,100',
    duration: '2 Years',
    from: '24th July 2023',
    to: '23rd July 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/15',
  },
  {
    sno: 13,
    title: 'Development of a Fast and Efficient Motion Planner-Aided Semi-Autonomous Surveillance Drone',
    institute: 'IIT Madras',
    pi: 'Dr. Satadal Ghosh',
    coPi: 'Prof. T. Asokan',
    amount: '49,36,800',
    duration: '2 Years',
    from: '8th January 2024',
    to: '7th January 2026',
    link: 'https://example.com/project-16',
  },
  {
    sno: 14,
    title: 'Integrating imaging, multi-omics and machine learning to capture stress-resistant leaf traits',
    institute: 'CSIR-IHBT, Palampur, HP',
    pi: 'Dr. Gaurav Zinta',
    coPi: 'Dr. Vishal Acharya',
    amount: '76,98,600',
    duration: '2 Years',
    from: '6th December 2023',
    to: '5th December 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/17',
  },
  {
    sno: 15,
    title: 'Optimization for an Image Reconstruction Mechanism for Breast Tumor Detection over the Ultra-wideband Regime…',
    institute: 'IIT Palakkad',
    pi: 'Dr. Sukomal Dey',
    coPi: 'Mahesh R. Panicker',
    amount: '37,91,535',
    duration: '2 Years',
    from: '6th December 2023',
    to: '5th December 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/18',
  },
  {
    sno: 16,
    title: 'Development of Multimodal and Multilingual Human Emotion Detection System',
    institute: 'DIC, Panjab University',
    pi: 'Dr. Nirmal Kaur',
    coPi: 'Prof. Naveen Aggarwal, Dr. Sarabjeet Singh, Dr. Navdeep Kaur',
    amount: '32,34,000',
    duration: '2 Years',
    from: '6th December 2023',
    to: '5th December 2025',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/19',
  },
  {
    sno: 17,
    title: 'Selective grading of tea leaves using deep learning with the integration of hyperspectral images and metabolites to enhance tea quality',
    institute: 'CSIR-IHBT, Palampur, HP',
    pi: 'Dr. Vishal Acharya',
    coPi: 'Dr. Gaurav Zinta, Dr. Sanat Sujat Singh, Dr. Amit Kumar',
    amount: '89,79,089',
    duration: '2 Years',
    from: '21st March 2024',
    to: '20th March 2026',
    link: 'https://firebrick-aardvark-740461.hostingersite.com/node/20',
  },
]

export default function OngoingProjectsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Ongoing Projects</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Explore our active research and development projects in Human-Computer Interaction
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Ongoing Projects</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          {/* Introduction */}
          <div className="text-center mb-12 md:mb-16">
            <div className="glass-strong rounded-2xl p-6 md:p-8 border-2 border-primary/10 shadow-xl max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-project-diagram text-4xl text-primary"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Active Research Projects</h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Discover the innovative research and development projects currently underway at iHub IIT Mandi, spanning various domains of Human-Computer Interaction.
              </p>
            </div>
          </div>

          {/* Projects Table */}
          <div className="w-full mx-auto">
            <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/10">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse table-auto">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white">
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider sticky left-0 bg-gradient-to-r from-primary via-primary-light to-primary-dark z-10 w-[3%]">S.No.</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[25%]">Title of the Proposal</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[12%]">Institute</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[12%]">PI</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[18%]">Co-PI</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[10%] whitespace-nowrap">Amount (INR)</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[7%] whitespace-nowrap">Duration</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[7%] whitespace-nowrap">From</th>
                      <th className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-left text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider w-[6%] whitespace-nowrap">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr 
                        key={project.sno} 
                        className={`transition-all duration-200 border-b border-primary/10 ${
                          index % 2 === 0 
                            ? 'bg-white/60 hover:bg-white/90' 
                            : 'bg-primary-lighter/30 hover:bg-primary-lighter/50'
                        }`}
                      >
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base font-bold text-primary sticky left-0 bg-inherit z-10 border-r border-primary/20">
                          {project.sno}
                        </td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-800 break-words">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors inline-flex items-center gap-2 group/link"
                          >
                            {project.title}
                            <i className="fas fa-external-link-alt text-xs group-hover/link:translate-x-1 transition-transform"></i>
                          </a>
                        </td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-700 font-medium break-words">{project.institute}</td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-700 break-words">{project.pi}</td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-600 break-words">{project.coPi}</td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-800 font-bold whitespace-nowrap">
                          ₹{project.amount}
                        </td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-700 whitespace-nowrap">{project.duration}</td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-600 whitespace-nowrap">{project.from}</td>
                        <td className="px-3 md:px-4 lg:px-6 py-4 md:py-5 text-xs sm:text-sm md:text-base text-gray-600 whitespace-nowrap">{project.to}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-12 md:mt-16 grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="glass-strong rounded-2xl p-6 md:p-8 text-center border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-project-diagram text-3xl text-primary"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{projects.length}</h3>
              <p className="text-lg text-gray-700 font-medium">Active Projects</p>
            </div>
            <div className="glass-strong rounded-2xl p-6 md:p-8 text-center border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-university text-3xl text-primary"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{new Set(projects.map(p => p.institute)).size}</h3>
              <p className="text-lg text-gray-700 font-medium">Partner Institutes</p>
            </div>
            <div className="glass-strong rounded-2xl p-6 md:p-8 text-center border-2 border-primary/10 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rupee-sign text-3xl text-primary"></i>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">₹{projects.reduce((sum, p) => sum + parseFloat(p.amount.replace(/,/g, '')), 0).toLocaleString('en-IN')}</h3>
              <p className="text-lg text-gray-700 font-medium">Total Funding</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


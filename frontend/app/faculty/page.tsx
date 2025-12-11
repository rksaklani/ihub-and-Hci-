'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const boardOfDirectors = [
  {
    name: 'Prof. Laxmidhar Behera',
    position: 'Director, IIT Mandi iHub and HCi Foundation',
    image: '/assets/img/team/director_sir.png',
    linkedin: 'https://www.linkedin.com/in/laxmidhar-behera-a74a5b174/',
  },
  {
    name: 'Prof. Syed Abbas',
    position: 'Director, IIT Mandi iHub and HCi Foundation',
    image: '',
    linkedin: 'https://www.linkedin.com/in/syed-abbas-9447989b/',
  },
  {
    name: 'Prof. Shubhajit Roy Chowdhury',
    position: 'Director, IIT Mandi iHub and HCi Foundation',
    image: '',
    linkedin: 'https://www.linkedin.com/in/shubhajit-roy-chowdhury-494196a/',
  },
  {
    name: 'Air Vice Marshal PKH Sinha VSM (Retd)',
    position: 'Director, IIT Mandi iHub and HCi Foundation, Strategic Advisor, IIT Mandi',
    image: '/assets/img/team/AVM-Pranay-Sinha-150x150.jpeg',
    linkedin: '',
  },
  {
    name: 'Prof. Shyam Kumar Masakapalli',
    position: 'Director, IIT Mandi iHub and HCi Foundation',
    image: '',
    linkedin: 'https://www.linkedin.com/in/shyam-kumar-masakapalli-0023118',
  },
]

const facultyProjects = [
  {
    title: 'Development of Artificial Skin Integrated with Multipurpose Sensors and Creating of Perceptual Explanations through Artificial Skin (Digital Touch)',
    faculty: [
      { name: 'G Shrikanth Reddy (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113369' },
      { name: 'Ranbir Singh (Ph.D)', position: 'Assistant Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/334697' },
      { name: 'Rohit Saluja (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/322064' },
      { name: 'Narendra Kumar Dhar (Ph.D)', position: 'Assistant Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/290494' },
      { name: 'Mrityunjay Doddamani (Ph.D)', position: 'Associate Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/140201' },
      { name: 'Deepak Sachan (Ph.D)', position: 'Assistant Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/323339' },
      { name: 'Jagadeesh Kadiyam (Ph.D)', position: 'Assistant Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/290498' },
      { name: 'Rajendra Kr. Ray (Ph.D)', position: 'Professor, Mathematical and Statistical Sciences, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113318' },
      { name: 'Satinder Sharma (Ph.D)', position: 'Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/62482' },
      { name: 'Atul Dhar (Ph.D)', position: 'Associate Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113331' },
      { name: 'Viswanath Balakrishnan (Ph.D)', position: 'Associate Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113345' },
      { name: 'Anuj Nandanwar (Ph.D)', position: 'Faculty Fellow, IIT Mandi iHub and HCI Foundation, IIT Mandi', profile: 'https://researchid.co/anujnandanwar' },
    ],
  },
  {
    title: 'Integration of Digital Olfaction with a Mobile Phone and Television (Digital Smell)',
    faculty: [
      { name: 'Shubhajit Roy Chowdhury (Ph.D)', position: 'Associate Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113349' },
      { name: 'Aniruddha Chakraborty (Ph.D)', position: 'Professor, Chemical Sciences, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/62484' },
      { name: 'Aditya Nigam (Ph.D)', position: 'Associate Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113340' },
      { name: 'Trayambak Basak (Ph.D)', position: 'Assistant Professor, Biosciences and Bioengineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/151810' },
      { name: 'Amit Balkrishna Pawar (Ph.D)', position: 'Assistant Professor, Chemical Sciences, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/218607' },
      { name: 'Bhaskar Mondal (Ph.D)', position: 'Assistant Professor, Chemical Sciences, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/217266' },
      { name: 'Moupriya Das (Ph.D)', position: 'Assistant Professor, Chemical Sciences, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/256452' },
      { name: 'Venkata R Vakacharla (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/322069' },
      { name: 'Dinesh Singh (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/315740' },
      { name: 'Priyatosh Mahish (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/322061' },
      { name: 'Robin Khosla (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/425436' },
    ],
  },
  {
    title: 'Edible Nano-Composite-Based 3D Printing for the Gustatory Interface (Digital Taste)',
    faculty: [
      { name: 'Sumit Murab (Ph.D)', position: 'Assistant Professor, Biosciences and Bioengineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/289949' },
      { name: 'Garima Agrawal (Ph.D)', position: 'Assistant Professor, Chemical Sciences, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/222789' },
      { name: 'Prateek Saxena (Ph.D)', position: 'Assistant Professor, Mechanical and Material Engineering, IIT Mandi', profile: 'https://smme.iitmandi.ac.in/dedicated.html?data=16' },
    ],
  },
  {
    title: 'Non-Invasive Glucometer',
    faculty: [
      { name: 'Varun Dutt (Ph.D)', position: 'Associate Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113324' },
      { name: 'Arnav Bhavsar (Ph.D)', position: 'Associate Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113329' },
    ],
  },
  {
    title: 'Designing Advanced, Efficient, Compact, Highly Reliable Sensors and Biomarkers-Based Systems to Combat Alzheimer\'s Disease, Heart Attacks, and Early-Stage Cancer.',
    faculty: [
      { name: 'Anirban Sarkar (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/322048' },
      { name: 'G Shrikanth Reddy (Ph.D)', position: 'Assistant Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113369' },
    ],
  },
  {
    title: 'Developing an AI-Based Cognitive Function Enhancement App by Applying Artificial Intelligence and Biomarker Profiling.',
    faculty: [
      { name: 'Amit Prasad (Ph.D)', position: 'Associate Professor, Biosciences and Bioengineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113336' },
      { name: 'Varun Dutt (Ph.D)', position: 'Associate Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113324' },
      { name: 'Arnav Bhavsar (Ph.D)', position: 'Associate Professor, Computing and Electrical Engineering, IIT Mandi', profile: 'https://iitmandi.irins.org/profile/113329' },
    ],
  },
]

const tabs = [
  { id: 'board', label: 'Board of Directors' },
  { id: 'advisors', label: 'Advisors' },
  { id: 'governing', label: 'Hub Governing Body' },
  { id: 'team', label: 'iHub Team' },
  { id: 'affiliated', label: 'Affiliated Faculty' },
]

export default function FacultyPage() {
  const [activeTab, setActiveTab] = useState('board')

  return (
    <div>
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden text-white bg-gradient-to-r from-primary via-primary-light to-primary-dark md:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 bg-white rounded-full w-96 h-96 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 bg-white rounded-full w-96 h-96 blur-3xl"></div>
        </div>
        <div className="container relative z-10 px-2 mx-auto text-center sm:px-4 md:px-6">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Our Team</h1>
          <p className="max-w-2xl mx-auto mb-6 text-lg md:text-xl text-white/90">
            Meet the talented individuals driving innovation at iHub IIT Mandi
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Team</span>
          </nav>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container px-2 mx-auto sm:px-4 md:px-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 md:gap-4 md:mb-16">
            <div className="inline-flex flex-wrap gap-2 p-2 border-2 glass-strong rounded-2xl border-primary/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-bold transition-all duration-300 rounded-xl ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <i className="mr-2 fas fa-users"></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'board' && (
              <div>
                <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl md:text-5xl text-primary">Board of Directors</h2>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
                  {boardOfDirectors.map((member, index) => (
                    <div
                      key={index}
                      className="p-6 text-center transition-all duration-300 border-2 glass-strong rounded-2xl md:p-8 hover:shadow-2xl border-primary/10 hover:border-primary/30 group"
                    >
                      <div className="relative w-40 h-48 mx-auto mb-4 overflow-hidden bg-gray-200 shadow-lg sm:w-48 sm:h-56 md:mb-6 rounded-2xl">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-gray-400 bg-primary/5">
                            <i className="text-6xl fas fa-user"></i>
                          </div>
                        )}
                      </div>
                      <h3 className="mb-3 text-lg font-bold transition-colors md:text-xl text-primary group-hover:text-primary-dark">
                        {member.image ? (
                          <a
                            href={member.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-primary-dark"
                          >
                            {member.name}
                          </a>
                        ) : (
                          member.name
                        )}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base">{member.position}</p>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-12 h-12 transition-all duration-300 transform bg-primary/10 hover:bg-primary rounded-xl text-primary hover:text-white hover:scale-110"
                        >
                          <i className="text-xl fab fa-linkedin"></i>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'advisors' && (
              <div>
                <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl md:text-5xl text-primary">Advisors</h2>
                <div className="p-8 text-center border-2 glass-strong rounded-2xl md:p-12 lg:p-16 border-primary/10">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-2xl">
                    <i className="text-5xl fas fa-user-tie text-primary"></i>
                  </div>
                  <p className="text-lg text-gray-700 md:text-xl">Advisor information will be displayed here.</p>
                </div>
              </div>
            )}

            {activeTab === 'governing' && (
              <div>
                <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl md:text-5xl text-primary">Hub Governing Body</h2>
                <div className="p-8 text-center border-2 glass-strong rounded-2xl md:p-12 lg:p-16 border-primary/10">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-2xl">
                    <i className="text-5xl fas fa-users-cog text-primary"></i>
                  </div>
                  <p className="text-lg text-gray-700 md:text-xl">Hub Governing Body information will be displayed here.</p>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div>
                <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl md:text-5xl text-primary">iHub Team</h2>
                <div className="p-8 text-center border-2 glass-strong rounded-2xl md:p-12 lg:p-16 border-primary/10">
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-2xl">
                    <i className="text-5xl fas fa-users text-primary"></i>
                  </div>
                  <p className="text-lg text-gray-700 md:text-xl">iHub Team members will be displayed here.</p>
                </div>
              </div>
            )}

            {activeTab === 'affiliated' && (
              <div>
                <div className="mb-8 text-center md:mb-12">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-primary">Affiliated Faculty</h2>
                  <p className="max-w-3xl mx-auto text-lg text-gray-600 md:text-xl">
                    Engaged in Translational Research Projects in Human-Computer Interaction (HCi)
                  </p>
                </div>
                <div className="mx-auto max-w-7xl">
                  {facultyProjects.map((project, projectIndex) => (
                    <div key={projectIndex} className="mb-16 md:mb-20">
                      <div className="p-6 mb-8 border-2 shadow-xl glass-strong rounded-2xl md:p-8 border-primary/10">
                        <h3 className="mb-6 text-xl font-bold sm:text-2xl md:text-3xl text-primary">{project.title}</h3>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                        {project.faculty.map((member, memberIndex) => (
                          <div
                            key={memberIndex}
                            className="p-6 text-center transition-all duration-300 border-2 glass-strong rounded-2xl md:p-8 hover:shadow-2xl border-primary/10 hover:border-primary/30 group"
                          >
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-colors bg-primary/10 rounded-xl group-hover:bg-primary/20">
                              <i className="text-2xl fas fa-user-graduate text-primary"></i>
                            </div>
                            <h4 className="mb-3 text-lg font-bold transition-colors md:text-xl text-primary group-hover:text-primary-dark">
                              <a
                                href={member.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:underline"
                              >
                                {member.name}
                                <i className="text-sm fas fa-external-link-alt"></i>
                              </a>
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-700 md:text-base">{member.position}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

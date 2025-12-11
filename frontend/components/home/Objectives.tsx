'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

const objectives = [
  {
    icon: 'fas fa-heart',
    title: 'Outcome-based Research',
    description: 'One of the primary objectives of the HCi Centre is to conduct outcome-based research in human-computer interaction that address societal needs. The research plans to focus on cognitive technologies, brain-computer interfaces, cognitive enhancement, different modalities of smell, taste, and touch, virtual and augmented reality, social computing, machine learning, and intelligent user interfaces.',
  },
  {
    icon: 'fas fa-clock',
    title: 'Deliver Skills Training',
    description: 'Another objective of the HCi Centre is to train the next generation of HCi researchers and practitioners. The Centre plans to offer Certificate, Master and Ph.D. programs, specializations, training programs, and workshops to students and professionals in the field of HCi.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Foster Collaborations',
    description: 'The HCi Centre will foster collaboration among researchers, academics, industry professionals, and other stakeholders. The Centre plans to host seminars, conferences, and workshops to bring together experts in the field of HCi and provide a platform for exchanging ideas and sharing knowledge. This can promote interdisciplinary collaboration, essential for solving complex problems in HCi.',
  },
  {
    icon: 'fas fa-user',
    title: 'Improve User Experience',
    description: 'The HCi Centre will work towards improving the user experience of interactive technologies. The Centre will conduct usability studies, user experience evaluations, and accessibility testing to identify and address issues that may hinder the usability and effectiveness of interactive systems.',
  },
  {
    icon: 'fas fa-database',
    title: 'Develop Social Solutions',
    description: 'The HCi Centre will address societal challenges by developing solutions that positively impact society. The Centre will focus on accessibility, health, education, defense and security, environment, sustainability, etc., and develop technologies that can significantly impact people\'s lives.',
  },
  {
    icon: 'fas fa-cube',
    title: 'Generate Resources',
    description: 'The HCi Centre will try to generate monetary resources via teaching, skill development, research, and leasing the bleeding-edge lab equipment and other facilities to become self-sustaining over time eventually.',
  },
]

export default function Objectives() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container px-2 mx-auto sm:px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Objectives</h2>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="pb-12"
        >
          {objectives.map((objective, index) => (
            <SwiperSlide key={index}>
              <div className="h-full p-6 transition-shadow rounded-lg glass-strong hover:shadow-xl">
                <div className="mb-4 text-5xl text-primary">
                  <i className={objective.icon}></i>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{objective.title}</h3>
                <p className="leading-relaxed text-gray-600">{objective.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}


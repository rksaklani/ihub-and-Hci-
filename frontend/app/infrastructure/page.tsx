import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Office Infrastructure - iHub IIT Mandi',
  description: 'Explore the infrastructure, equipment, and facilities available at iHub IIT Mandi.',
}

const galleryImages = [
  '/assets/img/gallery/office1.jpg',
  '/assets/img/gallery/office2.jpg',
  '/assets/img/gallery/office3.jpg',
  '/assets/img/gallery/office4.jpg',
  '/assets/img/gallery/office 5.jpg',
  '/assets/img/gallery/office6.jpg',
  '/assets/img/gallery/office 7.jpg',
  '/assets/img/gallery/office8.jpg',
  '/assets/img/gallery/office9.jpg',
]

const equipmentCategories = [
  {
    title: 'Social Robots',
    items: ['Furhat', 'Misty', 'Ohbot', 'Otto', 'Picoh'],
  },
  {
    title: 'High End Workstation',
    items: [],
  },
  {
    title: 'VR/AR Equipment',
    items: ['HTC Vive Pro', 'Insta 360 Action Camera', 'Oculus Quest 2'],
  },
  {
    title: 'Motion & Interaction',
    items: ['Logitech 3D Pro Joystick', 'KAT Walk Mini ODT', 'MI Smartwatch'],
  },
  {
    title: '3D Printing & Sensors',
    items: ['Creality 3D Printer', 'EM Wave Pro', 'Polar Band'],
  },
  {
    title: 'Brain-Computer Interface',
    items: ['Muse S', 'Muse 2', 'Intel NUC Mini PC'],
  },
  {
    title: 'Specialized Equipment',
    items: ['Aroma Shooter', 'Pupil Eye Tracker', 'Microsoft HoloLens'],
  },
  {
    title: 'Latest Equipments at iHub',
    items: [
      'ANT Neuro 256 Channel EEG Channel',
      'TDCS (Transcranial Direct Current Stimulation)',
      'Artnis -FNIRS (Functional near-infrared spectroscopy) Device',
      "Apple's Vision Pro AR/VR Headset",
    ],
  },
]

export default function InfrastructurePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden text-white bg-gradient-to-r from-primary via-primary-light to-primary-dark md:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 bg-white rounded-full w-96 h-96 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 bg-white rounded-full w-96 h-96 blur-3xl"></div>
        </div>
        <div className="container relative z-10 px-2 mx-auto text-center sm:px-4 md:px-6">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Office Infrastructure</h1>
          <p className="max-w-2xl mx-auto mb-6 text-lg md:text-xl text-white/90">
            Explore our state-of-the-art facilities and equipment
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Infrastructure</span>
          </nav>
        </div>
      </div>

      {/* Equipment Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container px-2 mx-auto sm:px-4 md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-primary">Equipment at iHub</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              State-of-the-art HCI-enabled equipment for research and development
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {equipmentCategories.map((category, index) => (
              <div key={index} className="p-6 transition-all duration-300 border-2 glass-strong rounded-2xl md:p-8 border-primary/10 hover:border-primary/30 hover:shadow-2xl group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-colors bg-primary/10 rounded-xl group-hover:bg-primary/20">
                    <i className="text-2xl fas fa-tools text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold md:text-2xl text-primary">{category.title}</h3>
                </div>
                {category.items.length > 0 && (
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-700">
                        <i className="flex-shrink-0 mt-1 text-sm fas fa-check-circle text-primary"></i>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white md:py-20">
        <div className="container px-2 mx-auto sm:px-4 md:px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-primary">Office Gallery</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Take a virtual tour of our office spaces and facilities
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 border-2 glass-strong rounded-2xl hover:shadow-2xl border-primary/10 hover:border-primary/30 group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200 md:h-64">
                  <Image
                    src={image}
                    alt={`Office ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent group-hover:opacity-100"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Booking CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container px-2 mx-auto sm:px-4 md:px-6">
          <div className="max-w-4xl p-8 mx-auto text-center border-2 shadow-xl glass-strong rounded-2xl md:p-10 lg:p-12 border-primary/10">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl">
              <i className="text-4xl fas fa-calendar-check text-primary"></i>
            </div>
            <h3 className="mb-6 text-2xl font-bold md:text-3xl text-primary">
              Equipment Booking
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
              If you want to use these HCI-Enabled equipment. Please{' '}
              <a
                href="https://forms.office.com/r/x7Re9UKHtu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-primary hover:text-primary-dark"
              >
                fill out the form
              </a>
              . For more details related to pricing,{' '}
              <a
                href="https://ihubiitmandi.in/wp-content/uploads/2023/03/User-Charges.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-primary hover:text-primary-dark"
              >
                click here
              </a>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://forms.office.com/r/x7Re9UKHtu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <i className="fas fa-file-alt"></i>
                Fill Out Form
              </a>
              <a
                href="https://ihubiitmandi.in/wp-content/uploads/2023/03/User-Charges.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 font-bold transition-all duration-300 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white"
              >
                <i className="fas fa-file-pdf"></i>
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

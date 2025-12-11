import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'News - iHub IIT Mandi',
  description: 'Latest news, announcements, and updates from iHub IIT Mandi.',
}

const newsItems = [
  {
    title: 'Project Associate positions at IIT Mandi iHub and HCI Foundation',
    date: 'November 4th, 2022',
    description: 'Project Associate positions at IIT Mandi iHub and HCI Foundation',
    link: '#',
  },
  {
    title: 'आईआईटी मंडी आईहब और रूबिस्केप ने डेटा साइंस और आर्टिफिशियल इंटेलिजेंस सहयोग के लिए समझौता ज्ञापन पर हस्ताक्षर किए',
    author: 'Nav Prakash',
    date: 'December 7th, 2021',
    description: 'इस अवसर पर निदेशक आईहब डॉ वेंकट कृष्णन, रुबिस्केप से केदार सबने, गौरी बापट, राहुल गाडसिंग, अंकुश पठानिया, नवधा भारद्वाज',
    link: '#',
  },
  {
    title: 'DST To Set Up Technology Hub At IIT Mandi For Human-Computer Interaction Research',
    source: 'NDTV',
    date: 'March 11th, 2020',
    description: 'Technology Hub will be established at IIT Mandi.',
    link: '#',
  },
  {
    title: 'IIT Mandi will establish Technology Innovation Hub',
    source: 'Punjab Kesari',
    date: 'March 12th, 2020',
    description: 'IIT Mandi received grant from DST.',
    link: '#',
  },
  {
    title: 'DST sanctions Rs 7.25 crore to IIT-Mandi to establish Technology Innovation Hub',
    source: 'The Indian Express',
    date: 'March 11th, 2020',
    description: 'IIT Mandi received grant of Rs. 7.25 crores.',
    link: '#',
  },
  {
    title: 'Rs. 7.25 cr sanctioned to establish Technology Innovation Hub',
    source: 'Himachal Dastak',
    date: 'March 12th, 2020',
    description: 'IIT Mandi received grant from DST.',
    link: '#',
  },
  {
    title: 'Technology Innovation Hub will be established in IIT Mandi',
    source: 'Dainik Jagaran',
    date: 'March 12th, 2020',
    description: 'IIT Mandi received grant of Rs. 7.25 crores.',
    link: '#',
  },
  {
    title: 'IIT Mandi gets Rs. 7.25 cr',
    source: 'The Statesman',
    date: 'March 12th, 2020',
    description: 'IIT Mandi received grant of Rs. 7.25 crores.',
    link: '#',
  },
  {
    title: 'IIT Mandi gets Rs. 7.25 crore to set up Innovation Hub',
    source: 'Hindustan Times',
    date: 'March 13th, 2020',
    description: 'IIT Mandi received grant from DST.',
    link: '#',
  },
  {
    title: 'Rs. 7.25 crore approved to establish Technology Innovation Hub at IIT Mandi',
    source: 'Dainik savera',
    date: 'March 13th, 2020',
    description: 'IIT Mandi received grant from DST.',
    link: '#',
  },
  {
    title: 'देश की बढ़ती प्रौद्योगिकी जरूरतों को पूरा करेगी आईआईटी मंडी',
    source: 'Amar Ujala',
    date: 'February 25th, 2021',
    description: 'संस्थान ने पिछले 12 वर्षों में स्थापित अनुसंधान, सहयोग और अंतर्राष्ट्रीय संबंधों में अपनी पहचान बनाई है।',
    link: '#',
  },
  {
    title: 'आइआइटी मंडी मना रहा 12वां स्थापना दिवस, मुख्यमंत्री ने 110 करोड़ से बने आइटी हब का किया उद्घाटन',
    source: 'दैनिक जागरण',
    date: 'February 25th, 2021',
    description: 'संस्थान ने पिछले 12 वर्षों में स्थापित अनुसंधान, सहयोग और अंतर्राष्ट्रीय संबंधों में अपनी पहचान बनाई है।',
    link: '#',
  },
  {
    title: 'Himachal CM inaugurates Technology Innovation Hub at IIT Mandi',
    source: 'Indian News Network',
    date: 'February 25th, 2021',
    description: 'IIT Mandi celebrates 12th Foundation Day with Hon\'ble Chief Minister of Himachal Pradesh',
    link: '#',
  },
  {
    title: 'Himachal Pradesh Chief Minister Inaugurates Technology Innovation Hub At IIT Mandi',
    source: 'India Now',
    date: 'February 25th, 2021',
    description: 'The Chief Minister said the state government would extend all possible help to provide better connectivity and infrastructure facilities.',
    link: '#',
  },
  {
    title: 'आईआईटी मंडी प्रदेश का गर्व, उत्थान के लिए सरकार करेगी हरसंभव सहयोग',
    source: 'Youtube',
    date: 'February 25th, 2021',
    description: 'आईआईटी मंडी प्रदेश का गर्व, उत्थान के लिए सरकार करेगी हरसंभव सहयोग',
    link: '#',
  },
  {
    title: 'कमांद को मिला टेक्नोलॉजी इनोवेशन हब',
    source: 'दिव्य हिमाचल',
    date: 'February 25th, 2021',
    description: 'संस्थान ने पिछले 12 वर्षों में स्थापित अनुसंधान, सहयोग और अंतर्राष्ट्रीय संबंधों में अपनी पहचान बनाई है।',
    link: '#',
  },
  {
    title: 'Himachal CM inaugurates Technology Innovation Hub at IIT Mandi',
    source: 'West Bengal Khabar',
    date: 'February 25th, 2021',
    description: 'IIT Mandi celebrates 12th Foundation Day with Hon\'ble Chief Minister of Himachal Pradesh Shri Jai Ram Thakur as the Chief Guest.',
    link: '#',
  },
  {
    title: 'Himachal CM Inaugurates Technology Innovation Hub At IIT Mandi',
    source: 'Business World',
    date: 'February 25th, 2021',
    description: 'IIT Mandi celebrates 12th Foundation Day with Hon\'ble Chief Minister of Himachal Pradesh Shri Jai Ram Thakur as the Chief Guest.',
    link: '#',
  },
  {
    title: 'Himachal Pradesh Chief Minister inaugurates Technology Innovation Hub at IIT Mandi',
    source: 'Shiksha',
    date: 'February 25th, 2021',
    description: 'IIT Mandi celebrates 12th Foundation Day with Hon\'ble Chief Minister of Himachal Pradesh Shri Jai Ram Thakur as the Chief Guest.',
    link: '#',
  },
  {
    title: 'Hiring! Trainer for web developer course under the skill development program',
    date: 'September 30, 2023',
    description: 'Applications are invited for trainer position for web developer course.',
    link: '#',
  },
  {
    title: 'Hiring! Apply for Member-Technology, CEO\'s Office',
    date: 'September 29, 2023',
    description: 'Applications are invited for Member-Technology position in CEO\'s Office.',
    link: '#',
  },
  {
    title: 'Trainer for solar lighting and assembler course',
    date: 'September 13, 2023',
    description: 'Applications are invited for trainer position for solar lighting and assembler course.',
    link: '#',
  },
  {
    title: 'Trainer for solar PV installer (electrical) course',
    date: 'September 13, 2023',
    description: 'Applications are invited for trainer position for solar PV installer course.',
    link: '#',
  },
  {
    title: 'Applications are invited for management interns',
    date: 'September 13, 2023',
    description: 'Applications are invited for management intern positions.',
    link: '#',
  },
  {
    title: 'Newsletter (May-July 2023)',
    date: 'September 8, 2023',
    description: 'Latest newsletter covering activities from May to July 2023.',
    link: '#',
  },
  {
    title: 'PMKVY4.0 Agriculture Drone Training Student Registration Form',
    date: 'September 5, 2023',
    description: 'IIT Mandi iHub is excited to announce Drone Operations Training for Agriculture Applications!',
    link: '#',
  },
  {
    title: 'Applications are invited for the post of Placement Officer',
    date: 'August 3, 2023',
    description: 'Applications are invited for the post of Placement Officer.',
    link: '#',
  },
  {
    title: 'Call for Proposals Jointly Funded by DST(India)- NSF (U.S.)',
    date: 'July 20, 2023',
    description: 'Call for proposals for joint research projects funded by DST (India) and NSF (U.S.).',
    link: '#',
  },
  {
    title: 'Privacy Policy',
    date: 'July 10, 2023',
    description: 'Updated privacy policy for iHub IIT Mandi.',
    link: '#',
  },
  {
    title: 'Looking for a trainer for Solar PV Installer (Suryamitra)',
    date: 'July 4, 2023',
    description: 'Applications are invited for trainer position for Solar PV Installer course.',
    link: '#',
  },
  {
    title: 'Call for Innovation(Last Date: July 23, 2023)',
    date: 'July 3, 2023',
    description: 'Call for innovation proposals. Last date: July 23, 2023.',
    link: '#',
  },
  {
    title: 'IIT Mandi iHub and HCI Foundation is looking for Technical Assistant- BCI',
    date: 'July 3, 2023',
    description: 'Applications are invited for Technical Assistant position in BCI.',
    link: '#',
  },
  {
    title: 'PMKVY 4.0 registration link',
    date: 'July 3, 2023',
    description: 'Registration link for PMKVY 4.0 program.',
    link: '#',
  },
  {
    title: 'Advertisement For Full-Time Mobilizer/Marketing Person',
    date: 'June 23, 2023',
    description: 'Applications are invited for Full-Time Mobilizer/Marketing Person position.',
    link: '#',
  },
  {
    title: 'Advisors',
    date: 'June 12, 2023',
    description: 'Information about advisors at iHub IIT Mandi.',
    link: '#',
  },
  {
    title: 'Hiring! Trainers to teach Telecom Technician – IoTDevices/System course',
    date: 'June 12, 2023',
    description: 'Applications are invited for trainer positions for Telecom Technician course.',
    link: '#',
  },
  {
    title: 'Solar PV Installer (Suryamitra) course run by IIT Mandi iHub & HCI Foundation',
    date: 'June 2, 2023',
    description: 'Information about Solar PV Installer course.',
    link: '#',
  },
  {
    title: 'Hiring! Apply for Manager – Partnerships and Collaborations',
    date: 'May 24, 2023',
    description: 'Applications are invited for Manager position in Partnerships and Collaborations.',
    link: '#',
  },
  {
    title: 'Hiring! Apply for Graphic Designer',
    date: 'May 16, 2023',
    description: 'Applications are invited for Graphic Designer position.',
    link: '#',
  },
  {
    title: 'Hiring! Apply for Associate/ Sr. Associate PR and Outreach',
    date: 'May 16, 2023',
    description: 'Applications are invited for Associate/Sr. Associate position in PR and Outreach.',
    link: '#',
  },
  {
    title: 'Hiring! Apply for Manager – Skill Development',
    date: 'May 16, 2023',
    description: 'Applications are invited for Manager position in Skill Development.',
    link: '#',
  },
  {
    title: 'Hiring! Apply for Manager (Incubation and Acceleration)',
    date: 'April 28, 2023',
    description: 'Applications are invited for Manager position in Incubation and Acceleration.',
    link: '#',
  },
  {
    title: 'IIT Mandi organises workshop on Indian Knowledge System and mental health',
    source: 'India Today',
    date: 'March 28th, 2022',
    description: 'IIT Mandi has taken the initiative to start an academic program on IKS and Mental Health.',
    link: '#',
  },
  {
    title: 'IIT Mandi conducts workshop on Indian Knowledge System, Mental Health from Mar 25 to Mar 27',
    source: 'Shiksha',
    date: 'March 28th, 2022',
    description: 'IIT Mandi seeks scientific innovations aimed at addressing mental health with the Indian Knowledge System.',
    link: '#',
  },
  {
    title: 'IIT Mandi organises workshop on Indian Knowledge System and mental health',
    source: 'The Telegraph',
    date: 'March 28th, 2022',
    description: 'Workshop participants focused on issues related to IKS and mental health through expert presentations, poster sessions, panel discussions, and brainstorming.',
    link: '#',
  },
]

export default function NewsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">News</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Latest news, announcements, and updates from iHub IIT Mandi
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">News</span>
          </nav>
        </div>
      </div>

      {/* News List */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Latest News</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, announcements, and updates from iHub IIT Mandi
            </p>
          </div>

          {newsItems.length === 0 ? (
            <div className="text-center py-12 glass-strong rounded-2xl border-2 border-primary/10">
              <i className="fas fa-newspaper text-5xl text-gray-400 mb-4"></i>
              <p className="text-gray-600 text-lg">No news available at the moment</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {newsItems.map((news, index) => (
                <div
                  key={index}
                  className="glass-strong rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <i className="fas fa-newspaper text-primary"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-primary group-hover:text-primary-dark transition-colors line-clamp-2">
                        {news.link ? (
                          <a
                            href={news.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-dark transition-colors"
                          >
                            {news.title}
                          </a>
                        ) : (
                          news.title
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-3">
                        {news.source && (
                          <span className="flex items-center gap-1">
                            <i className="fas fa-building text-primary text-xs"></i>
                            {news.source}
                          </span>
                        )}
                        {news.author && (
                          <span className="flex items-center gap-1">
                            <i className="fas fa-user text-primary text-xs"></i>
                            {news.author}
                          </span>
                        )}
                        {news.date && (
                          <span className="flex items-center gap-1">
                            <i className="fas fa-calendar text-primary text-xs"></i>
                            {news.date}
                          </span>
                        )}
                      </div>
                      {news.description && (
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
                          {news.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {news.link && (
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                    >
                      Read More
                      <i className="fas fa-arrow-right text-sm group-hover/link:translate-x-1 transition-transform"></i>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}


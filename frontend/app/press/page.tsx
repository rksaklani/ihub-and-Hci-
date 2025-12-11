import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Press - iHub IIT Mandi',
  description: 'Press releases and media coverage of iHub IIT Mandi.',
}

const pressArticles = [
  {
    title: 'Overcoming the hurdle of accessibility, IIT-Mandi has created a niche for itself',
    description: 'Overcoming the hurdle of accessibility, IIT-Mandi has created a niche for itself in interdisciplinary work, since inception in 2009. Director Laxmidhar Behera, who has a Master\'s degree in engineering from NIT Rourkela and a PhD from IIT Delhi, discusses the wide range of work under taken by the faculty and students.',
    image: '/assets/img/press/Capture.png',
    pdf: 'https://ihubiitmandi.in/wp-content/uploads/2022/11/Article-in-Magazine.pdf',
  },
  {
    title: 'The Times of India - Rise News',
    image: '/assets/img/press/The-Times-of-India-Rise-news.jpg',
    link: '/assets/img/press/The-Times-of-India-Rise-news.jpg',
  },
  {
    title: 'India Women Drone Pilots',
    link: 'https://ssir.org/articles/entry/india-women-drone-pilots',
  },
  {
    title: 'IIT Mandi launches Centre for Human-Computer Interaction',
    link: 'https://www.timesnownews.com/education/iit-mandi-launches-centre-for-human-computer-interaction-article-110106399',
  },
  {
    title: 'IIT Mandi showcases success of Drone Didi program to President Murmu',
    link: 'https://www.timesnownews.com/education/iit-mandi-showcases-success-of-drone-didi-program-to-president-murmu-article-107122186',
  },
  {
    title: 'Dynamic Interplay of Government, Industry and Academia for R&D Advancements',
    link: 'https://www.dqindia.com/dynamic-interplay-of-government-industry-and-academia-for-rd-advancements-dr-akhilesh-gupta-secretary-serb/',
  },
  {
    title: 'Centre for HCI Research to house researchers and facilities',
    link: 'https://bweducation.com/article/centre-for-hci-research-to-house-researchers-and-facilities-somjit-amrit-ceo-iit-mandi-ihub-521084',
  },
  {
    title: 'IIT Mandi launches Human-Computer Interaction centre',
    link: 'https://www.tribuneindia.com/news/himachal/iit-mandi-launches-human-computer-interaction-centre-619975',
  },
  {
    title: 'News from the world of education - May 8, 2024',
    link: 'https://www.thehindu.com/education/news-from-the-world-of-education-may-8-2024/article68153302.ece',
  },
  {
    title: 'Intertwining Computer Science, Industrial Design, Cognitive Psychology for better HCI outcomes',
    link: 'https://www.educationtimes.com/article/campus-beat-college-events/99735647/intertwining-computer-science-industrial-design-cognitive-psychology-for-better-hci-outcomes',
  },
  {
    title: 'IIT Mandi iHub showcases the success of Drone Didi program to President Droupadi Murmu',
    link: 'https://www.hindustantimes.com/education/features/iit-mandi-ihub-showcases-the-success-of-drone-didi-program-to-president-droupadi-murmu-101705492238077.html',
  },
  {
    title: 'IIT Mandi Drone Didi President Murmu',
    link: 'https://yourstory.com/herstory/2024/01/iit-mandi-drone-didi-president-murmu',
  },
  {
    title: 'IIT Mandi iHub showcases success of Drone Didi programme to President Murmu',
    link: 'https://www.indiatoday.in/education-today/news/story/iit-mandi-ihub-showcases-success-of-drone-didi-programme-to-president-murmu-2493342-2024-01-25',
  },
  {
    title: 'Hive Conclave witnesses healthy blend of participation from research, industry professionals',
    link: 'https://bweducation.com/article/hive-conclave-witness-healthy-blend-of-participation-from-research-industry-professionals-499357',
  },
  {
    title: 'Digital Transformation: IIT Mandi iHub and HCI Foundation concluded the first edition of its flagship Hive Conclave',
    link: 'https://www.financialexpress.com/business/digital-transformation-iit-mandi-ihub-and-hci-foundation-concluded-the-first-edition-of-its-flagship-hive-conclave-3312192/',
  },
  {
    title: 'Startup News and Updates Daily Roundup - May 8, 2024',
    link: 'https://yourstory.com/2024/05/startup-news-and-updates-daily-roundup-may-8-2024',
  },
]

export default function PressPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Press</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Media coverage and press releases from iHub IIT Mandi
          </p>
          <nav className="flex justify-center gap-2 text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Press</span>
          </nav>
        </div>
      </div>

      {/* Press Articles */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-primary/5 to-white">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">Press Coverage</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Latest news and media coverage about our work
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pressArticles.map((article, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 group"
              >
                {article.image && (
                  <div className="relative h-48 md:h-56 bg-gray-200 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary group-hover:text-primary-dark transition-colors">
                    {article.link ? (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-dark transition-colors"
                      >
                        {article.title}
                      </a>
                    ) : (
                      article.title
                    )}
                  </h3>
                  {article.description && (
                    <p className="text-base text-gray-700 mb-6 leading-relaxed line-clamp-3">{article.description}</p>
                  )}
                  <div className="flex gap-4">
                    {article.pdf && (
                      <a
                        href={article.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                      >
                        <i className="fas fa-file-pdf"></i>
                        Read more
                        <i className="fas fa-arrow-right text-sm group-hover/link:translate-x-1 transition-transform"></i>
                      </a>
                    )}
                    {article.link && !article.pdf && (
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link"
                      >
                        Read More
                        <i className="fas fa-external-link-alt group-hover/link:translate-x-1 transition-transform"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


import HeroSlider from '@/components/ihub/HeroSlider'
import HCISectors from '@/components/ihub/HCISectors'
import KeyHighlights from '@/components/ihub/KeyHighlights'
import SupportedBy from '@/components/ihub/SupportedBy'
import OurPartners from '@/components/ihub/OurPartners'

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <HCISectors />
      <KeyHighlights />
      <SupportedBy />
      <OurPartners />
    </div>
  )
}

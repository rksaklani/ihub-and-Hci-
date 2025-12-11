declare module 'swiper/react' {
  import { SwiperOptions } from 'swiper'
  import { ReactNode } from 'react'

  export interface SwiperProps extends SwiperOptions {
    children?: ReactNode
    className?: string
    modules?: any[]
    [key: string]: any // Allow any additional props
  }

  export const Swiper: React.FC<SwiperProps>
  export const SwiperSlide: React.FC<{
    children?: ReactNode
    className?: string
  }>
}

declare module 'swiper/modules' {
  export const Navigation: any
  export const Pagination: any
  export const Scrollbar: any
  export const Autoplay: any
  export const EffectFade: any
  export const EffectCube: any
  export const EffectFlip: any
  export const EffectCoverflow: any
  export const EffectCards: any
  export const EffectCreative: any
  export const Thumbs: any
  export const Zoom: any
  export const FreeMode: any
  export const Grid: any
  export const Manipulation: any
  export const Virtual: any
  export const HashNavigation: any
  export const History: any
  export const Keyboard: any
  export const Mousewheel: any
  export const Parallax: any
  export const Controller: any
  export const A11y: any
}


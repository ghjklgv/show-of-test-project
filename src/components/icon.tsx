import * as React from 'react'
import { Icon } from 'antd'

const plusSvg = () => (
  <svg width='22' height='22' viewBox='0 0 22 22'>
    <path
      fill='#FFF'
      d='M11 .23c.915 0 1.657.743 1.657 1.658v7.455h7.455a1.657 1.657 0 1 1 0 3.314h-7.455v7.455a1.657 1.657 0 1 1-3.314 0v-7.455H1.888a1.657 1.657 0 1 1 0-3.314h7.455V1.888C9.343.973 10.085.23 11 .23z'
    />
  </svg>
)
export const PlusIcon = (props: any) => {
  return <Icon component={plusSvg} {...props} />
}

const arrowLeft = () => (
  <svg width='20' height='20' viewBox='0 0 20 20'>
    <g fill='none'>
      <path fill='#FFF' d='M-167-199h1920v4804H-167z' />
      <path
        fill='#47C36F'
        d='M15.578 17.214L8.52 10.06l7.16-7.257c.308-.312.473-.719.473-1.163A1.631 1.631 0 0 0 15.16.124 1.582 1.582 0 0 0 13.96.113a1.587 1.587 0 0 0-.555.366L5.088 8.908a1.62 1.62 0 0 0-.473 1.153c0 .44.166.843.473 1.154l8.195 8.306c.308.312.71.479 1.147.479.438 0 .84-.167 1.148-.479a1.62 1.62 0 0 0 .472-1.154 1.62 1.62 0 0 0-.472-1.153z'
      />
    </g>
  </svg>
)
export const ArrowLeft = (props: any) => {
  return <Icon component={arrowLeft} {...props} />
}

const binIcon = () => (
  <svg width='20' height='20' viewBox='0 0 20 20'>
    <g fill='none'>
      <path fill='#FFF' d='M-1630-2727H290V652h-1920z' />
      <path fill='#EBEFF6' d='M-1467-1509H119V116h-1586z' />
      <path fill='#ECECEC' stroke='#31548C' d='M-742.5-17.5h788v53h-788z' />
      <g fill='#0B2D79'>
        <path d='M7.466 0h5.068a1.3 1.3 0 0 1 1.286 1.172l.007.133v1.697h5.404V4.57h-1.643l-1.282 14.716a.78.78 0 0 1-.674.709l-.099.006H4.441a.777.777 0 0 1-.758-.616l-.015-.099L2.386 4.57H.769V3.003l5.404-.001V1.305c0-.674.51-1.231 1.161-1.298L7.466 0h5.068zm8.565 4.57H3.943l1.208 13.863h9.672L16.03 4.57zM7.766 6.922l.35 9.251-1.613.057-.35-9.25 1.613-.058zm4.51-5.356H7.724v1.435h4.55V1.567z' />
      </g>
    </g>
  </svg>
)
export const BinIcon = (props: any) => {
  return <Icon component={binIcon} {...props} />
}

const deleteCircle = () => (
  <svg width='26' height='26' viewBox='0 0 26 26'>
    <defs>
      <rect id='b' width='620' height='300' rx='4' />
      <filter
        id='a'
        width='105%'
        height='110.3%'
        x='-2.5%'
        y='-4.8%'
        filterUnits='objectBoundingBox'
      >
        <feOffset dy='1' in='SourceAlpha' result='shadowOffsetOuter1' />
        <feGaussianBlur
          in='shadowOffsetOuter1'
          result='shadowBlurOuter1'
          stdDeviation='5'
        />
        <feComposite
          in='shadowBlurOuter1'
          in2='SourceAlpha'
          operator='out'
          result='shadowBlurOuter1'
        />
        <feColorMatrix
          in='shadowBlurOuter1'
          values='0 0 0 0 0.678442029 0 0 0 0 0.67783443 0 0 0 0 0.67783443 0 0 0 0.8 0'
        />
      </filter>
    </defs>
    <g fill='none'>
      <path fill='#FFF' d='M-680-376h1920V704H-680z' />
      <path fill='#EBEFF6' d='M-517-201h1586v1625H-517z' />
      <path fill='#081D4E' d='M-680-376h1920v2336H-680z' opacity='.45' />
      <g transform='translate(-30 -30)'>
        <use fill='#000' filter='url(#a)' />
        <rect
          width='619'
          height='299'
          x='.5'
          y='.5'
          fill='#FFF'
          stroke='#ECECEC'
          stroke-linejoin='square'
          rx='4'
        />
      </g>
      <path
        fill='#DF4242'
        d='M14.36 3.391c.28.176.518.405.702.672l10.53 15.27c.75 1.09.437 2.556-.702 3.276a2.55 2.55 0 0 1-1.361.391H2.47C1.106 23 0 21.941 0 20.635c0-.463.142-.916.409-1.303l10.529-15.27c.751-1.09 2.284-1.39 3.423-.67zm-2.048 1.54L1.783 20.201a.764.764 0 0 0-.136.434c0 .435.369.788.824.788h21.058a.85.85 0 0 0 .454-.13.768.768 0 0 0 .233-1.092L13.687 4.93a.846.846 0 0 0-1.375 0zm.45 12.039c.335 0 .624.113.867.34.242.227.363.501.363.823 0 .331-.119.61-.356.837-.237.227-.529.34-.875.34s-.637-.113-.874-.34a1.114 1.114 0 0 1-.356-.837c0-.322.12-.596.363-.823.242-.227.531-.34.867-.34zm-.016-7.663c.297 0 .54.087.727.262a.897.897 0 0 1 .282.689v5.065a.92.92 0 0 1-.282.696c-.188.18-.43.27-.727.27-.296 0-.536-.09-.719-.27a.932.932 0 0 1-.274-.696v-5.065c0-.275.094-.502.282-.682a.988.988 0 0 1 .711-.27z'
      />
    </g>
  </svg>
)
export const DeleteCircle = (props: any) => {
  return <Icon component={deleteCircle} {...props} />
}

const inforIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16'>
    <g fill='none'>
      <path fill='#FFF' d='M-725-448h1920v3379H-725z' />
      <path fill='#EBEFF6' d='M-562-149h1586v576H-562z' />
      <path
        fill='#0B2D79'
        d='M16 7.893c.023 2.214-.733 4.107-2.268 5.678-1.536 1.571-3.41 2.38-5.625 2.428-2.214.024-4.107-.732-5.678-2.267C.858 12.196.049 10.322.001 8.107-.023 5.893.733 4 2.268 2.43 3.804.858 5.678.049 7.893.001 10.107-.023 12 .733 13.57 2.268c1.571 1.536 2.38 3.41 2.428 5.625zm-7.115-4.47c-.231-.23-.526-.346-.885-.346s-.654.115-.885.346c-.23.23-.346.526-.346.885s.116.654.346.884c.231.231.526.346.885.346s.654-.115.885-.346c.23-.23.346-.525.346-.884 0-.36-.116-.654-.346-.885zm.961 9.5v-.407h-.77V6.154H6.77v.444h.77v5.918h-.77v.407h3.077z'
      />
    </g>
  </svg>
)
export const InforIcon = (props: any) => {
  return <Icon component={inforIcon} {...props} />
}

const slashIcon = () => (
  <svg width='26' height='26' viewBox='0 0 26 26'>
    <g fill='none'>
      <path fill='#FFF' d='M-820-643h1920v4804H-820z' />
      <path fill='#EBEFF6' d='M-657-344H929v576H-657z' />
      <path fill='#0B2D79' d='M10.92 23.416H8.4l6.216-19.488h2.568z' />
    </g>
  </svg>
)
export const SlashIcon = (props: any) => {
  return <Icon component={slashIcon} {...props} />
}

const uploadIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16'>
    <g fill='none'>
      <path fill='#FFF' d='M-256-2615h1920V764H-256z' />
      <path fill='#EBEFF6' d='M-93-1397h1586V228H-93z' />
      <g transform='translate(-12 -12)'>
        <rect width='178' height='42' fill='#47C36F' rx='4' />
        <path
          fill='#FFF'
          d='M25.062 21.385a.62.62 0 0 1 .469.204.64.64 0 0 1 .192.462v2.68c0 .266-.097.501-.286.695a.955.955 0 0 1-.705.297h-9.28a.965.965 0 0 1-.702-.288.965.965 0 0 1-.288-.703v-2.68a.66.66 0 0 1 .188-.465.637.637 0 0 1 .472-.202c.184 0 .346.07.473.202a.66.66 0 0 1 .188.464v2.35c.001.002-.001 0 .006 0h8.612c.002 0 0 .002 0-.006v-2.344a.66.66 0 0 1 .189-.464.637.637 0 0 1 .472-.202zm-4.958-6.923a.64.64 0 0 1 .463.192l1.875 1.875a.646.646 0 0 1 .192.468.646.646 0 0 1-.192.469.64.64 0 0 1-.463.192.688.688 0 0 1-.475-.193l-.733-.74v6.348c0 .18-.07.34-.202.467a.66.66 0 0 1-.465.188.66.66 0 0 1-.464-.188.63.63 0 0 1-.203-.467V16.72l-.745.746a.64.64 0 0 1-.463.192.64.64 0 0 1-.462-.192.646.646 0 0 1-.192-.469c0-.18.065-.342.192-.468l1.875-1.875a.64.64 0 0 1 .462-.192z'
        />
      </g>
    </g>
  </svg>
)
export const UploadIcon = (props: any) => {
  return <Icon component={uploadIcon} {...props} />
}

const icDelete = () => (
  <svg width='17' height='17' viewBox='0 0 17 17'>
    <defs>
      <rect id='b' width='360' height='80' rx='4' />
      <filter
        id='a'
        width='108.6%'
        height='138.8%'
        x='-4.3%'
        y='-18.1%'
        filterUnits='objectBoundingBox'
      >
        <feOffset dy='1' in='SourceAlpha' result='shadowOffsetOuter1' />
        <feGaussianBlur
          in='shadowOffsetOuter1'
          result='shadowBlurOuter1'
          stdDeviation='5'
        />
        <feColorMatrix
          in='shadowBlurOuter1'
          values='0 0 0 0 0.678431373 0 0 0 0 0.678431373 0 0 0 0 0.678431373 0 0 0 0.8 0'
        />
      </filter>
    </defs>
    <g fill='none'>
      <path fill='#FFF' d='M-1547-101H373V979h-1920z' />
      <path fill='#EBEFF6' d='M-1384-192H202v1625h-1586z' />
      <path fill='#47C36F' d='M-1547-101H373V5h-1920z' />
      <g transform='translate(-27 -31)'>
        <use fill='#000' filter='url(#a)' />
        <use fill='#DF4242' />
      </g>
      <g transform='translate(-7 -7)'>
        <circle cx='16' cy='16' r='16' fill='#FFF' />
        <path
          fill='#DF4242'
          d='M10.806 9.22l4.694 4.695 4.694-4.694c.4-.4 1.047-.4 1.447 0l.138.138c.4.4.4 1.048 0 1.447L17.085 15.5l4.694 4.694c.4.4.4 1.047 0 1.447l-.138.138c-.4.4-1.048.4-1.447 0L15.5 17.085l-4.694 4.694c-.4.4-1.047.4-1.447 0l-.138-.138c-.4-.4-.4-1.048 0-1.447l4.694-4.694-4.694-4.694c-.4-.4-.4-1.047 0-1.447l.138-.138c.4-.4 1.048-.4 1.447 0z'
        />
      </g>
    </g>
  </svg>
)
export const IcDelete = (props: any) => {
  return <Icon component={icDelete} {...props} />
}

const icTick = () => (
  <svg width='32' height='32' viewBox='0 0 32 32'>
    <g fill='none'>
      <path fill='#0B2D79' d='M-2513-1770h3736V230h-3736z' />
      <path fill='#FFF' d='M-60-352h1252v549H-60z' />
      <g transform='translate(-20 -24)'>
        <rect width='360' height='80' fill='#134ACB' rx='4' />
        <path
          fill='#47C36F'
          d='M51.16 28.542a2.917 2.917 0 0 1 0 4.094l-19.262 19.41a.878.878 0 0 1-1.246.005l-9.8-9.713a2.902 2.902 0 0 1-.034-4.074 2.848 2.848 0 0 1 4.05-.042l6.409 6.302L47.1 28.544a2.85 2.85 0 0 1 4.06-.002z'
        />
      </g>
    </g>
  </svg>
)
export const IcTick = (props: any) => {
  return <Icon component={icTick} {...props} />
}

const filterUpSvg = () => (
  <svg width='26' height='26' viewBox='0 0 26 26' fill='currentColor'>
    <path
      fillRule='evenodd'
      d='M3.622 6.75l9.298 9.173 9.435-9.309A2.12 2.12 0 0 1 23.866 6a2.12 2.12 0 0 1 1.511.614 2.057 2.057 0 0 1 .476 2.238 2.063 2.063 0 0 1-.476.722L14.42 20.386c-.404.399-.93.614-1.5.614s-1.095-.215-1.5-.614L.623 9.732A2.064 2.064 0 0 1 0 8.24c0-.569.217-1.09.623-1.49.404-.4.929-.615 1.5-.615.57 0 1.095.215 1.5.614z'
      transform='rotate(180,13,13)'
    />
  </svg>
)
export const FilterUpIcon = (props: any) => {
  return <Icon component={filterUpSvg} {...props} />
}

const filterDownSvg = () => (
  <svg width='26' height='26' viewBox='0 0 26 26' fill='currentColor'>
    <path
      fillRule='evenodd'
      d='M3.622 6.75l9.298 9.173 9.435-9.309A2.12 2.12 0 0 1 23.866 6a2.12 2.12 0 0 1 1.511.614 2.057 2.057 0 0 1 .476 2.238 2.063 2.063 0 0 1-.476.722L14.42 20.386c-.404.399-.93.614-1.5.614s-1.095-.215-1.5-.614L.623 9.732A2.064 2.064 0 0 1 0 8.24c0-.569.217-1.09.623-1.49.404-.4.929-.615 1.5-.615.57 0 1.095.215 1.5.614z'
    />
  </svg>
)
export const FilterDownIcon = (props: any) => {
  return <Icon component={filterDownSvg} {...props} />
}

const inforDisabledIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16'>
    <g fill='none'>
      <path fill='#FFF' d='M-725-448h1920v4804H-725z' />
      <path fill='#EBEFF6' d='M-562-149h1586v576H-562z' />
      <path
        fill='#7F7E7E'
        d='M16 7.893c.023 2.214-.733 4.107-2.268 5.678-1.536 1.571-3.41 2.38-5.625 2.428-2.214.024-4.107-.732-5.678-2.267C.858 12.196.049 10.322.001 8.107-.023 5.893.733 4 2.268 2.43 3.804.858 5.678.049 7.893.001 10.107-.023 12 .733 13.57 2.268c1.571 1.536 2.38 3.41 2.428 5.625zm-7.115-4.47c-.231-.23-.526-.346-.885-.346s-.654.115-.885.346c-.23.23-.346.526-.346.885s.116.654.346.884c.231.231.526.346.885.346s.654-.115.885-.346c.23-.23.346-.525.346-.884 0-.36-.116-.654-.346-.885zm.961 9.5v-.407h-.77V6.154H6.77v.444h.77v5.918h-.77v.407h3.077z'
      />
    </g>
  </svg>
)
export const InforDisabledIcon = (props: any) => {
  return <Icon component={inforDisabledIcon} {...props} />
}

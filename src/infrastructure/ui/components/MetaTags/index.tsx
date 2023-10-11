// infrastructure/ui/components/MetaTags

import { Helmet } from 'react-helmet-async'
import { AppName } from '../../utils/constants'

export default function MetaTags({ title }: { title?: string }) {
  return (
    <Helmet>
      <title>{title ?? AppName}</title>
      <meta name="description" content={AppName} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  )
}

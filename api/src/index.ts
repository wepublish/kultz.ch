#!/usr/bin/env node
import {
  WepublishServer,
  URLAdapter,
  PublicArticle,
  PublicPage,
  Author,
  Oauth2Provider,
  MailgunMailProvider, StripePaymentProvider, PayrexxPaymentProvider
} from '@wepublish/api'


import {KarmaMediaAdapter} from '@wepublish/api-media-karma'
import {URL} from 'url'
import {MongoDBAdapter} from '@wepublish/api-db-mongodb/lib'

import { program } from 'commander'
import {importDjangoTsri} from './import'
import bodyParser from 'body-parser'

import pinoMultiStream from 'pino-multi-stream'
import pinoStackdriver from 'pino-stackdriver'
import {createWriteStream} from 'pino-sentry'

interface TsriURLAdapterProps {
  readonly websiteURL: string
}

class TsriURLAdapter implements URLAdapter {

  readonly websiteURL: string

  constructor(props: TsriURLAdapterProps) {
    this.websiteURL = props.websiteURL
  }

  getPublicArticleURL(article: PublicArticle): string {
    return `${this.websiteURL}/zh/${article.id}/${article.slug}`
  }

  getPublicPageURL(page: PublicPage): string {
    return `${this.websiteURL}/${page.slug}.${page.id}`
  }

  getAuthorURL(author: Author): string {
    return `${this.websiteURL}/author/${author.slug || author.id}`
  }

}

async function asyncMain() {
  if (!process.env.MONGO_URL) throw new Error('No MONGO_URL defined in environment.')
  if (!process.env.HOST_URL) throw new Error('No HOST_URL defined in environment.')
  if (!process.env.WEBSITE_URL) throw new Error('No WEBSITE_URL defined in environment.')

  const hostURL = process.env.HOST_URL
  const websiteURL = process.env.WEBSITE_URL

  if (!process.env.MEDIA_SERVER_URL) {
    throw new Error('No MEDIA_SERVER_URL defined in environment.')
  }

  if (!process.env.MEDIA_SERVER_TOKEN) {
    throw new Error('No MEDIA_SERVER_TOKEN defined in environment.')
  }

  const mediaAdapter = new KarmaMediaAdapter(
    new URL(process.env.MEDIA_SERVER_URL),
    process.env.MEDIA_SERVER_TOKEN
  )

  await MongoDBAdapter.initialize({
    url: process.env.MONGO_URL!,
    locale: process.env.MONGO_LOCALE ?? 'en',
    seed: async adapter => {
      const adminUserRole = await adapter.userRole.getUserRole('Admin')
      const adminUserRoleId = adminUserRole ? adminUserRole.id : 'fake'

      await adapter.user.createUser({
        input: {
          email: 'admin@tsri.ch',
          name: 'Admin',
          roleIDs: [adminUserRoleId],
          active: true,
          properties: []
        },
        password: '1234qwer.'
      })
    }
  })

  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000
  const address = process.env.ADDRESS ? process.env.ADDRESS : 'localhost'

  const dbAdapter = await MongoDBAdapter.connect({
    url: process.env.MONGO_URL!,
    locale: process.env.MONGO_LOCALE ?? 'en'
  })

  const oauth2Providers: Oauth2Provider[] = [
    {
      name: 'google',
      discoverUrl: process.env.OAUTH_GOOGLE_DISCOVERY_URL ?? '',
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID ?? '',
      clientKey: process.env.OAUTH_GOOGLE_CLIENT_KEY ?? '',
      redirectUri: [process.env.OAUTH_GOOGLE_REDIRECT_URL ?? ''],
      scopes: ['openid profile email']
    },
    /* {
      name: 'wepublish',
      discoverUrl: process.env.OAUTH_WEPUBLISH_DISCOVERY_URL ?? '',
      clientId: process.env.OAUTH_WEPUBLISH_CLIENT_ID ?? '',
      clientKey: process.env.OAUTH_WEPUBLISH_CLIENT_KEY ?? '',
      redirectUri: [process.env.OAUTH_WEPUBLISH_REDIRECT_URL ?? ''],
      scopes: ['openid profile email']
    } */
  ]

  if (!process.env.MAILGUN_API_KEY) throw new Error('No MAILGUN_API_KEY defined in environment.')
  if (!process.env.MAILGUN_BASE_DOMAIN) throw new Error('No MAILGUN_BASE_DOMAIN defined in environment.')
  if (!process.env.MAILGUN_MAIL_DOMAIN) throw new Error('No MAILGUN_MAIL_DOMAIN defined in environment.')
  if (!process.env.MAILGUN_WEBHOOK_SECRET) throw new Error('No MAILGUN_WEBHOOK_SECRET defined in environment.')
  const mailProvider = new MailgunMailProvider({
    id: 'mailgun',
    name: 'Mailgun',
    fromAddress: 'info@tsri.ch',
    webhookEndpointSecret: process.env.MAILGUN_WEBHOOK_SECRET,
    baseDomain: process.env.MAILGUN_BASE_DOMAIN,
    mailDomain: process.env.MAILGUN_MAIL_DOMAIN,
    apiKey: process.env.MAILGUN_API_KEY,
    incomingRequestHandler: bodyParser.json()
  })

  if (!process.env.STRIPE_SECRET_KEY) throw new Error('No STRIPE_SECRET_KEY defined in environment.')
  if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error('No STRIPE_WEBHOOK_SECRET defined in environment.')
  if (!process.env.PAYREXX_INSTANCE_NAME) throw new Error('No PAYREXX_INSTANCE_NAME defined in environment.')
  if (!process.env.PAYREXX_API_SECRET) throw new Error('No PAYREXX_API_SECRET defined in environment.')
  const paymentProviders = [
    new StripePaymentProvider({
      id: 'stripe',
      name: 'Stripe',
      offSessionPayments: true,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
      incomingRequestHandler: bodyParser.raw({type: 'application/json'})
    }),
    new PayrexxPaymentProvider({
      id: 'payrexx',
      name: 'Payrexx',
      offSessionPayments: false,
      instanceName: process.env.PAYREXX_INSTANCE_NAME,
      instanceAPISecret: process.env.PAYREXX_API_SECRET,
      psp: [0, 15, 17, 2, 3, 36],
      pm: [
        'postfinance_card',
        'postfinance_efinance',
        // "mastercard",
        // "visa",
        'twint',
        // "invoice",
        'paypal'
      ],
      vatRate: 7.7,
      incomingRequestHandler: bodyParser.json()
    })
  ]



  const streams: pinoMultiStream.Streams = []
  if(process.env.HOST_URL.startsWith('http://localhost')) {
    const prettyStream = pinoMultiStream.prettyStream()
    streams.push({stream: prettyStream})
  } else {
    if (!process.env.GOOGLE_PROJECT) throw new Error('No GOOGLE_PROJECT defined in environment.')
    if (!process.env.SENTRY_DSN) throw new Error('No SENTRY_DSN defined in environment.')
    streams.push({
      level: 'info',
      stream: pinoStackdriver.createWriteStream({
        projectId: process.env.GOOGLE_PROJECT,
        logName: 'juanita-api'
      })
    })
    streams.push({
      level: 'error',
      stream: createWriteStream({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.SENTRY_ENV ?? 'dev'
      })
    })
  }

  const logger = pinoMultiStream({
    streams,
    level: 'info'
  })

  const server = new WepublishServer({
    hostURL,
    websiteURL,
    mediaAdapter,
    dbAdapter,
    paymentProviders,
    mailProvider,
    oauth2Providers,
    logger,
    urlAdapter: new TsriURLAdapter({websiteURL}),
    playground: true,
    introspection: true,
    tracing: true
  })

  program.version('0.0.1')

  program
    .command('listen')
    .description('start the api server')
    .action(async () => {
      await server.listen(port, address)
    })

  program
    .command('import')
    .description('import')
    .action(async () => {
      console.log('importing data')
      await importDjangoTsri(dbAdapter, mediaAdapter)
      //process.exit(0)
    })

  program.parse(process.argv);
}

asyncMain().catch(err => {
  console.error(err)
  process.exit(1)
})

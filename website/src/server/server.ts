import 'dotenv/config'

import fs from 'fs'
import path from 'path'

import express from 'express'

import {findEntryFromAssetList} from '@karma.run/webpack'
import {renderMarkup} from './render'
import {matchRoute} from '../shared/route/routeContext'

import {fetch} from 'cross-fetch'

let cachedIntrospectionQuery: any = null

// See: https://www.apollographql.com/docs/react/data/fragments/#fragments-on-unions-and-interfaces
export async function fetchIntrospectionQueryResultData(url: string) {
  if (cachedIntrospectionQuery) return cachedIntrospectionQuery

  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
    })
  })

  const result = await response.json()

  const filteredData = result.data.__schema.types.filter((type: any) => type.possibleTypes !== null)
  result.data.__schema.types = filteredData

  cachedIntrospectionQuery = result.data

  return result.data
}

export async function asyncMain() {
  const canonicalHost = process.env.CANONICAL_HOST

  if (!canonicalHost) throw new Error('No "CANONICAL_HOST" defined in environment.')

  const assetHost = process.env.ASSETS_HOST || '/assets'
  const allowedHosts = (process.env.ALLOWED_HOSTS || '').split(',')

  const moduleMap: Record<string, string[]> = JSON.parse(
    await fs.promises.readFile(path.resolve(__dirname, '../moduleMap.json'), 'utf-8')
  )

  const assetList: Record<string, string[]> = JSON.parse(
    await fs.promises.readFile(path.resolve(__dirname, '../assetList.json'), 'utf-8')
  )

  const clientEntryFile = findEntryFromAssetList('client', assetList)

  if (!clientEntryFile) throw new Error("Couldn't find entry in asset list.")

  const apiURL = process.env.API_URL

  if (!apiURL) throw new Error('No API_URL defined in the environment.')

  const app = express()

  app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
      if (!req.hostname || !allowedHosts.includes(req.hostname)) {
        res.status(400).send('Host not allowed!')
        return
      }
    }

    next()
  })

  app.use('/static', express.static(path.resolve(__dirname, '../../static/')))
  app.use('/assets', express.static(path.resolve(__dirname, '../../assets/')))

  app.get('/robots.txt', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../static/robots.txt'))
  })

  app.get('/mailchimp', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../static/html/mailchimp.html'))
  })

  app.get('/raisenow', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../static/html/raisenow.html'))
  })

  app.get('/*', async (req, res) => {
    const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`
    let introspectionQueryResultData
    try {
      introspectionQueryResultData = await fetchIntrospectionQueryResultData(apiURL)
    } catch (err) {
      console.warn('Fetch Introspect Error', err)
    }

    const oldLinks = [
      {
        old: '/articles/liebeserklaerung/liebeserklaerung.html',
        new: '/a/yZLH6jLP1KswKpx3/martin-erdmann-vermisst-die-beizen'
      },
      {
        old: '/articles/tellrezension/tellrezension.html',
        new: 'a/0UC78g1gKpBKPwh8/luzerner-theater-jana-avanzini-rezensiert-wilhelm-tell'
      },
      {
        old: '/articles/10fragenbart/10fragenbart.html',
        new: 'a/t5EGejefjW6hzOMM/jonas-wydler-befragt-fs-bart'
      },
      {old:'/articles/10fragenfriis/10fragenfriis.html', new: '/a/JS4Z9SlROi9JqGMy/jonas-wydler-befragt-adina-friis'},
      {old:'/articles/buechertipps/buechertipps.html', new: '/a/JoPW5F0BUjm7eusJ/kindheit-sandwichrezepte-und-menschenhass-unsere-buchertipps'},
      {old:'/articles/literaturpandemie/literaturpandemie.html', new: '/a/fpkbdpRAoknsBzTZ/zentralschweizer-literatur-in-zeiten-von-corona'},
      {old:'/articles/einmuezzinfuerobwalden/einmuezzinfuerobwalden.html', new: '/a/CB5qrJKHxKafZuri/ein-muezzin-fur-obwalden'},
      {old:'/articles/10fragencataldo/10fragencataldo.html', new: '/a/AIsGuvKasoXYWdyw/jonas-wydler-befragt-glauco-cataldo'},
      {old:'/articles/praktikumalspapi/praktikumalspapi.html', new: '/a/Gjy9RCqCABXRzKLB/vaterschaftsurlaub-schweiz-ronnie-zumbuhl-testet-ihn-als-erstes'},
      {old:'/articles/10fragenstaubli/10fragenstaubli.html', new: '/a/vWPVfOheGEr43fHH/franziska-staublim-im-interview-mit-jonas-wydler'},
      {old:'/articles/eichwaeldlikommentar/eichwaeldlikommentar.html', new: '/a/FanLPrMEPz4ciF0y/eichwaldli-luzern-kommentar-stadtrat-zeigt-keine-gnade'},
      {old:'/articles/aproposposmeier/aproposposmeier.html', new: '/a/xFYlSgL9nQPqqLL0/luzerner-zeitung-apropos-christian-peter-meier'},
      {old:'/articles/10fragenborer/10fragenborer.html', new: '/a/QqiehHvBuRuu2SGB/simon-borer-im-interview-mit-jonas-wydler-long-tall-jefferson'},
      {old:'/articles/kultzermitteltpilot/kultzermitteltpilot.html', new: '/a/ClJF88FwPkFZG46J/daniel-korber-dominik-wolfinger-kultz-ermittelt-corona-entlebuch'},
      {old:'/articles/zitateuelimaurer/zitateuelimaurer.html', new: '/a/WYNIXgfZdv5hS0G7/ueli-maurer-interview'},
      {old:'/articles/dasinteressanteleben/dasinteressanteleben.html', new: '/a/mBxj7V9UD33gYj6L/das-interessante-leben-in-der-stadt'},
      {old:'/articles/10fragenhappy/10fragenhappy.html', new: '/a/YhQKtC3lInfajo6I/heidi-happy-im-interview-mit-jonas-wydler'},
      {old:'/articles/10fragenmurer/10fragenmurer.html', new: '/a/GyHvAJNnFs30JJqe/alessandra-murer-im-interview-mit-jonas-wydler'},
      {old:'/articles/herbstderschande/herbstderschande.html', new: '/a/rPeuYGTGu0Ox5TZc/ein-herbst-der-schande'},
      {old:'/articles/10fragenfurrer/10fragenfurrer.html', new: '/a/FwUD7ZP0rb259hxd/nick-furrer-im-interview-mit-jonas-wydler'},
      {old:'/articles/10fragenlivers/10fragenlivers.html', new: '/a/7Gk8KRrrfpby1CDf/laura-livers-im-interview-mit-jonas-wydler'},
      {old:'/articles/weihnachtskolumne/weihnachtskolumne.html', new: '/a/FgUEJRVZn7ZVB3BY/oh-du-heiliger-mist-an-weihnachten'},
      {old:'/articles/musikintimike/musikintimike.html', new: '/a/jdMI32WSag5VrRAd/mike-walker-im-interview-mit-jonas-wydler'},
      {old:'/articles/luzernertheaterkommentar/luzernertheaterkommentar.html', new: '/a/3dpSuBThMYteSQOp/die-fehler-mit-dem-neuen-luzerner-stadttheater'},
      {old:'/articles/luzernertheater/luzernertheater.html', new: '/a/l5rXJAKmS2jAXkS8/arger-mit-dem-luzerner-stadttheater'},
      {old:'/articles/yogi/yogi.html', new: '/a/FpQxz2OnAvEsmkfv/die-letzten-yogis-von-seelisberg'},
      {old:'/articles/jungecvp/jungecvp.html', new: '/article/edit/bioX8av0kTvzSepw'},
      {old:'/articles/imueberlebensmodus/imueberlebensmodus.html', new: '/a/4N00JCwpQZ0iqkG3/zentralschweizer-kulturbetriebe-kampfen-gegen-corona'},
      {old:'/articles/letiziaineichen/letiziaineichen.html', new: '/a/whWOUafCX99oenSD/luzerns-neue-kulturchefin-im-interview'},
      {old:'/old/katastrophenmodus.html', new: '/a/y6Jxj3EZvXTjedRc/idyllischer-katastrophenmodus'},
      {old:'/articles/tatort/tatort.html', new: '/a/hK34RrPJOnWrpiSj/gelungener-tatort'},
      {old:'/old/hochreflexive_verarsche.html', new: '/a/rSzGrYnCWDUoFBee/hochreflexive-verarsche-im-luzerner-kleintheater'},
      {old:'/articles/kinokalypse/kinokalypse.html', new: '/a/e62ucdw1LXsi6JgD/kinokalypse-luzern'},
      {old:'/old/auto.html', new: '/a/CKTO2V18SNPUFoYU/umsteigen-auf-attraktive-endgerate'},
      {old:'/old/tenet.html', new: '/a/uoMznWmOI1bjaAnb/tenet-what-the-fuck'},
      {old:'/old/gurtnellen.html', new: '/a/fTmD3ZpSCvwyOwag/gurtnellen-das-dorf'},
      {old:'/old/zu-spaet.html', new: '/a/jz7L62ha7RnbkYdd/auf-den-spuren-des-luzerner-drogenrings'},
      {old:'/old/hiphop.html', new: '/a/oHA0V1Vw4BIKO5Zc/hat-rap-ein-problem-mit-verschworungstheorien'},
      {old:'/old/kolumne_christine.html', new: '/a/GvPEPuh3hp1oAFVy/kuhe-sind-die-wahren-punks'},
      {old:'/old/transparenz.html', new: '/a/lufRNBnaKltJioBJ/kultz-und-transparenz'},
      {old:'/old/last-of-us-2.html', new: '/a/gNHAYhu0DcCFxwIF/wieso-dieses-videospiel-so-gehasst-wird'},
      {old:'/old/ignoranz-nahkampf.html', new: '/a/wJ6797gPEkfg71g5/unterwegs-mit-den-verschworungstheoretikern'},
      {old:'/old/livestreams.html', new: '/a/KONU4us0piaXnaIq/corona-und-uberflussige-livestreams'},
      {old:'/old/kulturwelten.html', new: '/a/YyHaSvvtaRAPVtoB/kulturbegriff-zentralschweiz-kultur-was-heisst-das-eigentlich'},
      {old:'/old/einsamkeit.html', new: '/a/BxSeITMAc2Nxp9Ch/die-einsamkeit-des-rezensenten'},
      {old:'/articles/dialektwoerterbuch/dialektwoerterbuch.html', new: '/a/GzY3gjD2U2tk7lpw/obwaldner-mundartworterbuch-von-karl-imfeld'},
      {old:'/articles/guidograf/guidograf.html', new: '/a/yOyu5PDa6aP3IYeH/zitate-interview-mit-guido-graf'},
      {old:'/articles/mythen/mythen.html', new: '/a/3mY0XR2vHq1q8Rwb/neue-studie-berge-in-schwyz-nur-mythen'},
      {old:'/articles/haexnoergeligaex/haexnoergeligaex.html', new: '/a/3x99T8zgj1ZdmtOq/schliessung-verhindert-hax-norgeligax-ubernimmt-geburtenabteilung-im-spital-sarn'}
    ]
    const found = oldLinks.find((link => link.old === req.originalUrl))

    if (found) {
      return res.redirect(301, `${req.protocol}://${req.headers.host}${found.new}`)
    }

    const initialRoute = matchRoute(url)

    const {markup, error} = await renderMarkup({
      apiURL,
      canonicalHost,
      moduleMap,
      initialRoute,
      clientEntryFile,
      introspectionQueryResultData,
      staticHost: assetHost
    })

    res.setHeader('content-type', 'text/html; charset=utf-8')
    res.setHeader('content-length', Buffer.byteLength(markup))

    res.status(error ? 500 : 200).send(markup)
  })

  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000
  const address = process.env.ADDRESS || 'localhost'

  app.listen(port, address)

  console.log(`Server listening: http://${address}:${port}`)
}

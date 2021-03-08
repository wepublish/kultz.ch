import {
  ArrayBufferUpload,
  AuthorLink,
  BlockType,
  DBAdapter,
  ElementNodeType, EmbedBlock,
  ImageBlock,
  ImageGalleryBlock,
  MediaAdapter,
  MetadataProperty,
  QuoteBlock,
  RichTextBlock,
  TitleBlock,
  TwitterTweetBlock,
  VimeoVideoBlock,
  YouTubeVideoBlock
} from '@wepublish/api'
import {KarmaMediaAdapter} from '@wepublish/api-media-karma/lib'

import {MongoClient} from 'mongodb'
import axios from 'axios'
// @ts-ignore
import {JSDOM} from 'jsdom'
// @ts-ignore
import {deserialize, reorderHTML} from './htmlToSlate'
import {Client} from 'pg'

function slugify(text: string): string {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


async function saveImagetoMediaServer(title: string, path: string, description: string, mediaAdapter: MediaAdapter, dbAdapter: DBAdapter): Promise<string> {

  const splitPath = path.split('/')
  const filename = splitPath[splitPath.length - 1]

  if(!path) return "I1xlGZ2r5DfiM5f"

  const url = `https://tsrich.s3.eu-central-1.amazonaws.com/${path}`
  let result: any
  try {
    result = await axios.get(url, {
      responseType: 'arraybuffer'
    })
  } catch(error) {
    return "I1xlGZ2r5DfiM5f"
  }


  //console.log('imageData', result)

  const arrayBufferPromise = new Promise<ArrayBufferUpload>((resolve, rejects) => {
    resolve({
      arrayBuffer: result.data,
      filename,
      mimetype: result.headers['content-type']
    })
  })
  try {
    const {id, ...image} = await mediaAdapter.uploadImageFromArrayBuffer(arrayBufferPromise)

    const wepImage = await dbAdapter.image.createImage({
      id,
      input: {
        ...image,

        filename: image.filename,
        title,
        description,
        tags: []
      }
    })

    if(!wepImage) {
      throw new Error('wepImage is null or undefined')
    }

    return wepImage.id
  } catch(error) {
    console.log('url', url)
    console.log('Could not upload Image', error)
    return "I1xlGZ2r5DfiM5f"
  }

}



export async function importDjangoTsri(dbAdapter: DBAdapter, mediaAdapter: KarmaMediaAdapter): Promise<void> {
  const clientpg = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT): 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: false
  })
  await clientpg.connect()

  const clientTsri = await MongoClient.connect(process.env.MONGO_URL ?? '')

  /*const articles = await db.collection('article').find({
    id: {$in: [
        "10038",
        "10418",
        "10297",
        "9533",
        "9420",
        "625",
        "9912",
        "10164",
        "9504",
        "9474",
        "9433"
      ]}}).toArray()*/

  //const articles = await clientpg.query('SELECT * FROM articles_article LIMIT 100')
  const articles = await clientpg.query('SELECT * FROM articles_article')

  //const articles = await db.collection('article').find({id: {$in: ["11144"]}}).toArray()
  //const articles = await db.collection('article').find({}).limit(100).toArray()


  for(const article of articles.rows) {
    const elements = []

    //const banners = await db.collection('banner').find({parent_id: article.id}).toArray()
    const banners = await clientpg.query(`SELECT * FROM articles_banner WHERE parent_id=${article.id}`)
    elements.push(...banners.rows.map(el => ({...el, type: 'banner'})))

    const downloads = await clientpg.query(`SELECT * FROM articles_download WHERE parent_id=${article.id}`)
    elements.push(...downloads.rows.map(el => ({...el, type: 'download'})))

    const externals = await clientpg.query(`SELECT * FROM articles_external WHERE parent_id=${article.id}`)
    elements.push(...externals.rows.map(el => ({...el, type: 'external'})))

    const gallerys = await clientpg.query(`SELECT * FROM articles_gallery WHERE parent_id=${article.id}`)
    elements.push(...gallerys.rows.map(el => ({...el, type: 'gallery'})))

    const htmls = await clientpg.query(`SELECT * FROM articles_html WHERE parent_id=${article.id}`)
    elements.push(...htmls.rows.map(el => ({...el, type: 'html'})))

    const images = await clientpg.query(`SELECT * FROM articles_image WHERE parent_id=${article.id}`)
    elements.push(...images.rows.map(el => ({...el, type: 'image'})))

    const quotations = await clientpg.query(`SELECT * FROM articles_quotation WHERE parent_id=${article.id}`)
    elements.push(...quotations.rows.map(el => ({...el, type: 'quotation'})))

    const richtexts = await clientpg.query(`SELECT * FROM articles_richtext WHERE parent_id=${article.id}`)
    elements.push(...richtexts.rows.map(el => ({...el, type: 'richtext'})))

    const snippets = await clientpg.query(`SELECT * FROM articles_snippet WHERE parent_id=${article.id}`)
    elements.push(...snippets.rows.map(el => ({...el, type: 'snippet'})))

    const typeforms = await clientpg.query(`SELECT * FROM articles_typeform WHERE parent_id=${article.id}`)
    elements.push(...typeforms.rows.map(el => ({...el, type: 'typeform'})))

    elements.sort((a, b) => {
      if(a.ordering < b.ordering) return -1
      if(a.ordering > b.ordering) return 1
      return 0
    })

    // console.log('elements', elements)
    let needsManualEdit = false
    const blocks = []
    // get images
    const moodImageID = await saveImagetoMediaServer(article.title, article.image, `Mood image for ${article.title}`, mediaAdapter, dbAdapter)

    const titleBlock: TitleBlock = {
      type: BlockType.Title,
      title: article.title,
      lead: article.excerpt
    }
    blocks.push(titleBlock)

    const moodImageBlock: ImageBlock = {
      type: BlockType.Image,
      imageID: moodImageID,
      caption: article.image_caption?.replace(/<[^>]*>/g, '') || undefined
    }
    blocks.push(moodImageBlock)


    for (const el of elements) {
      switch (el.type) {
        case 'image':
          const img = await saveImagetoMediaServer('', el.image, `Article image for ${article.title}`, mediaAdapter, dbAdapter)
          const imageBlock: ImageBlock = {
            type: BlockType.Image,
            caption: el.caption?.replace(/<[^>]*>/g, '') || undefined,
            imageID: img
          }
          blocks.push(imageBlock)
          break
        case 'banner':
          const bannerBlock: RichTextBlock = {
            type: BlockType.RichText,
            richText: [{type: ElementNodeType.Paragraph, children: [{text: `banner=${el.prefer_mpb}`}]}]
          }
          blocks.push(bannerBlock)
          break
        case 'download':
          const downloadBlock: RichTextBlock = {
            type: BlockType.RichText,
            richText: [{type: ElementNodeType.Paragraph, children: [{type: ElementNodeType.Link, url: el.file, children: [{text: `${el.caption || 'Download'}`}]}]}]
          }
          blocks.push(downloadBlock)
          break
        case 'typeform':
          const typeformBlock: RichTextBlock = {
            type: BlockType.RichText,
            richText: [{type: ElementNodeType.Paragraph, children: [{type: ElementNodeType.Link, url: el.url, children: [{text: `${el.button_text || 'Umfrage'}`}]}]}]
          }
          blocks.push(typeformBlock)
          break
        case 'external':
          const youtubeRegex = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/gm
          const youtubeFounds = youtubeRegex.exec(el.url)
          if(youtubeFounds) {
            //console.log('you', youtubeFounds)
            const youtubeBlock: YouTubeVideoBlock = {
              type: BlockType.YouTubeVideo,
              videoID: youtubeFounds[1]
            }
            blocks.push(youtubeBlock)
          } else if(el.url.startsWith('https://twitter.com')) {
            const splitURL = el.url.split('/')
            const twitterBlock: TwitterTweetBlock = {
              type: BlockType.TwitterTweet,
              userID: splitURL[3],
              tweetID: splitURL[5]
            }
            blocks.push(twitterBlock)
          } else if(el.url.startsWith('https://vimeo')) {
            const splitURL = el.url.split('/')
            const vimeoBlock: VimeoVideoBlock = {
              type: BlockType.VimeoVideo,
              videoID: splitURL[3]
            }
            blocks.push(vimeoBlock)
          } else {
            needsManualEdit = true
            const externalRichTextBlock: RichTextBlock = {
              type: BlockType.RichText,
              richText: [{type: ElementNodeType.Paragraph, children: [{text: `external=${el.url}`}]}]
            }
            blocks.push(externalRichTextBlock)
          }
          break
        case 'gallery':

          //const gallery = await db.collection('glGallery').find({id: el.gallery_id}).toArray()
          const gallery = await clientpg.query(`SELECT * FROM galleries_gallery WHERE id=${el.gallery_id}`)

          const captionBlock: RichTextBlock = {
            type: BlockType.RichText,
            richText: [{type: ElementNodeType.Paragraph, children: [{text: `${gallery.rows[0].title}`}]}]
          }
          blocks.push(captionBlock)

          //const images = await db.collection('glImage').find({gallery_id: el.gallery_id}).toArray()
          const images = await clientpg.query(`SELECT * FROM galleries_image WHERE id=${el.gallery_id}`)
          const galleryBlock: ImageGalleryBlock = {
            type: BlockType.ImageGallery,
            images: []
          }

          for(const image of images.rows) {
            const imgID = await saveImagetoMediaServer('', image.image, '', mediaAdapter, dbAdapter)
            galleryBlock.images.push({imageID: imgID, caption: image.caption || undefined})
          }
          blocks.push(galleryBlock)
          break
        case 'html':
          if(el.html.includes('<div class="autorenposition">') || el.html.startsWith('<div class="messengerwidget">')) {
            console.log('Skip block because not needed')
          } else if(el.html.startsWith('<iframe src')) {
            const document = new JSDOM(`<!DOCTYPE html><body>${el.html}</body></html>`)
            const [iframe] = document.window.document.body.getElementsByTagName('iframe')
            if(iframe) {
              const embedBlock: EmbedBlock = {
                type: BlockType.Embed,
                url: iframe.src,
                height: iframe.height ? parseInt(iframe.height) : undefined,
                width: iframe.width ? parseInt(iframe.width): undefined
              }
              blocks.push(embedBlock)
            }
          } else {
            needsManualEdit = true
            const htmlBlock: RichTextBlock = {
              type: BlockType.RichText,
              richText: [{type: ElementNodeType.Paragraph, children: [{text: `html=${el.html}`}]}]
            }
            blocks.push(htmlBlock)
          }
          break
        case 'quotation':
          const quoteBlock: QuoteBlock = {
            type: BlockType.Quote,
            quote: el.text || undefined,
            author: el.author || undefined
          }
          blocks.push(quoteBlock)
          break
        case 'richtext':
          const parsed = new JSDOM(`<!DOCTYPE html><body>${el.text}</body></html>`)
          // console.log('body', parsed.window.document.body)
          try {
            reorderHTML(parsed.window.document.body)
            const fragment = deserialize(parsed.window.document.body)
            console.log('reordered', fragment, parsed.window.document.body)
            // @ts-ignore
            const richTextBlock: RichTextBlock = {
              type: BlockType.RichText,
              richText: fragment
            }
            blocks.push(richTextBlock)
          } catch(error) {
            console.log('richText error for article', article.id, article.title, el.id)
            console.log('error', error)
          }
          // console.log('fragment', fragment)
          break

      }
    }


    // Add richText block mentioning automated migration
    const migrationBlock: RichTextBlock = {
      type: BlockType.RichText,
      richText: [{type: ElementNodeType.Paragraph, children: [
          {text: 'Dieser Artikel wurde automatisch in das neue CMS von Tsri.ch migriert. Wenn du Fehler bemerkst, darfst du diese sehr gerne unserem '},
          {type: ElementNodeType.Link, url: ' mailto:nico.roos@tsri.ch?subject=Migrations%20Fehler ', children: [{text: `Computerflüsterer`}]},
          {text: ' melden.'}
        ]}]
    }
    blocks.push(migrationBlock)


    const properties: MetadataProperty[] = []

    if(needsManualEdit) {
      properties.push({
        key: 'needsManualEdit',
        public: false,
        value: 'true'
      })
    }


    // Create Author
    //const [user] = await db.collection('authors').find({id: article.author_id}).toArray()
    const query =  await clientpg.query(`SELECT * FROM accounts_user WHERE id=${article.author_id}`)
    const [user] = query.rows
    let author
    if(user) {
      [author] = await dbAdapter.author.getAuthorsBySlug([slugify(user?.full_name ?? '')])

      if (!author) {
        const links: AuthorLink[] = []
        if (user.author_facebook) links.push({url: user.author_facebook, title: "Facebook"})
        if (user.author_instagram) links.push({url: user.author_instagram, title: "Instagram"})
        if (user.author_twitter) links.push({url: user.author_twitter, title: "Twitter"})
        if (user.author_website) links.push({url: user.author_website, title: "Website"})
        if (user.author_trustj) links.push({url: user.author_trustj, title: "TrustJ"})
        author = await dbAdapter.author.createAuthor({
          input: {
            name: user.full_name,
            slug: slugify(user.full_name),
            links,
            bio: []
          }
        })
      }
    }


    // Create Article
    const newArticle = await dbAdapter.article.createArticle({
      input: {
        title: article.title,
        slug: article.slug,
        breaking: false,
        lead: article.excerpt,
        hideAuthor: !article.show_author_box,
        imageID: moodImageID,
        properties,
        tags: [],
        authorIDs: author ? [author.id]: [],
        preTitle: '',
        shared: false,
        socialMediaAuthorIDs: [],
        // @ts-ignore
        blocks
      }
    })

    await clientTsri.db().collection('articles').updateOne({_id: newArticle.id}, {
      $set: {
        createdAt: new Date(article.publication_date),
        modifiedAt: new Date(article.publication_date),
      }
    })

    if(!needsManualEdit) {
      await dbAdapter.article.publishArticle({
        id: newArticle.id,
        publishAt: new Date(),
        publishedAt: new Date(article.publication_date)
      })
    }
  }





  //console.log('articles', articles)

}

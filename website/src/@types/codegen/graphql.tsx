import {gql} from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string
  /** A hexidecimal color value. */
  Color: string
  RichText: any
  Slug: string
}

export type Query = {
  __typename?: 'Query'
  peerProfile: PeerProfile
  peer?: Maybe<Peer>
  navigation?: Maybe<Navigation>
  author?: Maybe<Author>
  authors: AuthorConnection
  article?: Maybe<Article>
  articles: ArticleConnection
  peerArticle?: Maybe<Article>
  page?: Maybe<Page>
  pages: PageConnection
  me?: Maybe<User>
  invoices: Array<Invoice>
  memberPlans: MemberPlanConnection
}

export type QueryPeerArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['Slug']>
}

export type QueryNavigationArgs = {
  id?: Maybe<Scalars['ID']>
  key?: Maybe<Scalars['ID']>
}

export type QueryAuthorArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['Slug']>
}

export type QueryAuthorsArgs = {
  after?: Maybe<Scalars['ID']>
  before?: Maybe<Scalars['ID']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  filter?: Maybe<AuthorFilter>
  sort?: Maybe<AuthorSort>
  order?: Maybe<SortOrder>
}

export type QueryArticleArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QueryArticlesArgs = {
  after?: Maybe<Scalars['ID']>
  before?: Maybe<Scalars['ID']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  filter?: Maybe<ArticleFilter>
  sort?: Maybe<ArticleSort>
  order?: Maybe<SortOrder>
}

export type QueryPeerArticleArgs = {
  peerID?: Maybe<Scalars['ID']>
  peerSlug?: Maybe<Scalars['Slug']>
  id: Scalars['ID']
}

export type QueryPageArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['Slug']>
}

export type QueryPagesArgs = {
  after?: Maybe<Scalars['ID']>
  before?: Maybe<Scalars['ID']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  filter?: Maybe<PublishedPageFilter>
  sort?: Maybe<PublishedPageSort>
  order?: Maybe<SortOrder>
}

export type QueryMemberPlansArgs = {
  after?: Maybe<Scalars['ID']>
  before?: Maybe<Scalars['ID']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  filter?: Maybe<MemberPlanFilter>
  sort?: Maybe<MemberPlanSort>
  order?: Maybe<SortOrder>
}

export type PeerProfile = {
  __typename?: 'PeerProfile'
  name: Scalars['String']
  logo?: Maybe<Image>
  themeColor: Scalars['Color']
  hostURL: Scalars['String']
  websiteURL: Scalars['String']
  callToActionText: Scalars['RichText']
  callToActionURL: Scalars['String']
}

export type Image = {
  __typename?: 'Image'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  modifiedAt: Scalars['DateTime']
  filename?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  tags: Array<Scalars['String']>
  source?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  license?: Maybe<Scalars['String']>
  fileSize: Scalars['Int']
  extension: Scalars['String']
  mimeType: Scalars['String']
  format: Scalars['String']
  width: Scalars['Int']
  height: Scalars['Int']
  focalPoint?: Maybe<Point>
  url?: Maybe<Scalars['String']>
  transformURL?: Maybe<Scalars['String']>
}

export type ImageTransformUrlArgs = {
  input?: Maybe<ImageTransformation>
}

export type Point = {
  __typename?: 'Point'
  x: Scalars['Float']
  y: Scalars['Float']
}

export type ImageTransformation = {
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  rotation?: Maybe<ImageRotation>
  quality?: Maybe<Scalars['Float']>
  output?: Maybe<ImageOutput>
}

export enum ImageRotation {
  Auto = 'AUTO',
  Rotate_0 = 'ROTATE_0',
  Rotate_90 = 'ROTATE_90',
  Rotate_180 = 'ROTATE_180',
  Rotate_270 = 'ROTATE_270'
}

export enum ImageOutput {
  Png = 'PNG',
  Jpeg = 'JPEG',
  Webp = 'WEBP'
}

export type Peer = {
  __typename?: 'Peer'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  modifiedAt: Scalars['DateTime']
  name: Scalars['String']
  slug: Scalars['String']
  hostURL: Scalars['String']
  profile?: Maybe<PeerProfile>
}

export type Navigation = {
  __typename?: 'Navigation'
  id: Scalars['ID']
  key: Scalars['String']
  name: Scalars['String']
  links: Array<NavigationLink>
}

export type NavigationLink = PageNavigationLink | ArticleNavigationLink | ExternalNavigationLink

export type PageNavigationLink = BaseNavigationLink & {
  __typename?: 'PageNavigationLink'
  label: Scalars['String']
  page?: Maybe<Page>
}

export type BaseNavigationLink = {
  label: Scalars['String']
}

export type Page = {
  __typename?: 'Page'
  id: Scalars['ID']
  updatedAt: Scalars['DateTime']
  publishedAt: Scalars['DateTime']
  slug: Scalars['Slug']
  url: Scalars['String']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  tags: Array<Scalars['String']>
  properties: Array<PublicProperties>
  image?: Maybe<Image>
  socialMediaTitle?: Maybe<Scalars['String']>
  socialMediaDescription?: Maybe<Scalars['String']>
  socialMediaImage?: Maybe<Image>
  blocks: Array<Block>
}

export type PublicProperties = {
  __typename?: 'PublicProperties'
  key: Scalars['String']
  value: Scalars['String']
}

export type Block =
  | RichTextBlock
  | ImageBlock
  | ImageGalleryBlock
  | ListicleBlock
  | FacebookPostBlock
  | InstagramPostBlock
  | TwitterTweetBlock
  | VimeoVideoBlock
  | YouTubeVideoBlock
  | SoundCloudTrackBlock
  | EmbedBlock
  | LinkPageBreakBlock
  | TitleBlock
  | QuoteBlock
  | TeaserGridBlock

export type RichTextBlock = {
  __typename?: 'RichTextBlock'
  richText: Scalars['RichText']
}

export type ImageBlock = {
  __typename?: 'ImageBlock'
  image?: Maybe<Image>
  caption?: Maybe<Scalars['String']>
}

export type ImageGalleryBlock = {
  __typename?: 'ImageGalleryBlock'
  images: Array<GalleryImageEdge>
}

export type GalleryImageEdge = {
  __typename?: 'GalleryImageEdge'
  caption?: Maybe<Scalars['String']>
  image?: Maybe<Image>
}

export type ListicleBlock = {
  __typename?: 'ListicleBlock'
  items: Array<ListicleItem>
}

export type ListicleItem = {
  __typename?: 'ListicleItem'
  title: Scalars['String']
  image?: Maybe<Image>
  richText: Scalars['RichText']
}

export type FacebookPostBlock = {
  __typename?: 'FacebookPostBlock'
  userID: Scalars['String']
  postID: Scalars['String']
}

export type InstagramPostBlock = {
  __typename?: 'InstagramPostBlock'
  postID: Scalars['String']
}

export type TwitterTweetBlock = {
  __typename?: 'TwitterTweetBlock'
  userID: Scalars['String']
  tweetID: Scalars['String']
}

export type VimeoVideoBlock = {
  __typename?: 'VimeoVideoBlock'
  videoID: Scalars['String']
}

export type YouTubeVideoBlock = {
  __typename?: 'YouTubeVideoBlock'
  videoID: Scalars['String']
}

export type SoundCloudTrackBlock = {
  __typename?: 'SoundCloudTrackBlock'
  trackID: Scalars['String']
}

export type EmbedBlock = {
  __typename?: 'EmbedBlock'
  url?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  styleCustom?: Maybe<Scalars['String']>
}

export type LinkPageBreakBlock = {
  __typename?: 'LinkPageBreakBlock'
  text?: Maybe<Scalars['String']>
  richText: Scalars['RichText']
  linkURL?: Maybe<Scalars['String']>
  linkText?: Maybe<Scalars['String']>
  linkTarget?: Maybe<Scalars['String']>
  hideButton: Scalars['Boolean']
  styleOption?: Maybe<Scalars['String']>
  layoutOption?: Maybe<Scalars['String']>
  templateOption?: Maybe<Scalars['String']>
  image?: Maybe<Image>
}

export type TitleBlock = {
  __typename?: 'TitleBlock'
  title?: Maybe<Scalars['String']>
  lead?: Maybe<Scalars['String']>
}

export type QuoteBlock = {
  __typename?: 'QuoteBlock'
  quote?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
}

export type TeaserGridBlock = {
  __typename?: 'TeaserGridBlock'
  teasers: Array<Maybe<Teaser>>
  numColumns: Scalars['Int']
}

export type Teaser = ArticleTeaser | PeerArticleTeaser | PageTeaser

export type ArticleTeaser = {
  __typename?: 'ArticleTeaser'
  style: TeaserStyle
  image?: Maybe<Image>
  preTitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  lead?: Maybe<Scalars['String']>
  article?: Maybe<Article>
}

export enum TeaserStyle {
  Default = 'DEFAULT',
  Light = 'LIGHT',
  Text = 'TEXT'
}

export type Article = {
  __typename?: 'Article'
  id: Scalars['ID']
  updatedAt: Scalars['DateTime']
  publishedAt: Scalars['DateTime']
  slug: Scalars['Slug']
  url: Scalars['String']
  preTitle?: Maybe<Scalars['String']>
  title: Scalars['String']
  lead?: Maybe<Scalars['String']>
  tags: Array<Scalars['String']>
  properties: Array<PublicProperties>
  image?: Maybe<Image>
  authors: Array<Maybe<Author>>
  breaking: Scalars['Boolean']
  socialMediaTitle?: Maybe<Scalars['String']>
  socialMediaDescription?: Maybe<Scalars['String']>
  socialMediaAuthors: Array<Author>
  socialMediaImage?: Maybe<Image>
  blocks: Array<Block>
  comments: Array<Comment>
}

export type Author = {
  __typename?: 'Author'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  modifiedAt: Scalars['DateTime']
  name: Scalars['String']
  slug: Scalars['Slug']
  url: Scalars['String']
  links?: Maybe<Array<AuthorLink>>
  bio?: Maybe<Scalars['RichText']>
  jobTitle?: Maybe<Scalars['String']>
  image?: Maybe<Image>
}

export type AuthorLink = {
  __typename?: 'AuthorLink'
  title: Scalars['String']
  url: Scalars['String']
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['ID']
  parentID?: Maybe<Scalars['ID']>
  user: User
  authorType: CommentAuthorType
  itemID: Scalars['ID']
  itemType: CommentItemType
  children?: Maybe<Array<Maybe<Comment>>>
  text: Scalars['RichText']
  state: Scalars['String']
  rejectionReason?: Maybe<Scalars['String']>
  modifiedAt: Scalars['DateTime']
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  name: Scalars['String']
  email: Scalars['String']
  preferredName?: Maybe<Scalars['String']>
  address?: Maybe<UserAddress>
  subscription?: Maybe<UserSubscription>
}

export type UserAddress = {
  __typename?: 'UserAddress'
  street: Scalars['String']
  zipCode: Scalars['String']
  city: Scalars['String']
  country: Scalars['String']
}

export type UserSubscription = {
  __typename?: 'UserSubscription'
  memberPlan: MemberPlan
  paymentPeriodicity: PaymentPeriodicity
  monthlyAmount: Scalars['Int']
  autoRenew: Scalars['Boolean']
  startsAt: Scalars['DateTime']
  paidUntil?: Maybe<Scalars['DateTime']>
  paymentMethod: PaymentMethod
  deactivatedAt?: Maybe<Scalars['DateTime']>
}

export type MemberPlan = {
  __typename?: 'MemberPlan'
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  image?: Maybe<Image>
  description?: Maybe<Scalars['RichText']>
  amountPerMonthMin: Scalars['Int']
  availablePaymentMethods: Array<AvailablePaymentMethod>
}

export type AvailablePaymentMethod = {
  __typename?: 'AvailablePaymentMethod'
  paymentMethods: Array<PaymentMethod>
  paymentPeriodicities: Array<PaymentPeriodicity>
  forceAutoRenewal: Scalars['Boolean']
}

export type PaymentMethod = {
  __typename?: 'PaymentMethod'
  id: Scalars['ID']
  paymentProviderID: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}

export enum PaymentPeriodicity {
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Biannual = 'BIANNUAL',
  Yearly = 'YEARLY'
}

export enum CommentAuthorType {
  Author = 'Author',
  Team = 'Team',
  VerifiedUser = 'VerifiedUser'
}

export enum CommentItemType {
  Article = 'Article',
  Page = 'Page'
}

export type PeerArticleTeaser = {
  __typename?: 'PeerArticleTeaser'
  style: TeaserStyle
  image?: Maybe<Image>
  preTitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  lead?: Maybe<Scalars['String']>
  peer?: Maybe<Peer>
  articleID: Scalars['ID']
  article?: Maybe<Article>
}

export type PageTeaser = {
  __typename?: 'PageTeaser'
  style: TeaserStyle
  image?: Maybe<Image>
  preTitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  lead?: Maybe<Scalars['String']>
  page?: Maybe<Page>
}

export type ArticleNavigationLink = BaseNavigationLink & {
  __typename?: 'ArticleNavigationLink'
  label: Scalars['String']
  article?: Maybe<Article>
}

export type ExternalNavigationLink = BaseNavigationLink & {
  __typename?: 'ExternalNavigationLink'
  label: Scalars['String']
  url: Scalars['String']
}

export type AuthorFilter = {
  name?: Maybe<Scalars['String']>
}

export enum AuthorSort {
  CreatedAt = 'CREATED_AT',
  ModifiedAt = 'MODIFIED_AT'
}

export enum SortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type AuthorConnection = {
  __typename?: 'AuthorConnection'
  nodes: Array<Author>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
}

export type ArticleFilter = {
  authors?: Maybe<Array<Scalars['ID']>>
  tags?: Maybe<Array<Scalars['String']>>
}

export enum ArticleSort {
  PublishedAt = 'PUBLISHED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type ArticleConnection = {
  __typename?: 'ArticleConnection'
  nodes: Array<Article>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PublishedPageFilter = {
  tags?: Maybe<Array<Scalars['String']>>
}

export enum PublishedPageSort {
  PublishedAt = 'PUBLISHED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type PageConnection = {
  __typename?: 'PageConnection'
  nodes: Array<Page>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Invoice = {
  __typename?: 'Invoice'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  modifiedAt: Scalars['DateTime']
  mail: Scalars['String']
  description?: Maybe<Scalars['String']>
  paidAt?: Maybe<Scalars['DateTime']>
  items: Array<InvoiceItem>
  total: Scalars['Int']
}

export type InvoiceItem = {
  __typename?: 'InvoiceItem'
  createdAt: Scalars['DateTime']
  modifiedAt: Scalars['DateTime']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  amount: Scalars['Int']
  total: Scalars['Int']
}

export type MemberPlanFilter = {
  name?: Maybe<Scalars['String']>
  active?: Maybe<Scalars['Boolean']>
}

export enum MemberPlanSort {
  CreatedAt = 'CREATED_AT',
  ModifiedAt = 'MODIFIED_AT'
}

export type MemberPlanConnection = {
  __typename?: 'MemberPlanConnection'
  nodes: Array<MemberPlan>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  createSession: SessionWithToken
  createSessionWithJWT: SessionWithToken
  createSessionWithOAuth2Code: SessionWithToken
  revokeActiveSession: Scalars['Boolean']
  addComment: Comment
  updateComment: Comment
  registerMemberAndReceivePayment: Payment
  resetPassword: Scalars['String']
  updateUser?: Maybe<User>
  updatePassword?: Maybe<User>
  updateUserSubscription?: Maybe<UserSubscription>
  createPaymentFromInvoice?: Maybe<Payment>
}

export type MutationCreateSessionArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationCreateSessionWithJwtArgs = {
  jwt: Scalars['String']
}

export type MutationCreateSessionWithOAuth2CodeArgs = {
  name: Scalars['String']
  code: Scalars['String']
  redirectUri: Scalars['String']
}

export type MutationAddCommentArgs = {
  input: CommentInput
}

export type MutationUpdateCommentArgs = {
  input: CommentUpdateInput
}

export type MutationRegisterMemberAndReceivePaymentArgs = {
  name: Scalars['String']
  preferredName?: Maybe<Scalars['String']>
  email: Scalars['String']
  memberPlanID: Scalars['String']
  autoRenew: Scalars['Boolean']
  paymentPeriodicity: PaymentPeriodicity
  monthlyAmount: Scalars['Int']
  paymentMethodID: Scalars['String']
  successURL?: Maybe<Scalars['String']>
  failureURL?: Maybe<Scalars['String']>
}

export type MutationResetPasswordArgs = {
  email: Scalars['String']
}

export type MutationUpdateUserArgs = {
  input: UserInput
}

export type MutationUpdatePasswordArgs = {
  password: Scalars['String']
  passwordRepeated: Scalars['String']
}

export type MutationUpdateUserSubscriptionArgs = {
  input: UserSubscriptionInput
}

export type MutationCreatePaymentFromInvoiceArgs = {
  input: PaymentFromInvoiceInput
}

export type SessionWithToken = {
  __typename?: 'SessionWithToken'
  user: User
  token: Scalars['String']
  createdAt: Scalars['DateTime']
  expiresAt: Scalars['DateTime']
}

export type CommentInput = {
  parentID?: Maybe<Scalars['ID']>
  itemID: Scalars['ID']
  itemType: CommentItemType
  text: Scalars['RichText']
}

export type CommentUpdateInput = {
  id: Scalars['ID']
  text: Scalars['RichText']
}

export type Payment = {
  __typename?: 'Payment'
  id: Scalars['ID']
  intentSecret?: Maybe<Scalars['String']>
  state: PaymentState
  paymentMethod: PaymentMethod
}

export enum PaymentState {
  Created = 'Created',
  Submitted = 'Submitted',
  RequiresUserAction = 'RequiresUserAction',
  Processing = 'Processing',
  Payed = 'Payed',
  Canceled = 'Canceled',
  Declined = 'Declined'
}

export type UserInput = {
  name: Scalars['String']
  email: Scalars['String']
  preferredName?: Maybe<Scalars['String']>
  address?: Maybe<UserAddressInput>
}

export type UserAddressInput = {
  street: Scalars['String']
  zipCode: Scalars['String']
  city: Scalars['String']
  country: Scalars['String']
}

export type UserSubscriptionInput = {
  memberPlanID: Scalars['String']
  paymentPeriodicity: PaymentPeriodicity
  monthlyAmount: Scalars['Int']
  autoRenew: Scalars['Boolean']
  paymentMethodID: Scalars['String']
}

export type PaymentFromInvoiceInput = {
  invoiceID: Scalars['String']
  paymentMethodID: Scalars['String']
  successURL?: Maybe<Scalars['String']>
  failureURL?: Maybe<Scalars['String']>
}

export type ArticleRefFragment = {__typename?: 'Article'} & Pick<
  Article,
  'id' | 'publishedAt' | 'updatedAt' | 'tags' | 'preTitle' | 'title' | 'lead' | 'slug'
> & {
    image?: Maybe<{__typename?: 'Image'} & Pick<Image, 'url'>>
    authors: Array<
      Maybe<
        {__typename?: 'Author'} & Pick<Author, 'name' | 'bio'> & {
            links?: Maybe<Array<{__typename?: 'AuthorLink'} & Pick<AuthorLink, 'url' | 'title'>>>
          }
      >
    >
  }

export type ArticleListQueryVariables = Exact<{
  filter?: Maybe<Array<Scalars['String']> | Scalars['String']>
  after?: Maybe<Scalars['ID']>
  first?: Maybe<Scalars['Int']>
}>

export type ArticleListQuery = {__typename?: 'Query'} & {
  articles: {__typename?: 'ArticleConnection'} & Pick<ArticleConnection, 'totalCount'> & {
      nodes: Array<{__typename?: 'Article'} & ArticleRefFragment>
      pageInfo: {__typename?: 'PageInfo'} & Pick<
        PageInfo,
        'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'
      >
    }
}

export type ArticleQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type ArticleQuery = {__typename?: 'Query'} & {
  article?: Maybe<
    {__typename?: 'Article'} & Pick<
      Article,
      | 'id'
      | 'updatedAt'
      | 'publishedAt'
      | 'slug'
      | 'url'
      | 'preTitle'
      | 'title'
      | 'lead'
      | 'tags'
      | 'breaking'
    > & {
        properties: Array<
          {__typename?: 'PublicProperties'} & Pick<PublicProperties, 'key' | 'value'>
        >
        authors: Array<
          Maybe<
            {__typename?: 'Author'} & Pick<Author, 'bio'> & {
                image?: Maybe<
                  {__typename?: 'Image'} & Pick<
                    Image,
                    | 'url'
                    | 'id'
                    | 'filename'
                    | 'extension'
                    | 'title'
                    | 'description'
                    | 'width'
                    | 'height'
                  > & {
                      largeURL: Image['transformURL']
                      mediumURL: Image['transformURL']
                      thumbURL: Image['transformURL']
                      squareURL: Image['transformURL']
                      previewURL: Image['transformURL']
                      column1URL: Image['transformURL']
                      column6URL: Image['transformURL']
                    }
                >
                links?: Maybe<
                  Array<{__typename?: 'AuthorLink'} & Pick<AuthorLink, 'url' | 'title'>>
                >
              }
          >
        >
        blocks: Array<
          | ({__typename?: 'RichTextBlock'} & RichtTextBlockDataFragment)
          | ({__typename?: 'ImageBlock'} & ImageBlockDataFragment)
          | ({__typename?: 'ImageGalleryBlock'} & ImageGalleryBlockDataFragment)
          | ({__typename?: 'ListicleBlock'} & ListicleBlockDataFragment)
          | ({__typename?: 'FacebookPostBlock'} & FacebookPostBlockDataFragment)
          | ({__typename?: 'InstagramPostBlock'} & InstagramPostBlockDataFragment)
          | ({__typename?: 'TwitterTweetBlock'} & TwitterTweetBlockDataFragment)
          | ({__typename?: 'VimeoVideoBlock'} & VimeoVideoBlockDataFragment)
          | ({__typename?: 'YouTubeVideoBlock'} & YoutubeVideoBlockDataFragment)
          | ({__typename?: 'SoundCloudTrackBlock'} & SoundCloudTrackBlockDataFragment)
          | ({__typename?: 'EmbedBlock'} & EmbedBlockDataFragment)
          | ({__typename?: 'LinkPageBreakBlock'} & LinkPageBreakBlockDataFragment)
          | ({__typename?: 'TitleBlock'} & TitleBlockDataFragment)
          | ({__typename?: 'QuoteBlock'} & QuoteBlockDataFragment)
          | {__typename?: 'TeaserGridBlock'}
        >
      }
  >
}

export type FullTeaser_ArticleTeaser_Fragment = {__typename?: 'ArticleTeaser'} & Pick<
  ArticleTeaser,
  'style' | 'preTitle' | 'title' | 'lead'
> & {
    image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>
    article?: Maybe<{__typename?: 'Article'} & ArticleRefFragment>
  }

export type FullTeaser_PeerArticleTeaser_Fragment = {__typename?: 'PeerArticleTeaser'} & Pick<
  PeerArticleTeaser,
  'style' | 'preTitle' | 'title' | 'lead' | 'articleID'
> & {
    image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>
    peer?: Maybe<{__typename?: 'Peer'} & PeerWithProfileFragment>
    article?: Maybe<{__typename?: 'Article'} & ArticleRefFragment>
  }

export type FullTeaser_PageTeaser_Fragment = {__typename?: 'PageTeaser'} & Pick<
  PageTeaser,
  'style' | 'preTitle' | 'title' | 'lead'
> & {
    image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>
    page?: Maybe<{__typename?: 'Page'} & PageRefFragment>
  }

export type FullTeaserFragment =
  | FullTeaser_ArticleTeaser_Fragment
  | FullTeaser_PeerArticleTeaser_Fragment
  | FullTeaser_PageTeaser_Fragment

export type TitleBlockDataFragment = {__typename?: 'TitleBlock'} & Pick<
  TitleBlock,
  'title' | 'lead'
>

export type RichtTextBlockDataFragment = {__typename?: 'RichTextBlock'} & Pick<
  RichTextBlock,
  'richText'
>

export type ImageBlockDataFragment = {__typename?: 'ImageBlock'} & Pick<ImageBlock, 'caption'> & {
    image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>
  }

export type ImageGalleryBlockDataFragment = {__typename?: 'ImageGalleryBlock'} & {
  images: Array<
    {__typename?: 'GalleryImageEdge'} & Pick<GalleryImageEdge, 'caption'> & {
        image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>
      }
  >
}

export type FacebookPostBlockDataFragment = {__typename?: 'FacebookPostBlock'} & Pick<
  FacebookPostBlock,
  'userID' | 'postID'
>

export type InstagramPostBlockDataFragment = {__typename?: 'InstagramPostBlock'} & Pick<
  InstagramPostBlock,
  'postID'
>

export type TwitterTweetBlockDataFragment = {__typename?: 'TwitterTweetBlock'} & Pick<
  TwitterTweetBlock,
  'userID' | 'tweetID'
>

export type VimeoVideoBlockDataFragment = {__typename?: 'VimeoVideoBlock'} & Pick<
  VimeoVideoBlock,
  'videoID'
>

export type YoutubeVideoBlockDataFragment = {__typename?: 'YouTubeVideoBlock'} & Pick<
  YouTubeVideoBlock,
  'videoID'
>

export type SoundCloudTrackBlockDataFragment = {__typename?: 'SoundCloudTrackBlock'} & Pick<
  SoundCloudTrackBlock,
  'trackID'
>

export type EmbedBlockDataFragment = {__typename?: 'EmbedBlock'} & Pick<
  EmbedBlock,
  'title' | 'url' | 'width' | 'height' | 'styleCustom'
>

export type ListicleBlockDataFragment = {__typename?: 'ListicleBlock'} & {
  items: Array<
    {__typename?: 'ListicleItem'} & Pick<ListicleItem, 'title' | 'richText'> & {
        image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>
      }
  >
}

export type LinkPageBreakBlockDataFragment = {__typename?: 'LinkPageBreakBlock'} & Pick<
  LinkPageBreakBlock,
  | 'text'
  | 'richText'
  | 'linkURL'
  | 'linkText'
  | 'hideButton'
  | 'linkTarget'
  | 'styleOption'
  | 'layoutOption'
  | 'templateOption'
> & {image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>}

export type QuoteBlockDataFragment = {__typename?: 'QuoteBlock'} & Pick<
  QuoteBlock,
  'quote' | 'author'
>

export type ImageUrLsFragment = {__typename?: 'Image'} & Pick<Image, 'url'> & {
    largeURL: Image['transformURL']
    mediumURL: Image['transformURL']
    thumbURL: Image['transformURL']
    squareURL: Image['transformURL']
    previewURL: Image['transformURL']
    column1URL: Image['transformURL']
    column6URL: Image['transformURL']
  }

export type ImageRefFragment = {__typename?: 'Image'} & Pick<
  Image,
  'id' | 'filename' | 'extension' | 'title' | 'description' | 'width' | 'height'
> &
  ImageUrLsFragment

export type FullImageFragment = {__typename?: 'Image'} & Pick<
  Image,
  | 'id'
  | 'createdAt'
  | 'modifiedAt'
  | 'filename'
  | 'extension'
  | 'width'
  | 'height'
  | 'fileSize'
  | 'description'
  | 'tags'
  | 'author'
  | 'source'
  | 'license'
> & {focalPoint?: Maybe<{__typename?: 'Point'} & Pick<Point, 'x' | 'y'>>} & ImageRefFragment

export type PageRefFragment = {__typename?: 'Page'} & Pick<
  Page,
  'id' | 'publishedAt' | 'updatedAt' | 'title' | 'description'
> & {image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>}

export type PageListQueryVariables = Exact<{
  filter?: Maybe<Array<Scalars['String']> | Scalars['String']>
  after?: Maybe<Scalars['ID']>
  first?: Maybe<Scalars['Int']>
}>

export type PageListQuery = {__typename?: 'Query'} & {
  pages: {__typename?: 'PageConnection'} & Pick<PageConnection, 'totalCount'> & {
      nodes: Array<{__typename?: 'Page'} & PageRefFragment>
      pageInfo: {__typename?: 'PageInfo'} & Pick<
        PageInfo,
        'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'
      >
    }
}

export type PageQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PageQuery = {__typename?: 'Query'} & {
  page?: Maybe<
    {__typename?: 'Page'} & Pick<
      Page,
      'id' | 'publishedAt' | 'updatedAt' | 'slug' | 'title' | 'description' | 'tags'
    > & {
        image?: Maybe<{__typename?: 'Image'} & ImageRefFragment>
        properties: Array<
          {__typename?: 'PublicProperties'} & Pick<PublicProperties, 'key' | 'value'>
        >
        blocks: Array<
          | ({__typename?: 'RichTextBlock'} & RichtTextBlockDataFragment)
          | ({__typename?: 'ImageBlock'} & ImageBlockDataFragment)
          | ({__typename?: 'ImageGalleryBlock'} & ImageGalleryBlockDataFragment)
          | ({__typename?: 'ListicleBlock'} & ListicleBlockDataFragment)
          | ({__typename?: 'FacebookPostBlock'} & FacebookPostBlockDataFragment)
          | ({__typename?: 'InstagramPostBlock'} & InstagramPostBlockDataFragment)
          | ({__typename?: 'TwitterTweetBlock'} & TwitterTweetBlockDataFragment)
          | ({__typename?: 'VimeoVideoBlock'} & VimeoVideoBlockDataFragment)
          | ({__typename?: 'YouTubeVideoBlock'} & YoutubeVideoBlockDataFragment)
          | ({__typename?: 'SoundCloudTrackBlock'} & SoundCloudTrackBlockDataFragment)
          | ({__typename?: 'EmbedBlock'} & EmbedBlockDataFragment)
          | ({__typename?: 'LinkPageBreakBlock'} & LinkPageBreakBlockDataFragment)
          | ({__typename?: 'TitleBlock'} & TitleBlockDataFragment)
          | ({__typename?: 'QuoteBlock'} & QuoteBlockDataFragment)
          | {__typename?: 'TeaserGridBlock'}
        >
      }
  >
}

export type FullPeerProfileFragment = {__typename?: 'PeerProfile'} & Pick<
  PeerProfile,
  'name' | 'hostURL' | 'themeColor'
> & {logo?: Maybe<{__typename?: 'Image'} & ImageRefFragment>}

export type PeerRefFragment = {__typename?: 'Peer'} & Pick<Peer, 'id' | 'name' | 'slug' | 'hostURL'>

export type PeerWithProfileFragment = {__typename?: 'Peer'} & {
  profile?: Maybe<{__typename?: 'PeerProfile'} & FullPeerProfileFragment>
} & PeerRefFragment

export type PeerProfileQueryVariables = Exact<{[key: string]: never}>

export type PeerProfileQuery = {__typename?: 'Query'} & {
  peerProfile: {__typename?: 'PeerProfile'} & FullPeerProfileFragment
}

export type PeerQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PeerQuery = {__typename?: 'Query'} & {
  peer?: Maybe<{__typename?: 'Peer'} & PeerRefFragment>
}

export const ImageUrLsFragmentDoc = gql`
  fragment ImageURLs on Image {
    url
    largeURL: transformURL(input: {width: 500})
    mediumURL: transformURL(input: {width: 300})
    thumbURL: transformURL(input: {width: 280, height: 200})
    squareURL: transformURL(input: {width: 100, height: 100})
    previewURL: transformURL(input: {width: 400, height: 200})
    column1URL: transformURL(input: {width: 800, height: 300})
    column6URL: transformURL(input: {width: 260, height: 300})
  }
`
export const ImageRefFragmentDoc = gql`
  fragment ImageRef on Image {
    id
    filename
    extension
    title
    description
    width
    height
    ...ImageURLs
  }
  ${ImageUrLsFragmentDoc}
`
export const ArticleRefFragmentDoc = gql`
  fragment ArticleRef on Article {
    id
    publishedAt
    updatedAt
    tags
    preTitle
    title
    lead
    slug
    image {
      url
    }
    authors {
      links {
        url
        title
      }
      name
      bio
    }
  }
`
export const PeerRefFragmentDoc = gql`
  fragment PeerRef on Peer {
    id
    name
    slug
    hostURL
  }
`
export const FullPeerProfileFragmentDoc = gql`
  fragment FullPeerProfile on PeerProfile {
    name
    hostURL
    themeColor
    logo {
      ...ImageRef
    }
  }
  ${ImageRefFragmentDoc}
`
export const PeerWithProfileFragmentDoc = gql`
  fragment PeerWithProfile on Peer {
    ...PeerRef
    profile {
      ...FullPeerProfile
    }
  }
  ${PeerRefFragmentDoc}
  ${FullPeerProfileFragmentDoc}
`
export const PageRefFragmentDoc = gql`
  fragment PageRef on Page {
    id
    publishedAt
    updatedAt
    title
    description
    image {
      ...ImageRef
    }
  }
  ${ImageRefFragmentDoc}
`
export const FullTeaserFragmentDoc = gql`
  fragment FullTeaser on Teaser {
    ... on ArticleTeaser {
      style
      image {
        ...ImageRef
      }
      preTitle
      title
      lead
      article {
        ...ArticleRef
      }
    }
    ... on PeerArticleTeaser {
      style
      image {
        ...ImageRef
      }
      preTitle
      title
      lead
      peer {
        ...PeerWithProfile
      }
      articleID
      article {
        ...ArticleRef
      }
    }
    ... on PageTeaser {
      style
      image {
        ...ImageRef
      }
      preTitle
      title
      lead
      page {
        ...PageRef
      }
    }
  }
  ${ImageRefFragmentDoc}
  ${ArticleRefFragmentDoc}
  ${PeerWithProfileFragmentDoc}
  ${PageRefFragmentDoc}
`
export const TitleBlockDataFragmentDoc = gql`
  fragment TitleBlockData on TitleBlock {
    title
    lead
  }
`
export const RichtTextBlockDataFragmentDoc = gql`
  fragment RichtTextBlockData on RichTextBlock {
    richText
  }
`
export const ImageBlockDataFragmentDoc = gql`
  fragment ImageBlockData on ImageBlock {
    caption
    image {
      ...ImageRef
    }
  }
  ${ImageRefFragmentDoc}
`
export const ImageGalleryBlockDataFragmentDoc = gql`
  fragment ImageGalleryBlockData on ImageGalleryBlock {
    images {
      caption
      image {
        ...ImageRef
      }
    }
  }
  ${ImageRefFragmentDoc}
`
export const FacebookPostBlockDataFragmentDoc = gql`
  fragment FacebookPostBlockData on FacebookPostBlock {
    userID
    postID
  }
`
export const InstagramPostBlockDataFragmentDoc = gql`
  fragment InstagramPostBlockData on InstagramPostBlock {
    postID
  }
`
export const TwitterTweetBlockDataFragmentDoc = gql`
  fragment TwitterTweetBlockData on TwitterTweetBlock {
    userID
    tweetID
  }
`
export const VimeoVideoBlockDataFragmentDoc = gql`
  fragment VimeoVideoBlockData on VimeoVideoBlock {
    videoID
  }
`
export const YoutubeVideoBlockDataFragmentDoc = gql`
  fragment YoutubeVideoBlockData on YouTubeVideoBlock {
    videoID
  }
`
export const SoundCloudTrackBlockDataFragmentDoc = gql`
  fragment SoundCloudTrackBlockData on SoundCloudTrackBlock {
    trackID
  }
`
export const EmbedBlockDataFragmentDoc = gql`
  fragment EmbedBlockData on EmbedBlock {
    title
    url
    width
    height
    styleCustom
  }
`
export const ListicleBlockDataFragmentDoc = gql`
  fragment ListicleBlockData on ListicleBlock {
    items {
      title
      richText
      image {
        ...ImageRef
      }
    }
  }
  ${ImageRefFragmentDoc}
`
export const LinkPageBreakBlockDataFragmentDoc = gql`
  fragment LinkPageBreakBlockData on LinkPageBreakBlock {
    text
    richText
    linkURL
    linkText
    hideButton
    linkTarget
    styleOption
    layoutOption
    templateOption
    image {
      ...ImageRef
    }
  }
  ${ImageRefFragmentDoc}
`
export const QuoteBlockDataFragmentDoc = gql`
  fragment QuoteBlockData on QuoteBlock {
    quote
    author
  }
`
export const FullImageFragmentDoc = gql`
  fragment FullImage on Image {
    id
    createdAt
    modifiedAt
    filename
    extension
    width
    height
    fileSize
    description
    tags
    author
    source
    license
    focalPoint {
      x
      y
    }
    ...ImageRef
  }
  ${ImageRefFragmentDoc}
`
export const ArticleListDocument = gql`
  query ArticleList($filter: [String!], $after: ID, $first: Int) {
    articles(first: $first, after: $after, filter: {tags: $filter}) {
      nodes {
        ...ArticleRef
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
  ${ArticleRefFragmentDoc}
`
export type ArticleListQueryResult = Apollo.QueryResult<ArticleListQuery, ArticleListQueryVariables>
export const ArticleDocument = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      updatedAt
      publishedAt
      slug
      url
      preTitle
      title
      lead
      tags
      properties {
        key
        value
      }
      breaking
      authors {
        image {
          url
          largeURL: transformURL(input: {width: 500})
          mediumURL: transformURL(input: {width: 300})
          thumbURL: transformURL(input: {width: 280, height: 200})
          squareURL: transformURL(input: {width: 100, height: 100})
          previewURL: transformURL(input: {width: 400, height: 200})
          column1URL: transformURL(input: {width: 800, height: 300})
          column6URL: transformURL(input: {width: 260, height: 300})
          id
          filename
          extension
          title
          description
          width
          height
        }
        links {
          url
          title
        }
        bio
      }
      blocks {
        ...TitleBlockData
        ...RichtTextBlockData
        ...ImageBlockData
        ...ImageGalleryBlockData
        ...ListicleBlockData
        ...LinkPageBreakBlockData
        ...FacebookPostBlockData
        ...InstagramPostBlockData
        ...TwitterTweetBlockData
        ...VimeoVideoBlockData
        ...YoutubeVideoBlockData
        ...SoundCloudTrackBlockData
        ...EmbedBlockData
        ...QuoteBlockData
      }
    }
  }
  ${TitleBlockDataFragmentDoc}
  ${RichtTextBlockDataFragmentDoc}
  ${ImageBlockDataFragmentDoc}
  ${ImageGalleryBlockDataFragmentDoc}
  ${ListicleBlockDataFragmentDoc}
  ${LinkPageBreakBlockDataFragmentDoc}
  ${FacebookPostBlockDataFragmentDoc}
  ${InstagramPostBlockDataFragmentDoc}
  ${TwitterTweetBlockDataFragmentDoc}
  ${VimeoVideoBlockDataFragmentDoc}
  ${YoutubeVideoBlockDataFragmentDoc}
  ${SoundCloudTrackBlockDataFragmentDoc}
  ${EmbedBlockDataFragmentDoc}
  ${QuoteBlockDataFragmentDoc}
`
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>
export const PageListDocument = gql`
  query PageList($filter: [String!], $after: ID, $first: Int) {
    pages(first: $first, after: $after, filter: {tags: $filter}) {
      nodes {
        ...PageRef
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
  ${PageRefFragmentDoc}
`
export type PageListQueryResult = Apollo.QueryResult<PageListQuery, PageListQueryVariables>
export const PageDocument = gql`
  query Page($id: ID!) {
    page(id: $id) {
      id
      publishedAt
      updatedAt
      slug
      title
      description
      image {
        ...ImageRef
      }
      tags
      properties {
        key
        value
      }
      blocks {
        ...TitleBlockData
        ...RichtTextBlockData
        ...ImageBlockData
        ...ImageGalleryBlockData
        ...ListicleBlockData
        ...LinkPageBreakBlockData
        ...FacebookPostBlockData
        ...InstagramPostBlockData
        ...TwitterTweetBlockData
        ...VimeoVideoBlockData
        ...YoutubeVideoBlockData
        ...SoundCloudTrackBlockData
        ...EmbedBlockData
        ...QuoteBlockData
      }
    }
  }
  ${ImageRefFragmentDoc}
  ${TitleBlockDataFragmentDoc}
  ${RichtTextBlockDataFragmentDoc}
  ${ImageBlockDataFragmentDoc}
  ${ImageGalleryBlockDataFragmentDoc}
  ${ListicleBlockDataFragmentDoc}
  ${LinkPageBreakBlockDataFragmentDoc}
  ${FacebookPostBlockDataFragmentDoc}
  ${InstagramPostBlockDataFragmentDoc}
  ${TwitterTweetBlockDataFragmentDoc}
  ${VimeoVideoBlockDataFragmentDoc}
  ${YoutubeVideoBlockDataFragmentDoc}
  ${SoundCloudTrackBlockDataFragmentDoc}
  ${EmbedBlockDataFragmentDoc}
  ${QuoteBlockDataFragmentDoc}
`
export type PageQueryResult = Apollo.QueryResult<PageQuery, PageQueryVariables>
export const PeerProfileDocument = gql`
  query PeerProfile {
    peerProfile {
      ...FullPeerProfile
    }
  }
  ${FullPeerProfileFragmentDoc}
`
export type PeerProfileQueryResult = Apollo.QueryResult<PeerProfileQuery, PeerProfileQueryVariables>
export const PeerDocument = gql`
  query Peer($id: ID!) {
    peer(id: $id) {
      ...PeerRef
    }
  }
  ${PeerRefFragmentDoc}
`
export type PeerQueryResult = Apollo.QueryResult<PeerQuery, PeerQueryVariables>

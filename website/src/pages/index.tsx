import App from '../components/App'
import {PageArticleListComp, ssrArticleList} from '../@types/codegen/page'
import {withApollo} from '../withApollo'
import ArticleTeaser from '../components/atoms/ArticleTeaser'
//import styled from 'styled-components'
import Spinner from '../components/atoms/Spinner'


export async function getServerSideProps(context) {
  return await ssrArticleList.getServerPage({
    variables: {
      first: 100
    }
  })
}

const Index: PageArticleListComp = () => {
  const {data, loading} = ssrArticleList.usePage(ops => {
    return {
      variables: {
        first: 100
      }
    }
  })

  return (
    <App>
      <div className="lg:container lg:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10">
          {data.articles.nodes.map(article => (
            <ArticleTeaser
              authors={article.authors}
              date={new Date(article.updatedAt).toDateString()}
              title={article.title}
              image={article?.image}
              href={`/zh/${article.slug}.${article.id}`}
            />
          ))}
        </div>
      </div>
      <Spinner loading={loading} />
    </App>
  )
}
export default withApollo(Index)

// You can also override the configs for withApollo here, so if you want
// this page to have SSR (and to be a lambda) for SEO purposes and remove
// the loading state, uncomment the import at the beginning and this:
//
// export default withApollo(Index, { getDataFromTree });

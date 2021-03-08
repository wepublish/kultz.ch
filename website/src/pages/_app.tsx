import '../../styles/globals.scss'
import {useApollo} from '../../utils/apolloClient'
import {ApolloProvider} from '@apollo/client'
import {ThemeProvider} from 'styled-components'
import {theme} from '../../tailwind.config'

function App({Component, pageProps}) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App

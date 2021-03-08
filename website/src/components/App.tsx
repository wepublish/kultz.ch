import Menu from './Menu'

export default function App({ children }) {
  return (
    <>
      <nav>
        <Menu />
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}

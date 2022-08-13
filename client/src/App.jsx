import { Footer, Navbar, Services, Transactions, Welcome } from './components';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <Transactions />
        <Footer />
      </div>
    </div>
  )
}

export default App

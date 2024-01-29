import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage'
import StayDetailPage from '@pages/StayDetailPage'
import SearchPage from '@pages/SearchPage'

import ScrollToTop from '@components/shared/ScrollToTop'
import Navbar from '@components/shared/Navbar'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/stay/:staySeq" element={<StayDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

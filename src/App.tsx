import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StayListPage from '@pages/StayListPage'
import SearchPage from '@pages/SearchPage'
import ScrollToTop from '@components/shared/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<StayListPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

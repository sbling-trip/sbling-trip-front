import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StayListPage from '@pages/StayListPage'
import SearchPage from '@pages/SearchPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StayListPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

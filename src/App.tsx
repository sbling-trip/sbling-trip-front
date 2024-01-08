import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StayListPage from '@pages/stayList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StayListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

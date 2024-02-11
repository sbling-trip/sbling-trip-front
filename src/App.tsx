import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage'
import StayDetailPage from '@pages/StayDetailPage'
import SearchPage from '@pages/SearchPage'
import ReservationPage from '@pages/ReservationPage'
import LoginPage from '@pages/LoginPage'
import SignupPage from '@pages/SignupPage'
import AuthCallbackPage from '@pages/AuthCallbackPage'

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
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

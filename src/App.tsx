import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage'
import StayDetailPage from '@pages/StayDetailPage'
import SearchPage from '@pages/SearchPage'
import ReservationPage from '@pages/ReservationPage'
import MyPage from '@pages/MyPage'
import LoginPage from '@pages/LoginPage'
import SignupPage from '@pages/SignupPage'
import AuthCallbackPage from '@pages/AuthCallbackPage'

import WishList from '@components/my/wish/WishList'
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

        <Route path="/my" element={<MyPage />}>
          <Route path="wish" element={<WishList />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

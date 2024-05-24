import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '@components/shared/ScrollToTop'
import Navbar from '@components/shared/Navbar'
import MainPage from '@pages/MainPage'

const StayDetailPage = lazy(() => import('@pages/StayDetailPage'))
const SearchPage = lazy(() => import('@pages/SearchPage'))
const ReservationPage = lazy(() => import('@pages/ReservationPage'))
const MyPage = lazy(() => import('@pages/MyPage'))
const LoginPage = lazy(() => import('@pages/LoginPage'))
const SignupPage = lazy(() => import('@pages/SignupPage'))
const AuthCallbackPage = lazy(() => import('@pages/AuthCallbackPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'))
const ReservationList = lazy(
  () => import('@components/my/reservation/ReservationList'),
)
const Point = lazy(() => import('@components/my/Point'))
const WishList = lazy(() => import('@components/my/wish/WishList'))
const Profile = lazy(() => import('@components/my/profile/Profile'))

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/stay/:staySeq" element={<StayDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/my" element={<MyPage />}>
            <Route index element={<ReservationList />} />
            <Route path="point" element={<Point />} />
            <Route path="wish" element={<WishList />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

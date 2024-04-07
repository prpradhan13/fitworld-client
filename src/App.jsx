import { Suspense, lazy } from "react"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import FallbackComp from "./components/FallbackComp";

const HomePage = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const AdminRoute = lazy(() => import('./components/Routes/AdminRoute'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AllWorkout = lazy(() => import('./pages/AllWorkout'));
const AllNutrition = lazy(() => import('./pages/AllNutrition'));
const SingleDietPage = lazy(() => import('./pages/SingleDietPage'));
const BmrCalPage = lazy(() => import('./pages/BmrCalPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const About = lazy(() => import('./pages/About'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black">
        <Navbar />
        <Toaster />
        <Suspense fallback={<FallbackComp />}>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/forgotpassword" element={<ForgotPassword />}/>

            <Route path="/admin" element={<AdminRoute />}>
              <Route path="admindashboard" element={<AdminDashboard />}/>
              <Route path="adminusers" element={<AdminUsers />}/>
            </Route>

            <Route path="/allworkout" element={<AllWorkout />}/>
            <Route path="/allnutrition" element={<AllNutrition />}/>
            <Route path="/singledietpage/:id" element={<SingleDietPage />}/>
            <Route path="/bmrcalcpage" element={<BmrCalPage />}/>
            <Route path="/search" element={<SearchPage />}/>
            <Route path="/about" element={<About />}/>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Copyright from "./components/Copyright";

// import PricingScreen from "./pages/Pricing";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";

import HomePage from "./pages/Home";
import HighlightsScreen from "./pages/Highlights";
import NewsScreen from "./pages/News";
import BusinessLab from "./pages/BusinessLab";
import ProfilePage from "./pages/Profile";
import DashboardPage from "./pages/Dashboard";
import SessionPage from "./pages/session/Session";
import NotFound from "./pages/404";

import MachineLearningCourses from "./pages/courses/MLCourses";
import AritificalIntelligenceCourses from "./pages/courses/AICourses";
import BusinessCourses from "./pages/courses/BusinessCourses";

function Layout() {
  return (
    <div>
      <Navbar mode="light" />
      <Outlet />
      <Copyright />
    </div>
  );
}

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      {/* <Route path="/pricing" element={<PricingScreen />} /> */}
      <Route path="/highlights" element={<HighlightsScreen />} />
      <Route path="/news" element={<NewsScreen />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/business-lab" element={<BusinessLab />} />

      {/* Authentication */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Path of Labs of different courses */}
      <Route path="/dashboard/course/machine-learning" element={<MachineLearningCourses />} />
      <Route path="/dashboard/course/artificial-intelligence" element={<AritificalIntelligenceCourses />} />
      <Route path="/dashboard/course/business-labs" element={<BusinessCourses />} />

      <Route path="/session/:id" element={<SessionPage tile />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

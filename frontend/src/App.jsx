import RegistrationForm from './Auth/register.jsx';
import './App.css'
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import LoginPage from './Auth/login.jsx';
import UserDashboard from './user/dashboard.jsx';
import Header from './Layout/Header.jsx';
import Footer from './Layout/footer.jsx';
import PrivateRoute from './util/privateRoute.jsx';
import ViewAttendance from './user/viewAtd.jsx';
import SendLeaveRequest from './user/sendLeaveRequest.jsx';
import AdminAcces from './util/adminAccess.jsx';
import AdminDashboard from './admin/adminDashboard.jsx';
import EditUser from './admin/editUser.jsx';
import LeaveRequestHandler from './admin/handleLeaveRequest.jsx';
import Testimonial from './util/testmonial.jsx';



function App() {
  

  return (
    <>
<BrowserRouter>
<Header/>
<Routes>

  <Route path='/' element={<RegistrationForm/>}/>
  <Route path='/signin' element={<LoginPage/>}/>
  <Route element={<PrivateRoute/>}>
  <Route path='/user/dashboard' element={<UserDashboard/>}/>
  <Route path='/user/view-attendance' element={<ViewAttendance/>}/>
  <Route path='/user/send-leave-request' element={<SendLeaveRequest/>}/>
  </Route>
  <Route path='/developer' element={<Testimonial/>}/>
  <Route element={<AdminAcces/>}>
    <Route path='/admin/dashboard' element={<AdminDashboard/>} />
    <Route path='/admin/dashboard/:userId' element={<EditUser/>} />
    <Route path='/admin/dashboard/leaves-request' element={<LeaveRequestHandler/>} />
  </Route>
</Routes>
<Footer/>
</BrowserRouter>
    </>
  )
}

export default App

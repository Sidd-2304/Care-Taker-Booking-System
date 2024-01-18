import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RouteLayout from './components/RouteLayout';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import UserDashBoard from './components/userdashboard/UserDashBoard';
import CareTakerDashBoard from './components/caretakerdashboard/CareTakerDashBoard';

function App() {

  // create browser router object
  let router=createBrowserRouter([
    {
      path:'',
      element:<RouteLayout/>,
      children:[
        {
          path:'',
          element:<Home />
        },
        {
          path:'home',
          element:<Home/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'register',
          element:<Register/>
        },
        {
          path:'caretaker-dashboard/:name',
          element:<CareTakerDashBoard/>
        },
        {
          path:'user-dashboard/:username',
          element:<UserDashBoard/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

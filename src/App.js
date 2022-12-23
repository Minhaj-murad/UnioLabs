import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Components/Pages/Main/Main';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Shared/Login';
import Register from './Components/Shared/Register';

function App() {
  const router = createBrowserRouter ( [
    {
      path: '/',
      element:<Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/home',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <Register></Register>
        }
       
        
      ]
    }
  ])
  return (
    <div className="bg-white">
     
     <RouterProvider router={router}> </RouterProvider>
    </div>
  );
}

export default App;

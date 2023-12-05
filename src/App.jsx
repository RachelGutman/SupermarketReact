import { useEffect, useState } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import customersServices from './services/customers'
import Actions from './services/Actions'

import Customers from './Customers'
import Home from './Home'
import TopMenu from './TopMenu';
import DynamicTable from './DynamicTable';
import Product from './Product';
import { useDispatch } from 'react-redux';
import Customer from './Customer';

const router = createBrowserRouter([
  {
    element: <><TopMenu /><Outlet /></>, children: [
      { path: '/', element: <Home /> },
      {
        path: '/customers', children: [
          { path: '', element: <DynamicTable collectionName="customers" columns={['id', 'first_name', 'last_name', 'city']} /> },
          { path: ':id', element: <Customer /> },
        ]
      },
      {
        path: '/products', children: [
          { path: '', element: <DynamicTable collectionName="products" columns={['id', 'name', 'price', 'quentity']} /> },
          { path: ':id', element: <Product /> },
        ]
      },
      { path: '/purches', element: <DynamicTable collectionName="purches" columns={['id', 'customer_id', 'product_id', 'date']} /> },
    ]
  }]
  , { basename: import.meta.env.BASE_URL })

function App({ children }) {
  const [dataLoaded, setDataLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    loadCollection()
  }, [])

  async function loadCollection() {
    for (const collectionName of ['customers', 'products', 'purches']) {
      const list = await customersServices.getCollection(collectionName)
      dispatch({ type: Actions[`INIT_${collectionName.toUpperCase()}`], payload: list })
    }
    setDataLoaded(true)
  }

  return (
    <>
      <TopMenu />
      {children}
      {/* <RouterProvider router={router} /> */}
      {dataLoaded && 
   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customers' >
            <Route path='' element={<DynamicTable collectionName="customers" columns={['id', 'first_name', 'last_name', 'city']} />} />
            <Route path=':id' element={<Customer />} />
          </Route>
          <Route path='/products' >
            <Route path='' element={<DynamicTable collectionName="products" columns={['id', 'name', 'price', 'quentity']} />} />
            <Route path=':id' element={<Product />} />
          </Route>
          <Route path='/purches' element={<DynamicTable collectionName="purches" columns={['id', 'customer_id', 'product_id', 'date']} />} />
        </Routes>
       }
    </>
  )
}

export default App

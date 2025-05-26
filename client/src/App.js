
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { routes } from "./routers"
import DefaultComponent from "./components/DefaultComponent/DefaultComponent"
import { Fragment } from 'react/jsx-runtime'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          const Layout = route.isShowHeader ? DefaultComponent : Fragment
          return (
            <Route key={route.path} path={route.path} element={
              <Layout>
                <Page />
              </Layout>
            }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
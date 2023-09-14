import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header"
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from "./components/Footer"
import { lazy, Suspense } from 'react'
import Spinner from './components/Spinner'

const Store = lazy(()=>import('./pages/Store'));
const Success = lazy(()=>import('./pages/Success'));
const Cancel = lazy(()=>import('./pages/Cancel'));
const NotFound = lazy(()=>import('./pages/NotFound'));

function App() {
  return (
    <>
    <Container>
      <Router>
        <Header/> 
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route index element={<Store/>}/>
              <Route path="success" element={<Success/>}/>
              <Route path="cancel" element={<Cancel/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </Suspense>
        <Footer/>
      </Router>
    </Container>
    </>
  )
}

export default App


import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import PageNotFound from './pages/PageNotFound'

function App() {
 
  return (
    <>
      <Routes>
<Route path='/' element={<Landing/>}/>
<Route path='*' element={<PageNotFound/>}/>

      </Routes>
    </>
  )
}

export default App

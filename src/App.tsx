import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MainPage, StatsPage, RPGPage } from './pages'
import Modals from './components/Modals/Modals'
import Video from './components/video/Video'
import ProtectedRoute from './components/router/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        {/* <Route element={<ProtectedRoute isLogin1={false} level1={false} redirecteTo='/' />}> */}
          <Route path='/stats' element={<StatsPage />} />
          <Route path='/phase/:id' element={<RPGPage />} />
        {/* </Route> */}
        
        <Route path='/end' element={<Video />} />
      </Routes>
      <Modals />
    </>
  )
}

export default App

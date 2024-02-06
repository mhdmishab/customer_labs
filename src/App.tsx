
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SaveSegment from './pages/SaveSegment'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SaveSegment />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

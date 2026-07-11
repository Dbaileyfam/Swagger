import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Contact } from './pages/Contact'
import { Epk } from './pages/Epk'
import { Home } from './pages/Home'
import { Media } from './pages/Media'
import { Shows } from './pages/Shows'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shows" element={<Shows />} />
          <Route path="media" element={<Media />} />
          <Route path="epk" element={<Epk />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

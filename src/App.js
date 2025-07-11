import './App.css';
import '@fontsource/urbanist';
import 'react-quill/dist/quill.snow.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import NewPass from './pages/Newpass';
import Signup from './pages/Signup';
import Rightwidget from './components/Rightwidget';
import Layout from './components/HomePage';
import EditorHeader from './components/Editor-Header';
import PressArea from './components/PressArea';
import TextEditor from './components/Texteditor';
import BLogArea from './components/BlogArea';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Blogs from './pages/Blogs';
import TextChips from './shared/Custom-Chips';
import FormSidebox from './shared/Form-Sidebox'
import ResetPass from './pages/ResetPass';
import Teams from './pages/Teams';
import Draft from './pages/Drafts';
import OnBoard from './pages/OnBoard';
import PressReleases from './pages/Press-Release';
import Textfield from './shared/Custom-TextField';
import Design from './shared/design';
import Modal from './shared/Modal';
import Demo1 from './pages/demo1';
import Demo2 from './pages/demo2';
import { SignupProvider } from './shared/SignupContext';
import { UserProvider } from './shared/UserContext';
import AppArea from './components/AppArea';

function App() {
  return (
    // <SignupProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route path="/new-pass" element={<NewPass />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/onboard' element={<OnBoard />} />
            <Route path='/home' element={<Layout />} />
            <Route path="/press-releases" element={<PressReleases />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path='/teams' element={<Teams />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/drafts' element={<Draft />} />

            <Route path="/PressArea" element={<PressArea />} />
            <Route path='/form-sidebox' element={<FormSidebox />} />
            <Route path='/right-widget' element={<Rightwidget />} />
            <Route path='/header2' element={<EditorHeader />} />
            <Route path='/bLog-area' element={<BLogArea />} />
            <Route path='/text-editor' element={<TextEditor />} />
            <Route path='/chips' element={<TextChips />} />
            <Route path='/textfeild' element={<Textfield />} />
            <Route path='/design' element={<Design />} />
            <Route path='/modal' element={<Modal />} />
            <Route path='/demo1' element={<Demo1/>} />
            <Route path='/demo2' element={<Demo2/>} />
            <Route path='/app-area' element={<AppArea/>} /> 
          </Routes>
        </BrowserRouter>
      </UserProvider>
    // </SignupProvider>
  )
}

export default App;

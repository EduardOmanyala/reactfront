import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import BackgroundShapes from './components/BackgroundShapes';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Questions from './components/questions/Qlist';
import QuestionsBank from './components/questions/Questions';
import Random from './components/questions/Random';
import Services from './components/Services';
import Footer from './components/Footer';
import Quiz from './quiz/Quiz'
import QuizComponent from './quiz/QuizTwo'
import Front from './kcse/Front'
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CourseSelection from './components/CourseSelection';
import SubjectSelection from './components/SubjectSelection';

import Dash from './dash/Dash'
import Ebooks from './books/Ebooks';
import Detail from './books/Detail';
import Check from './books/Check';




function App() {

  const location = useLocation();
  const noLayoutRoutes = ["/login", "/course-selection", "/subject-selection"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);
  
  return (
    <AuthProvider>
      <div className="App">
        <BackgroundShapes />

        {/* Show header only if not in noLayoutRoutes */}
        {!hideLayout && <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions-bank" element={<QuestionsBank />} />
          <Route path="/random-questions" element={<Random />} />
          {/* <Route path="/services" element={<Services />} /> */}
          <Route path="/myquiz" element={<Quiz />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/quiz" element={<QuizComponent />} />
          <Route path="/kcse" element={<Front />} />
      
   
          <Route path="/course-selection" element={
            <ProtectedRoute>
              <CourseSelection />
            </ProtectedRoute>
          } />
          
          <Route path="/subject-selection" element={
            <ProtectedRoute>
              <SubjectSelection />
            </ProtectedRoute>
          } />
   
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dash />
            </ProtectedRoute>
          } />
          <Route path="/books" element={<Ebooks />} />
          {/* <Route path="/books/:slug" element={<Detail />} /> */}
          <Route path="/books/:id/:slug" element={<Detail />} />
           <Route path="/books/checkout/:id/" element={<Check />} />
      
        </Routes>

        {/* Show footer only if not in noLayoutRoutes */}
        {!hideLayout && <Footer />}
      </div>
    </AuthProvider>
    
  );
}

export default App;

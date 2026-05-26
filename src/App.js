import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import BackgroundShapes from './components/BackgroundShapes';
import Header from './components/Header';
import Home from './components/Home';
import Dash from './components/Dash';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import Questions from './components/questions/Qlist';
import QuestionsBank from './components/cpa/CpaTest';
import Random from './components/questions/Random';
// import Services from './components/Services';
import Footer from './components/Footer';
import Study from './components/Study';
import Quiz from './quiz/Quiz'
import QuizComponent from './quiz/QuizTwo'
import Front from './kcse/Front'
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
// import CourseSelection from './components/CourseSelection';
// import SubjectSelection from './components/SubjectSelection';


// import Dash from './dash/Dash'
import Ebooks from './books/Ebooks'; 
import MMFCalculator2 from './mmf/MMFCalculator2';
import SFCalculator from './mmf/SFCalculator';
import Markets from './mmf/Markets';
import Detail from './books/Detail';
import Download from './books/Download';
import Check from './books/Check';
import Complete from './books/Complete';
import Redirect from './books/Redirect';
import LandPrices from './books/LandPrices';



import PostDetail from './blog/PostDetail';
import PostList from './blog/PostList';





import CpaHome from './components/cpa/CpaHome';
import LevelUnits from './components/cpa/LevelUnits';
import GetAccess from './components/cpa/GetAccess';
import UnitDetail from './components/cpa/Units';
import CpaQuestions from './components/cpa/CpaTest';
import ResetRequest from './components/Resets/Request';
import Reset from './components/Resets/Reset';




function App() {

  // const location = useLocation();
  // const noLayoutRoutes = ["/login", "/register"];

  // const hideLayout = noLayoutRoutes.includes(location.pathname);
  // Routes where header should be hidden
  const location = useLocation();

    // Routes where HEADER should NOT appear
    const noHeaderRoutes = [
      "/login",
      "/register"
    ];

    // Routes where FOOTER SHOULD appear
    const footerRoutes = [
      "/",
      "/contact",
      "/about-us",
      "/privacy-policy",
      "/terms-of-service"

    ];

    // Header logic
    const hideHeader = noHeaderRoutes.includes(location.pathname);

    // Footer logic
    const showFooter = footerRoutes.includes(location.pathname);





  const withTitle = (title, element) => (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {element}
    </>
  );
  
  return (
    <AuthProvider>
      <div className="App">
        <BackgroundShapes />

        {/* Show header only if not in noLayoutRoutes */}
        {/* {!hideLayout && <Header />} */}
         {/* Header */}
        {!hideHeader && <Header />}

        <Routes>
          <Route path="/" element={withTitle('Home', <Home />)} /> {/* title: Home  */}
          <Route path="/login" element={withTitle('Login', <Login />)} /> {/* title: Login  */}
          <Route path="/register" element={withTitle('Register', <Register />)} /> {/* title: Register  */}
          <Route path="/questions" element={withTitle('Questions', <Questions />)} /> {/* title: Questions  */}
          <Route path="/questions-bank" element={withTitle('Question Bank', <QuestionsBank />)} /> {/* title: Question Bank  */}
          <Route path="/random-questions" element={withTitle('Random Questions', <Random />)} /> {/* title: Random Questions  */}
          <Route path="/about-us" element={withTitle('About Us',<About />)} /> 
          <Route path="/terms-of-service" element={withTitle('Terms of Service',<TermsOfService />)} /> 
          <Route path="/privacy-policy" element={withTitle('Privacy-Policy', <PrivacyPolicy />)} />
          <Route path="/myquiz" element={withTitle('Quiz', <Quiz />)} /> {/* title: Quiz  */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/quiz" element={withTitle('Quiz', <QuizComponent />)} /> {/* title: Quiz  */}
          <Route path="/kcse" element={withTitle('KCSE Past Papers with Answers', <Front />)} /> {/* title: KCSE Past Papers with Answers  */}
       
          <Route path="/cpa/home" element={withTitle('CPA Past Papers with Answers', <CpaHome />)} /> {/* title: CPA Past Papers with Answers  */}
          <Route path="/cpa/questions/:paperId" element={withTitle('CPA Questions with Answers', <CpaQuestions />)} />  {/* title: CPA Questions with Answers  */}
          <Route path="/level/:level" element={withTitle('CPA Level Units', <LevelUnits />)} /> {/* title: CPA Level Units  */}
          <Route path="/level/:level/:unitSlug" element={withTitle('CPA Level Units', <UnitDetail />)} /> {/* title: CPA Level Units  */}
          <Route path="/study" element={withTitle('Study', <Study />)} /> {/* title: Study  */}
          <Route path="/getaccess" element={withTitle('Study', <GetAccess />)} /> {/* title: Study  */}


           <Route path="/contact" element={withTitle('Contact', <Contact />)} /> 
           <Route
             path="/dashboard"
             element={
               <ProtectedRoute>
                 <Dash />
               </ProtectedRoute>
             }
           />

          <Route path="/password-reset" element={withTitle('Kenlib - Password Reset', <ResetRequest />)} /> {/* title: Home  */}
          <Route path="/password-reset/:uidb64/:token" element={withTitle('Kenlib - Create New Password', <Reset />)} /> {/* title: Home  */}
      
                   
          <Route path="/books" element={withTitle('Books', <Ebooks />)} />  {/* title: books  */}
          {/* <Route path="/books/:slug" element={<Detail />} /> */}
          <Route path="/books/:id/:slug" element={<Detail />} />  {/* title: book.title   */}
          <Route path="/books/payment-confirm/:id/:slug/" element={withTitle('Redirecting', <Redirect />)} />
           <Route path="/books/checkout/:id/" element={withTitle('Checkout', <Check />)} />  {/* title: checkout  */}
           <Route path="/books/download/:id/" element={withTitle('Download', <Download />)} /> {/* title: Download  */}
           <Route path="/books/purchase/complete/:id/" element={withTitle('Purchase Complete', <Complete />)} /> {/* title: Purchase Complete  */}
          <Route path="/land-prices-by-county-in-kenya" element={withTitle('Land Prices', <LandPrices />)} /> {/* title: Land Prices  */}
          <Route path="/finance/mmf/kenya" element={withTitle('MMF - Kenya', <MMFCalculator2 />)} /> {/* title: Finance  */}
          <Route path="/finance/" element={withTitle('Finance', <Markets />)} />
          <Route path="/finance/special/funds/" element={withTitle('Special Funds', <SFCalculator />)} />
       
          <Route path="/posts/:id/:slug" element={<PostDetail />} />
          <Route path="/posts/" element={withTitle('Blog', <PostList />)} />
      
        </Routes>

        {/* Show footer only if not in noLayoutRoutes */}
        {/* {!hideLayout && <Footer />} */}
         {/* Footer */}
      {showFooter && <Footer />}
       
      </div>
    </AuthProvider>
    
  );
}

export default App;

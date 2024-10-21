import React, { useState, lazy, Suspense } from 'react';
import './App.css'; // Import the CSS file
// import Loading from './Components/Loading'


// Lazy load the components 
//code splitting for better performance 
const Loading = lazy(() => import('./Components/Loading'));
const Home = lazy(() => import('./Components/Home'));
const About = lazy(() => import('./Components/About'));

function App() {
  // const [count, setCount] = useState(0);

  // function increaseCount() {
  //   setCount(count + 1);
  // }

  // function decreaseCount() {
  //   setCount(count - 1);
  // }

  // function reset() {
  //   setCount(0);
  // }

  const [activetab, setactivetab] = useState('Home');
  let content;

  if (activetab === 'Home') {
    content = <Home />;
  }
  if (activetab === 'About') {
    content = <About />;
  }

  return (
    <>
      <nav className="navbar">
        <ul>
          <li onClick={() => setactivetab('Home')}>Home</li>
          <li onClick={() => setactivetab('About')}>About</li>
        </ul>
      </nav>
      <ul>
          <li>Code splitting "dynamic import"</li>
          <li>Lazy Load , Suspense</li>
          <li>Progressive web app , Offline availability</li>
        </ul>
      <div className="content">
        
        <Suspense fallback={<Loading/>}>
          {content}
        </Suspense>
      </div>

      {/* <div>
        <h1>Count: {count}</h1>
        <button onClick={increaseCount}>Increase</button>
        <button onClick={decreaseCount}>Decrease</button>
        <button onClick={reset}>Reset</button>
      </div> */}
    </>
  );
}

export default App;

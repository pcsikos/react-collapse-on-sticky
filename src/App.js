import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import {useRef, useState, useEffect} from "react"
import Collapse from "react-bootstrap/Collapse";

function App() {
  const [isSticky, setIsSticky] = useState(false)
  const [isStatusHover, setIsStatusHover] = useState(false)
  const ref = useRef()

  useEffect(()=>{
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
            ([e]) => setIsSticky(e.intersectionRatio < 1),
            {
              threshold: [1],
            }
          );

    if (cachedRef){
      observer.observe(cachedRef);
    }
    
    // unmount
    return function(){
      if (cachedRef){
        observer.unobserve(cachedRef)
      }
    }
  }, [])

  const selectionMouseOver = (e ) => {
    setIsStatusHover(true);
  };

  const selectionMouseLeft = (e) => {
    setIsStatusHover(false);
  };

  console.log('isSticky', isSticky);

  return (
    <div className="App">
      <header>Header</header>
      
      <div className="filter-section" ref={ref}  onMouseEnter={selectionMouseOver} onMouseLeave={selectionMouseLeft}>
        <div className="status">Status</div>
        <Collapse in={!isSticky || isStatusHover}>
          <div className="filter">Filter</div>
        </Collapse>
      </div>
      <main>content</main>
    </div>
  );
}

export default App;

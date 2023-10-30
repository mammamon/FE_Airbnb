import { useRoutes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { router } from './router';
import 'assets/style.css';

function App() {
    const routing = useRoutes(router);
    const location = useLocation();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(true);
        const timeoutId = setTimeout(() => {
            setIsNavigating(false);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [location]);

    return (
        <div>
            {routing}
            {isNavigating && (
                <div className="overlay">
                    <div className="spinner" />
                </div>
            )}
        </div>
    );
}
export default App;


// import { useRoutes } from 'react-router-dom'
// import { router } from './router'
// import 'assets/style.css'
// import React, {useEffect} from React

// function App() {
//     return <div>{useRoutes(router)}</div>
// }

// export default App

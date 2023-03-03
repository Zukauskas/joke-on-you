import React, { useState, useEffect } from 'react';

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://v2.jokeapi.dev/joke/Programming?amount=10')
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {items.jokes.map((item) => {
                    if (item.type === 'single') {
                        return <li>{item.joke}</li>;
                    } else {
                        return (
                            <li>
                                {item.setup} {item.delivery}
                            </li>
                        );
                    }
                })}
            </ul>
        );
    }
}

export default App;

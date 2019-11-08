import React from 'react';
import './App.css';
import { Button } from './components/button';
import { DadJoke } from './components/dad-joke';
import { getFetchResource } from './lib/ajax';

const getJokeResource = () => getFetchResource('https://icanhazdadjoke.com/');

function App() {
  const [jokeResource, setJokeResource] = React.useState(() => getJokeResource());

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn React Suspense</h1>
        <Button onClick={() => setJokeResource(getJokeResource())}>Load Next Joke</Button>
      </header>
      <main>
        <React.Suspense fallback={<span>Loading...</span>}>
          <DadJoke jokeResource={jokeResource} />
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;

import React from 'react';

export const DadJoke = ({ jokeResource }) => {
  return (
    <div>
      <div>
        <p>{jokeResource.read().joke}</p>
      </div>
    </div>
  );
};

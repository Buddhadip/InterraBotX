// App.jsx
import React from 'react';
import InterraBotX from './Components/InterraBotX';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const App = () => {
  return (
    <div>
      <InterraBotX />
    </div>
  );
};

export default App;

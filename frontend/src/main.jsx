import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Suppress THREE.Clock deprecation warning from @react-three/fiber v8 internals.
// R3F v8 uses THREE.Clock, but Three.js 0.183+ deprecated it for THREE.Timer.
// R3F v9 fixes this natively but requires React 19. This is a safe cosmetic patch.
const _origWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
  _origWarn.apply(console, args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

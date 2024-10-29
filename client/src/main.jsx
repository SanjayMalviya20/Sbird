import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './actions/store/store.js'
import { PersistGate } from 'redux-persist/lib/integration/react.js'
import persistStore from 'redux-persist/es/persistStore'
let persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>,
  </StrictMode>,
)

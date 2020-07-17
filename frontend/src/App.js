import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastProvider } from 'react-toast-notifications'

import Routes from './routes'
import CustomToast from 'components/CustomToast'

import { store, history, persistor } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider
          placement="bottom-center"
          autoDismissTimeout={4000}
          autoDismiss={true}
          components={{ Toast: CustomToast }}
        >
          <Routes history={history} />
        </ToastProvider>
      </PersistGate>
    </Provider>
  )
}

export default App

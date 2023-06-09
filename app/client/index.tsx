import './styles/globals.scss';
import './styles/palette.scss';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import sharedStore from 'client/constants/sharedStore';
import { rootElement } from 'client/constants/dom';

import { SharedStoreContext } from 'common/utilities/SharedStore';

import App from 'client/components/App/App';

document.getElementById('storeValuesScript')?.remove();

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <SharedStoreContext.Provider value={sharedStore}>
        <App />
      </SharedStoreContext.Provider>
    </BrowserRouter>,
  );
}

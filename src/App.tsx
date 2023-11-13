import { Provider } from 'react-redux';

import './App.css';
import Content from './components/organisms/Content/Content';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <main>
        <Header />
        <Content />
        <Footer />
      </main>
    </Provider>
  );
}

export default App;

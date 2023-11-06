import { Provider } from 'react-redux';

import './App.css';
import Content from './components/organisms/content/Content';
import Footer from './components/organisms/footer/Footer';
import Header from './components/organisms/header/Header';
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

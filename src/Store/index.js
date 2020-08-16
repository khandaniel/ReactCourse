import { createStore } from 'redux';
import reducer from './Reducers';

const store = createStore(reducer);

export { store };

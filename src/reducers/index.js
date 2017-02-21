import { combineReducers } from 'redux';
import navigation from './navigation';
import test from './test';
import secondView from './secondView'
import carDetail from './carDetail'
import findCarView from './findCarView'
import freePriceView from './freePriceView'
import carLifeView from './carLifeView'

import specialCarView from './specialCarView'




const rootReducer = combineReducers({
  navigation: navigation,
  test:test,
  secondView:secondView,
  carDetail:carDetail,
  findCarView:findCarView,
  freePriceView:freePriceView,
  carLifeView:carLifeView,
  specialCarView:specialCarView
});

export default rootReducer;

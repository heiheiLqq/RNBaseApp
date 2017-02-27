import * as  MainTabsActions from './MainTabsAction';
import * as  LoginViewActions from './LoginViewActions';
import * as  CarServiceActions from './CarServiceActions';
import * as  SencondViewAction from './GouCheHuiAction';
import * as  CarDetailAction from './CarDetailAction';

import * as  FindCarAction from './FindCarAction';
import * as  FreePriceAction from './FreePriceAction';

import * as  CarLifeAction from './CarLifeAction';

import * as SpecialCarAction from './SpecialCarAction'
export default {
    ...MainTabsActions,
    ...LoginViewActions,
    ...CarServiceActions,
    ...SencondViewAction,
    ...CarDetailAction,
    ...FindCarAction,
    ...FreePriceAction,
    ...CarLifeAction,
    ...SpecialCarAction
};

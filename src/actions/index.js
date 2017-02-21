import * as  navigationActions from './navigation';
import * as  LoginViewActions from './LoginViewActions';
import * as  HomeviewActions from './HomeviewActions';
import * as  SencondViewAction from './SencondViewAction';
import * as  CarDetailAction from './CarDetailAction';

import * as  FindCarAction from './FindCarAction';
import * as  FreePriceAction from './FreePriceAction';

import * as  CarLifeAction from './CarLifeAction';

import * as SpecialCarAction from './SpecialCarAction'
export default {
    ...navigationActions,
    ...LoginViewActions,
    ...HomeviewActions,
    ...SencondViewAction,
    ...CarDetailAction,
    ...FindCarAction,
    ...FreePriceAction,
    ...CarLifeAction,
    ...SpecialCarAction
};

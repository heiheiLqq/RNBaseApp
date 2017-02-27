import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    StyleSheet,
    View
} from 'react-native';
import {
    Header,
    Main,
} from '../../components/login-view';
import Actions from '../../actions';

class LoginView extends Component {


  render() {
    const { navigator,actions } = this.props;
  
    return (
        <View style={styles.container}>

          <Main actions={actions} navigator={navigator}></Main>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

function mapStateToProps(state) {
  return {
    banner: state.banner
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);


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
} from '../components/home-view';
import Actions from '../actions';

class HomeView extends Component {
    constructor(props) {
    super(props)
   //console.log("1-------constructor")
  }

  componentDidMount() {
   //console.log('2------componentDidMount',this.props);
   //   console.log('2------componentDidMount');

      const { dispatch, item } = this.props;

      this.props.actions.fetchPosts({});

      //dispatch(fetchPosts({}));

  }

    componentWillReceiveProps(nextProps) {
       //console.log("3------componentWillReceiveProps");
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log("4-----shouldComponentUpdate");

         return true;
    }

  render() {
    const { actions, banner } = this.props;

    return (
      <View style={styles.container}>
        <Header banner={banner}></Header>
        <Main ></Main>
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
    //console.log("5----mapStateToProps");
  return {
    banner: state.banner,
      items:state.test.items,
     // postsBySubreddit:postsBySubreddit,

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
)(HomeView);


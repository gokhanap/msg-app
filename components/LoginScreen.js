import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { loginAsync, fetchUserAsync } from '../actions';
import { makeId } from '../utils';

class LoginScreen extends React.Component {
  state = {
    username: '',
    error: false,
    isLoading: true,
  };

  bootstrapAsync = () => {
    this.props.fetchUser()
    .then(data => data ? this.props.navigation.navigate('App') : this.setState({isLoading: false}));
  };

  handleLogin = async () => {
    const { username } = this.state;
    const isValid = username.trim().length > 1;

    if(isValid) {
      const user = { id: makeId(), name: username };

      return this.props.login(user).then(() => this.props.navigation.navigate('App'));
    }
    this.setState({error: true});
  };

  componentDidMount() {
    this.bootstrapAsync();
  };

  render() {
    const { error, username, isLoading } = this.state;

    if(isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Loading</Text>
        </View>
      );
    }

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('../assets/logo.jpg')} />
          <Text style={styles.title}>Leo Message App</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Type your name'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={username => this.setState({ username, error: false })}
          value={username}
          />
        {error ?
          <Text style={styles.error}>username should be at least 2 characters</Text>
          :
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text>Continue</Text>
          </TouchableOpacity>
        }
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 32,
    justifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    padding: 12,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    padding: 12,
    paddingBottom: 48,
    color: 'gold',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'whitesmoke',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    height: 48,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 12,
  },
});

const mapStateToProps = state => ({
    username: state.username
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(loginAsync(user)),
  fetchUser: () => dispatch(fetchUserAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

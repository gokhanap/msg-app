import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { loginAsync, fetchUserAsync } from '../actions';

class LoginScreen extends React.Component {
  state = {
    nickname: '',
    error: false,
  };

  bootstrapAsync = () => {
    this.props.fetchUser()
    .then(data => data && this.props.navigation.navigate('App'))
  };

  handleLogin = async () => {
    const { nickname } = this.state;
    const isValid = nickname.trim().length > 1;

    if(isValid) {
      return this.props.login(nickname).then(() => this.props.navigation.navigate('App'));
    }
    this.setState({error: true});
  };

  componentDidMount() {
    this.bootstrapAsync();
  };

  render() {
    const { error, nickname } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Type your name'
          autoCorrect={false}
          onChangeText={nickname => this.setState({ nickname, error: false })}
          value={nickname}
          />
        {error ?
          <Text style={styles.error}>Nickname should be at least 2 characters</Text>
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
    nickname: state.nickname
});

const mapDispatchToProps = dispatch => ({
  login: (nickname) => dispatch(loginAsync(nickname)),
  fetchUser: () => dispatch(fetchUserAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

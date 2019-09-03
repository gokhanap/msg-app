import React from 'react';
import { AsyncStorage, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default class LoginScreen extends React.Component {
  state = {
    nickname: '',
    error: false,
  };

  login = async () => {
    const isValid = this.state.nickname.trim().length > 1;

    if(isValid) {
      await AsyncStorage.setItem('nickname', this.state.nickname);
      return this.props.navigation.navigate('App');
    }
    this.setState({error: true});
  }

  bootstrapAsync = async () => {
    const nickname = await AsyncStorage.getItem('nickname');
    nickname && this.props.navigation.navigate('App');
  }

  componentDidMount() {
    this.bootstrapAsync();
  }

  render() {
    const { error } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Type your name'
          autoCorrect={false}
          onChangeText={nickname => this.setState({ nickname, error: false })}
          value={this.props.nickname}
        />
        {error ?
          <Text style={styles.error}>Nickname should be at least 2 characters</Text>
          :
          <TouchableOpacity style={styles.button} onPress={this.login}>
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

import React from 'react';
import { FlatList, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

import { fetchMessagesAsync, logoutAsync, addMessage } from '../actions';
import MessageRow from './MessageRow';

class MessagesScreen extends React.Component {
  state = {
    message: '',
  };

  handleLeave = () => {
    this.props.logout().then(() => this.props.navigation.navigate('Login'));
  };

  handleSend = async () => {
    const { message } = this.state;
    const { user, send } = this.props;
    send(message, user);
    this.setState({message: ''});
  };

  componentDidMount() {
    // TODO: uncomment next line and remove hardcoded data from initial store
    // this.props.fetchMessages();
  };

  render() {
    const { message } = this.state;
    const { messages, user: { name } } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <TouchableOpacity style={styles.leaveBtn} onPress={this.handleLeave}>
            <Text>Leave</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{name}</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <MessageRow data={item} />}
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Type your Message'
            autoCorrect={false}
            value={message}
            onChangeText={message => this.setState({message})}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={this.handleSend}
            disabled={!message.trim().length}
          >
            <Text>Send</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 20 + Constants.statusBarHeight,
    backgroundColor: 'salmon',
    alignItems: 'center',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    flexDirection: 'row',
    backgroundColor: 'darkslategray',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    height: 48,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    // borderColor: '#111111',
    // borderWidth: 1,
  },
  leaveBtn: {
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 12,
  },
  sendBtn: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 12,
    height: 48,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
    messages: state.messages,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessagesAsync()),
    send: (message, user) => dispatch(addMessage(message, user)),
    logout: () => dispatch(logoutAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);

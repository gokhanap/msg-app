import React from 'react';
import { AsyncStorage, FlatList, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';

import data from '../data';
import MessageRow from './MessageRow';

export default class MessagesScreen extends React.Component {
  state = {
    text: '',
  };

  leave = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  sendMessage = async () => {
    // this.props.navigation.navigate('Login');
  }

  render() {
    // console.log(data);
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <TouchableOpacity style={styles.leaveBtn} onPress={this.leave}>
            <Text>Leave</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Nickname</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <MessageRow data={item} />}
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Type your Message'
            autoCorrect={false}
            value={this.state.text}
            onChangeText={text => this.setState({text})}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={this.sendMessage}>
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

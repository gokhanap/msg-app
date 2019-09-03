import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class MessageRow extends React.Component {

  render() {
    const { data } = this.props;
    // console.log(this.props.data);

    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          {/* <Image style={styles.img} source={{uri: data.user.avatarUrl}} /> */}
          <Image style={styles.img} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{data.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    marginRight: 96,
  },
  imgContainer: {
  },
  img: {
    backgroundColor: 'blue',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  textContainer: {
    marginLeft: 8,
    padding: 12,
    backgroundColor: 'powderblue',
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  text: {
  },
});

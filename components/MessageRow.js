import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class MessageRow extends React.Component {

  render() {
    const { data, user: { id } } = this.props;
    const isAuthor = id === data.user.id;

    return (
      <View style={isAuthor ? styles.containerReverse : styles.container}>
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
  containerReverse: {
    flex: 1,
    flexDirection: 'row-reverse',
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
    marginHorizontal: 8,
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


const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(MessageRow);

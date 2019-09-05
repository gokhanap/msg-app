import React from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class MessageRow extends React.Component {
  state = {
    scale: new Animated.Value(100)
  };

  componentDidMount() {
    Animated.timing(this.state.scale, {
        toValue: 0,
        duration : 700,
        easing : Easing.elastic(1),
    }).start();
  }

  render() {
    const { data, user: { id } } = this.props;
    const isAuthor = id === data.user.id;

    return (
      <Animated.View
        style={{ transform: [
          {translateY: this.state.scale},
        ]}}
      >
        <View style={isAuthor ? styles.containerReverse : styles.container}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{uri: data.user.avatarUrl}} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{data.text}</Text>
            <Text style={styles.authorText}>{data.user.name}</Text>
          </View>
        </View>
      </Animated.View>
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
  img: {
    backgroundColor: 'indigo',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  textContainer: {
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: 'powderblue',
    borderRadius: 10,
    flex: 1,
  },
  text: {
  },
  authorText: {
    color: 'dimgrey',
    fontSize: 8,
    textTransform: 'uppercase',
    paddingTop: 4,
  },
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(MessageRow);

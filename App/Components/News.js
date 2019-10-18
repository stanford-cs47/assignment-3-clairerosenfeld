/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, TouchableOpacity } from 'react-native'
import { material } from 'react-native-typography' //consider using this!
import { Metrics, Colors } from '../Themes'


const Article = props => {
  const {title, summary, author, date, url} = props;
  return (
    <View style = {styles.article}>
      <TouchableOpacity onPress = {() => Linking.openURL(url)}>
          <Text style = {material.title} > {title} </Text>
          <Text style = {material.body1} > {summary}</Text>
          <Text style = {material.button} > {author} </Text>
          <Text style = {material.caption} > {date}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default class News extends Component {
  static defaultProps = { articles: [] }

  static propTypes = {
    articles: PropTypes.array
  }

  //you can change the props above to whatever you want/need.

  render () {
    const {articles} = this.props;

    return (
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Article
            title={item.title}
            summary={item.snippet}
            author={item.byline}
            date={item.date}
            url={item.url}
          />
        )}
        keyExtractor={item => item.url}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
  },

  article: {
    margin: 10,
  },
});

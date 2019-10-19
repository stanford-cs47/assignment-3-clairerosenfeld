/*
*
* Assignment 3
* Claire Rosenfeld
*
* CS47
* Oct, 2019
*/

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, Keyboard, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'
import { FontAwesome } from '@expo/vector-icons';

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  componentDidMount() {
    this.loadArticles();
  }

  searchForTerm = (newTerm) =>{
    this.setState({searchText: newTerm});
    this.loadArticles(newTerm, '');
  }

  renderLoadingIcon(){
    if(this.state.loading){
      return (
        <View style = {styles.loadingicon}>
          <ActivityIndicator color='red'
          />
        </View>
      );
    }
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    console.log(resultArticles.length);
    this.setState({loading: false, articles: resultArticles})
  }


  render() {
    const {articles, loading} = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style = {styles.container}>
          <Image style = {styles.nytlogo} 
            source = {require('./App/Images/nyt.png')} 
          />
          <Search 
            onChange = {this.searchForTerm}
          />
          {this.renderLoadingIcon()}
          <View style = {styles.news}>
            <News 
              articles = {articles}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 10,
  },

  nytlogo: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },

  searchbar: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#efefef',
    alignItems: 'center',
  },

  searchtext: {
   width: Dimensions.get('window').width * .8,
  },

  news: {
    flex: 6
  },

  loadingicon: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }

});

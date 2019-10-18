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
import { StyleSheet, View, Button, TextInput, TouchableOpacity, Dimensions, Keyboard } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Metrics, Colors } from '../Themes'


export default class Search extends Component {
	state = {
		text: '',
	};

	changeText = (searchValue) => {
		this.setState({text: searchValue});
	};

	reloadArticles = () => {
		this.props.onChange(this.state.text);
		this.setState({text: ' '});
		Keyboard.dismiss();
	};

	render () {
		return (
			<View style = {styles.searchbar} > 
				<TextInput 
					placeholder = 'Search for News'
					onChangeText = {this.changeText}
				//	onEndEditing = {Keyboard.dismiss()}
				/>

				<TouchableOpacity
					onPress = {text => this.reloadArticles(text)}>
					<FontAwesome
						name ='search'
						color = 'red'
						size = {25}
						alignSelf = 'center'
					/>
				</TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	searchbar: {
		flex: .5,
		flexDirection: 'row',
		paddingHorizontal: 20,
		borderRadius: 20,
		backgroundColor: '#efefef',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: Dimensions.get('window').width * .9,
	},

});

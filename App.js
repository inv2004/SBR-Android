import React, { Component } from 'react';
import { AppRegistry, ScrollView, Text, Image, View, Alert, 
  TouchableHighlight } from 'react-native';

import { StackNavigator, NavigationActions  } from 'react-navigation';  

class BookTitle extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>text {params.name}</Text>
      </View>
    );
  }
}

class BookOnShelf extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <TouchableHighlight onPress={() => this.props.rootNavigation.navigate('BookTitle', { name: this.props.name }) }
        underlayColor="white">
        <View>
          <Text>Book: {this.props.name}</Text>
          <Image source={pic} style={{width: 193, height: 110}}/>
        </View>
      </TouchableHighlight>
    );
  }
}

class BookCategory extends Component {
  render() {
    return (
    <View>
      <Text>Category: {this.props.name}</Text>
      <ScrollView horizontal={true}>
        <BookOnShelf name="test1" rootNavigation={this.props.rootNavigation} />
        <BookOnShelf name="test2" rootNavigation={this.props.rootNavigation} />
        <BookOnShelf name="test1" rootNavigation={this.props.rootNavigation} />
        <BookOnShelf name="test2" rootNavigation={this.props.rootNavigation} />
      </ScrollView>    
    </View>
    )
  }
}

class BookShelf extends Component {
  static navigationOptions = { title: 'BookShelf8', };

  render() {
    return (
      <ScrollView>
        <BookCategory name="cat1" rootNavigation={this.props.navigation} />
        <BookCategory name="cat2" rootNavigation={this.props.navigation} />
        <BookCategory name="cat3" rootNavigation={this.props.navigation} />
        <BookCategory name="cat4" rootNavigation={this.props.navigation} />
        <BookCategory name="cat5" rootNavigation={this.props.navigation} />
        <BookCategory name="cat6" rootNavigation={this.props.navigation} />
      </ScrollView>
    )
  }
}

export const App = StackNavigator({
  BookShelf: { screen: BookShelf },
  BookTitle: { screen: BookTitle },
});

export default App;


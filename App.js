import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  Text,
  Image,
  View,
  Alert,
  TouchableHighlight,
  WebView,
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation'; // 1.0.0-beta.13

class BookTitle extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.book.title,
  });

  render() {
    const { book } = this.props.navigation.state.params;
    return (
      <View>
        <Image source={{uri:mbox.uri+"/"+book.image}} style={{ width: 293, height: 160 }} />
        <Text>{book.intro}</Text>
      </View>
    );
  }
}

class BookOnShelf extends Component {
  render() {
    let pic = {
      uri: mbox.uri+"/"+this.props.book.image_small,
    };
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate('BookTitle', {
            book: this.props.book
          })}
        underlayColor="white">
        <View>
          <Text>{this.props.book.title.substring(0,20)}</Text>
          <Image source={pic} style={{ width: 193, height: 110 }} />
        </View>
      </TouchableHighlight>
    );
  }
}

class BookCategory extends Component {
  render() {
    console.debug("bookList.len: "+this.props.cat.length);
    let bookList = this.props.cat.map((x) =>
      <BookOnShelf {...this.props} key={x.id} name={x.title} book={x} />
    );
    return (
      <View>
        <Text style={{fontWeight: 'bold'}}>{this.props.name}</Text>
        <ScrollView horizontal={true}>
          {bookList}
        </ScrollView>
        <Text> </Text>
      </View>
    );
  }
}

class BookShelf extends Component {
  static navigationOptions = { title: 'BookShelf' };

  constructor(props) {
    super(props);
    this.state = {books: {}};
  }

  fetchData() {
    fetch(mbox.uri+"/"+mbox.api+"/?action=recommend&token="+mbox.token)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({books: responseJson.books});
      })
      .catch((error) => {
        console.error(error);
      });
  }
    
  componentDidMount() {
    this.fetchData();
  }
    
  render() {
    let catList = Object.keys(this.state.books).map((x) =>
      <BookCategory {...this.props} key={x} name={x} cat={this.state.books[x]} />
    );
    return (
      <ScrollView>
        {catList}
      </ScrollView>
    );
  }
}

export const App = StackNavigator({
  BookShelf: { screen: BookShelf },
  BookTitle: { screen: BookTitle },
});

const mbox = require('./mbox.json');

export default App;

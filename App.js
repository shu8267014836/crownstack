/*
    This component is used for community member support 
*/

import React from 'react';
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: [],
      indexItem: ''
    }
  }

  componentDidMount() {
    fetch('https://itunes.apple.com/search?term=Michael+jackson', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(response => Promise.all([response, response.json()])).then(([response, json]) => {
      if (response.status == 200) {
        this.setState({ loadingData: json.results })
      } else {
        this.setState({ loadingData: [] })
      }
    });
  }

  renderItem = (item) => {
    console.log(item)
    let itemData = item.item;
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ indexItem: item.index })}>
          <Image source={{ uri: itemData.artworkUrl100 }}
            style={{
              width: 260,
              height: 300,
              resizeMode: 'contain',
              margin: 8
            }}
          /></TouchableOpacity>
        {this.state.indexItem === item.index ?
          <View style={{ marginLeft: 8 }}>
            <Text>Artist Name: {this.state.loadingData && this.state.loadingData[this.state.indexItem] && this.state.loadingData[this.state.indexItem].artistName}</Text>
            <Text>Country : {this.state.loadingData && this.state.loadingData[this.state.indexItem] && this.state.loadingData[this.state.indexItem].country}</Text>
            <Text>Collection Name : {this.state.loadingData && this.state.loadingData[this.state.indexItem] && this.state.loadingData[this.state.indexItem].collectionName}</Text>
          </View>
          : null
        } 
      </View>
    )
  }


  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.loadingData}
          keyExtractor={(item) => item.id}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => this.renderItem(item)}
        />
      </SafeAreaView>

    );
  }
}


export default App;




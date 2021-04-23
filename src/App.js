/*
    This component is used for community member support 
*/

// class based component
import React from 'react';
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { API_URL } from './Constant.js';
import Style from './Styles.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: [],
      indexItem: ''
    }
  }

  // Life cycle method
  componentDidMount() {
    this.handleApiList();
  }

  // API CALLING
  handleApiList = () => {
    fetch(API_URL, {
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

  // flat list render item
  renderItem = (item) => {
    let itemData = item.item;
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ indexItem: item.index })}>
          <Image source={{ uri: itemData.artworkUrl100 }} style={Style.imageStyle} />
        </TouchableOpacity>
        {this.state.indexItem === item.index ?
          <View style={Style.marginLeft8}>
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
        <Text style={Style.headerStyle}>Song List</Text>
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




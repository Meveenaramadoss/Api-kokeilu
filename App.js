import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';

const App = () => {

  const [filterData, setFilterData] = useState([])
  const [masterData, setMasterData] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    fetchFoods();
    return () => {
     
    }
  }, [])

  const fetchFoods = () => {
    const apiURL = 'https://fineli.fi/fineli/api/v1/foods?q=omena';
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseJson) => {
        setFilterData(responseJson);
        setMasterData(responseJson);
      })
      .catch((error) => {
        console.error('A network error has occurred: ', error);
      });
  }

  const searchFilter = (text) => {
    if(text){
        const newData = masterData.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() 
                        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });
        setFilterData(newData);
        setSearch(text);
    } else{
        setFilterData(masterData)
        setSearch(text);
    }
}

  const ItemView = ({item}) => {  
    return (  
      <Text>
        {item.id}{'. '}{item.name.fi.toUpperCase()}
      </Text>  
    );  
  }

  const ItemSeperatorView = () => {
    return(
      <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}></View>
    )
  }

  return(
    <SafeAreaView style={{flex: 1}}>
      <View style = {StyleSheet.container}>
      <TextInput
  style={styles.textInputStyle}
  value={search}
  placeholder="search here"
  onChangeText={(text) => searchFilter(text)}
/>
      </View>
      <FlatList
      data ={filterData}
      keyExtractor={(item, index) => index.toString()}
      ItemSeperatorComponent={ItemSeperatorView}
      renderItem={ItemView}></FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }, 
  ItemStyle: {
    padding: 15
  },
  textInputStyle:{
    height: 40,
    borderWidth:1, 
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF'

  }
})


export default App;
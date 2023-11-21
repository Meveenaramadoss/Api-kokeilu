import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';

const App = () => {

  const [filterData, setFilterData] = useState([])
  const [masterData, setMasterData] = useState([])

  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState([])


  useEffect(() => {
    fetchFoods();
    return () => {

    }
  }, [])

  const fetchFoods = () => {
    const apiKey = 'dGxFQdpsi5C54xpi0VATwLach0DWvX8zWF85Cbd9'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiURL = `https://api.api-ninjas.com/v1/nutrition?query=${search}`;
    fetch(apiURL, {
      headers: {
        'X-Api-Key': apiKey
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson); // Add this line
        setFilterData(prevData => [...prevData, ...responseJson]);
        setMasterData(prevData => [...prevData, ...responseJson]);
      })
      .catch((error) => {
        console.error('A network error has occurred: ', error);
      });
  }


  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData)
      setSearch(text);
    }
  }

  const ItemView = ({ item }) => {
    return (
      <Text>
        {item.id}{'. '}{item.name && item.name.fi ? item.name.fi.toUpperCase() : ''}
      </Text>
    );
  }

  const ItemSeperatorView = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}></View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={StyleSheet.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="search here"
          onChangeText={(text) => searchFilter(text)}
        />
        <Button
        title="Search"
        onPress={fetchFoods}></Button>
      </View>
      <View>
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setSelectedItem(item)}>
            <View>
              <Text>{item.name}</Text> 
            </View>
            </TouchableOpacity>
          )}
        />
        {selectedItem && (
        <View>
        <Text>Name: {selectedItem.name}</Text>
        <Text>Calories: {selectedItem.calories}</Text>
        <Text>Serving Size: {selectedItem.serving_size_g}</Text>
        <Text>Fat Total: {selectedItem.fat_total_g}</Text>
        <Text>Fat Saturated: {selectedItem.fat_saturated_g}</Text>
        <Text>Protein: {selectedItem.protein_g}</Text>
        <Text>Sodium: {selectedItem.sodium_mg}</Text>
        <Text>Potassium: {selectedItem.potassium_mg}</Text>
        <Text>Cholesterol: {selectedItem.cholesterol_mg}</Text>
        <Text>Carbohydrate: {selectedItem.carbohydrate_g}</Text>
        <Text>Fiber: {selectedItem.fiber_g}</Text>
        <Text>Sugar: {selectedItem.sugar_g}</Text>
      </View>
        )}
      </View>
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
  textInputStyle: {
    marginTop: 30,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF'

  }
})


export default App;
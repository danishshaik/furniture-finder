import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useState } from 'react';
import FurnitureItem from '../components/FurnitureItem';
import searchClient from '../controller/SearchClient';

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [searching, setSearching] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  const [searchResult, setSearchResult] = useState<SearchResult | null>();

  // const [image, setImage] = useState(null);
  // const [boundingBoxes, setBoundingBoxes] = useState<
  // {
  //   objectClass: string;
  //   bounds: any;
  // }[] | null>(null);  
  
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
    }

  const search = async () => {
    if (camera) {
      setSearching(true);
      
      const image: CameraCapturedPicture = await camera.takePictureAsync();
      const searchResults = await searchClient.searchFromImage(image);

      if (searchResults.length != 0) {
        setSearchResult(searchResults[0]);
        setSearching(false);
      } else {
        setSearchResult({name: "Cesca Chair", designer: "Marcel Breuer", averagePrice: 250});
        setSearching(false);
      }
    }
  }

  const clear = () => {
    setSearchResult(null);
    setSearching(false);
  }

  const renderSearchButtonOrResult = () => {
    if (searching) {
      return <Text style={styles.text}>Searching...</Text>
    } else if (searchResult) {
      return <FurnitureItem {...searchResult} />
    } else {
      return (
        <TouchableOpacity onPress={search}>
          <View style={styles.searchButtonBackgroundBorder}>
            <View style={styles.searchButtonBackground}>
                <Image 
                    style={styles.searchImage}
                    source={require('../assets/search.png')} 
                    tintColor = 'gray'
                />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera}
        type={CameraType.back}
        ref={ref => setCamera(ref)} 
      >
        <View style={styles.contentContainer}>
            { searching || searchResult ? 
                <TouchableOpacity onPress={clear}>
                    <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity> : null
            }
            <View style={styles.buttonContainer}>
                {renderSearchButtonOrResult()}
            </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    marginVertical: 64,
    marginHorizontal: 36,
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchButtonBackground: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 15,
    borderColor: 'transparent',
    margin: 5,
  },
  searchButtonBackgroundBorder: {
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 100,
  },
  searchImage: {
    width: 25,
    height: 25,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

type Props = {
    name: string,
    designer: string,
    averagePrice: number,
    imageUrl?: string,
}

const FurnitureItem = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.productImageContainer}>
                <Image style={styles.productImage} source={{uri: 'https://placehold.co/125x125.jpg'}}/>
            </View>
            <View style={styles.productInfoBlock}>
                <View>
                    <Text style={[styles.text, styles.headerText]} numberOfLines={1}>{props.name}</Text>
                    <Text style={[styles.text, styles.subHeaderText]} numberOfLines={1}>by {props.designer}</Text>
                </View>
                {/* <Text style={[styles.text, styles.body]}>Average price: <Text style={{fontWeight: 'bold'}}>${props.averagePrice}</Text></Text> */}
                <TouchableOpacity style={styles.buyButton} onPress={() => {}}>
                <Image 
                    style={styles.cartImage}
                    source={require('../assets/cart.png')}
                />
                    <Text style={[styles.text, styles.buyText]}>Where to buy?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'gray',
        opacity: 0.8,
        borderRadius: 20,
        padding: 12,
        color: 'white',
    },
    productImageContainer: {
        flex: 4,
    },
    productImage: {
        height: 125,
        width: 125,
        borderRadius: 16,
    },
    productInfoBlock: {
        flex: 5,
        color: 'white',
        fontFamily: 'Helvetica Neue',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    text: {
        color: 'white',
        fontFamily: 'Helvetica Neue',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    body: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    buyButton: {
        backgroundColor: 'black',
        opacity: 0.5,
        color: 'white',
        borderRadius: 32,
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    cartImage: {
        height: 20,
        width: 20,
        borderRadius: 4,
        marginRight: 8,
        objectFit: 'contain',
    },
    buyText: {
        marginVertical: 4,
        fontSize: 12,
        fontWeight: '600',
        verticalAlign: 'middle',
    }
});

export default FurnitureItem;
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, Image} from 'react-native';

const Single = (file) => {
    const otherParam = file.route.params.otherParam;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imagebox}>
                <Image
                    style={styles.image}
                    source={{uri: otherParam.thumbnails?.w160 ?? 'https://placekitten.com/200/300'}}
                />
            </View>
            <View style={styles.textBox}>
                <Text style={{fontSize: 16}}>{otherParam.title}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    MainBox: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 5,
        backgroundColor: '#eee',
        borderRadius: 6,
        flex: 1,
    },
    imagebox: {
        flex: 1,
    },
    image: {
        flex: 1,
        borderRadius: 6,
    },
    textBox: {
        flex: 2,
        padding: 10,
    }
});

export default Single;
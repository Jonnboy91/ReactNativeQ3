import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const uploadUrl = "http://media.mw.metropolia.fi/wbma/uploads/"

const ListItem = (props) => {
    return (
        <TouchableOpacity style={styles.MainBox} onPress={
            () => {
                props.navigation.navigate('Single', {otherParam: props.singleMedia});
            }
        }>
            <View style={styles.imagebox}>
                <Image
                    style={styles.image}
                    source={{uri: uploadUrl + props.singleMedia.thumbnails?.w160 ?? 'https://placekitten.com/200/300'}}
                />
            </View>
            <View style={styles.textBox}>
                <Text style={{fontSize: 16, color: "white"}}>{props.singleMedia.title}</Text>
                <Text style={{fontSize: 12, color: "grey"}}>{props.singleMedia.description}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    MainBox: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 8,
        backgroundColor: '#291f52',
        borderRadius: 6,
        flex: 1,
    },
    imagebox: {
        flex: 1,
    },
    image: {
        flex: 1,
        borderRadius: 10,
    },
    textBox: {
        flex: 2,
        padding: 10,
    }
});

ListItem.propTypes = {
    singleMedia: PropTypes.object,
    navigation: PropTypes.object,
};

export default ListItem;

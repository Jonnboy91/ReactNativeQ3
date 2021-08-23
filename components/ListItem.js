import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ListItem = (props) => {
    return (
        <TouchableOpacity style={styles.MainBox}>
            <View style={styles.imagebox}>
                <Image
                    style={styles.image}
                    source={{uri: props.singleMedia.thumbnails.w160}}
                />
            </View>
            <View style={styles.textBox}>
                <Text style={{fontSize: 16}}>{props.singleMedia.title}</Text>
                <Text style={{fontSize: 12}}>{props.singleMedia.description}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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

ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;

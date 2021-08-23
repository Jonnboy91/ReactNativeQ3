import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity} from 'react-native';

const ListItem = (props) => {
    return (
        <TouchableOpacity style={{marginBottom: 8, backgroundColor: "grey"}}>
            <View style={{flexDirection: "row", margin: 12}}>
                <Image
                    style={{width: 200, height: 300}}
                    source={{uri: props.singleMedia.thumbnails?.w160 ?? "https://placekitten.com/200/300"}}
                />
                <View style={{paddingLeft: 8, paddingTop: 8, width: 150}}>
                    <Text style={{fontSize: 16}}>{props.singleMedia.title }</Text>
                    <Text style={{fontSize: 12}}>{props.singleMedia.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LandingScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity 
            onPress={()=>navigation.navigate('Main')}
            style={styles.btn}>
            <Text>Get Start</Text>
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
    btn:{
        width: 120,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'        
    }
});
  
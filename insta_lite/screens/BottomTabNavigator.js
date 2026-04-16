import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    PermissionsAndroid,
    Platform,
    Linking,
    StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera } from 'react-native-image-picker';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

function ReelsScreen() {
    return (
        <View style={styles.placeholder}>
            <Icon name="film-outline" size={48} color="#ccc" />
            <Text style={styles.placeholderText}>Reels coming soon</Text>
        </View>
    );
}

function DummyScreen() {
    return <View />;
}

// 🚀 UPDATED FUNCTION: Opens camera + captures photo
async function handleAddPhoto() {
    if (Platform.OS === 'android') {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission Required',
                message: 'App needs access to your camera',
                buttonPositive: 'Allow',
                buttonNegative: 'Deny',
            }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied');
            return;
        }
    }

    // 📷 OPEN CAMERA
    launchCamera(
        {
            mediaType: 'photo',
            cameraType: 'back',
            saveToPhotos: true,
        },
        (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else {
                const imageUri = response.assets?.[0]?.uri;
                console.log('Captured Image:', imageUri);

                Alert.alert('📸 Photo Captured!', 'Image saved successfully');
            }
        }
    );
}

function AddButton() {
    return (
        <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPhoto}
            activeOpacity={0.7}
        >
            <Icon name="add-outline" size={28} color="#000" />
        </TouchableOpacity>
    );
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? 'home' : 'home-outline'} size={26} color="#000" />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? 'search' : 'search-outline'} size={26} color="#000" />
                    ),
                }}
            />
            <Tab.Screen
                name="Add"
                component={DummyScreen}
                options={{ tabBarButton: () => <AddButton /> }}
            />
            <Tab.Screen
                name="Reels"
                component={ReelsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? 'play-circle' : 'play-circle-outline'} size={26} color="#000" />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? 'person' : 'person-outline'} size={26} color="#000" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
        height: 55,
        paddingBottom: 5,
    },
    addButton: {
        width: 44,
        height: 44,
        borderWidth: 1.5,
        borderColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    placeholderText: {
        marginTop: 10,
        fontSize: 15,
        color: '#aaa',
    },
});
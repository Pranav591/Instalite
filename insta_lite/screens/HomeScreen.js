import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    PermissionsAndroid,
    Platform,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {

    const stories = [
        { id: '1', name: 'you', image: require('../assets/profile.png') },
        { id: '2', name: 'john', image: require('../assets/profile.png') },
        { id: '3', name: 'emma', image: require('../assets/profile.png') },
        { id: '4', name: 'alex', image: require('../assets/profile.png') },
    ];

    const posts = [
        {
            id: '1',
            user: 'john_doe',
            caption: 'Beautiful sunset 🌅',
            profile: require('../assets/profile.png'),
            postImage: require('../assets/post1.jpg'),
        },
        {
            id: '2',
            user: 'emma_wat',
            caption: 'Vacation vibes 🌴',
            profile: require('../assets/profile.png'),
            postImage: require('../assets/post2.jpg'),
        },
    ];

    const [likedPosts, setLikedPosts] = useState({});

    const toggleLike = (id) => {
        setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // ─── Camera Permission Handler ─────────────────────────────────────────
    const handleAddPhoto = async () => {
        if (Platform.OS === 'android') {

            // Step 1: Check if permission is already granted
            const alreadyGranted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );

            if (alreadyGranted) {
                Alert.alert('✅ Camera Access Granted', 'You can now take photos to post!');
                return;
            }

            // Step 2: Request permission
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission Required',
                    message: 'Instagram needs access to your camera to add photos.',
                    buttonPositive: 'Allow',
                    buttonNegative: 'Deny',
                }
            );

            // Step 3: Handle all possible results
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('✅ Camera Access Granted', 'You can now take photos to post!');

            } else if (result === PermissionsAndroid.RESULTS.DENIED) {
                Alert.alert(
                    '⚠️ Camera Access Denied',
                    'You denied camera access. Please allow it to add photos.',
                    [{ text: 'OK' }]
                );

            } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                // User ticked "Don't ask again" — must go to Settings
                Alert.alert(
                    '⚠️ Camera Blocked',
                    'Camera permission is permanently blocked. Please enable it manually from Settings.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Settings',
                            onPress: () => Linking.openSettings().catch(() => {
                                Alert.alert('Unable to open Settings', 'Please open app settings manually.');
                            }),
                        }
                    ]
                );

            } else {
                Alert.alert(
                    '⚠️ Permission Error',
                    'Unable to get camera permission status. Please check your settings and try again.'
                );
            }

        } else {
            // iOS
            Alert.alert(
                '📷 Camera',
                'Make sure NSCameraUsageDescription is added in your Info.plist.'
            );
        }
    };
    // ──────────────────────────────────────────────────────────────────────────

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.logo}>Instagram</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={handleAddPhoto} style={styles.iconBtn}>
                        <Icon name="add-circle-outline" size={26} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Icon name="heart-outline" size={26} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Icon name="paper-plane-outline" size={26} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.storyContainer}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    >
                        {stories.map((story) => (
                            <TouchableOpacity key={story.id} style={styles.storyItem}>
                                <View style={styles.storyRing}>
                                    <Image source={story.image} style={styles.storyImage} />
                                </View>
                                <Text style={styles.storyText}>{story.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                }
                renderItem={({ item }) => (
                    <View style={styles.postCard}>

                        <View style={styles.postHeader}>
                            <Image source={item.profile} style={styles.profileImage} />
                            <Text style={styles.username}>{item.user}</Text>
                            <TouchableOpacity style={styles.moreBtn}>
                                <Icon name="ellipsis-horizontal" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity activeOpacity={1} onPress={() => toggleLike(item.id)}>
                            <Image
                                source={item.postImage}
                                style={styles.postImage}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>

                        <View style={styles.actions}>
                            <View style={styles.leftActions}>
                                <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.actionBtn}>
                                    <Icon
                                        name={likedPosts[item.id] ? 'heart' : 'heart-outline'}
                                        size={26}
                                        color={likedPosts[item.id] ? 'red' : '#000'}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Icon name="chatbubble-outline" size={24} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Icon name="paper-plane-outline" size={24} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Icon name="bookmark-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.caption}>
                            <Text style={styles.captionUser}>{item.user} </Text>
                            {item.caption}
                        </Text>

                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    logo: { fontSize: 26, fontWeight: 'bold', fontStyle: 'italic' },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    iconBtn: { marginLeft: 12 },
    storyContainer: {
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    storyItem: { alignItems: 'center', marginHorizontal: 8 },
    storyRing: {
        width: 68,
        height: 68,
        borderRadius: 34,
        padding: 2,
        borderWidth: 2.5,
        borderColor: '#e1306c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyImage: {
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 2,
        borderColor: '#fff',
    },
    storyText: { fontSize: 11, marginTop: 5, color: '#000' },
    postCard: { marginBottom: 10 },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    profileImage: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
    username: { flex: 1, fontWeight: 'bold', fontSize: 13 },
    moreBtn: { padding: 4 },
    postImage: { width: '100%', height: 370, backgroundColor: '#f0f0f0' },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    leftActions: { flexDirection: 'row', alignItems: 'center' },
    actionBtn: { marginRight: 14 },
    caption: { paddingHorizontal: 12, paddingBottom: 10, fontSize: 13, lineHeight: 18 },
    captionUser: { fontWeight: 'bold' },
});
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20');
                if (!response.ok) {
                    throw new Error('Unable to load API data');
                }
                const data = await response.json();
                setItems(data);
                setFilteredItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        const search = query.trim().toLowerCase();
        if (!search) {
            setFilteredItems(items);
            return;
        }
        const filtered = items.filter((item) =>
            item.title.toLowerCase().includes(search)
        );
        setFilteredItems(filtered);
    }, [query, items]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.thumbnailUrl }} style={styles.photo} />
            <View style={styles.cardText}>
                <Text style={styles.photoTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.photoId}>Photo ID: {item.id}</Text>
            </View>
        </View>
    );

    const renderEmpty = () => {
        if (loading) {
            return (
                <View style={styles.emptyState}>
                    <ActivityIndicator size="large" color="#0095f6" />
                    <Text style={styles.loadingText}>Loading API results...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.emptyState}>
                    <Icon name="alert-circle-outline" size={56} color="#f00" />
                    <Text style={styles.emptyTitle}>Network Error</Text>
                    <Text style={styles.emptySubtitle}>{error}</Text>
                </View>
            );
        }

        return (
            <View style={styles.emptyState}>
                <Icon name="search-outline" size={60} color="#ddd" />
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptySubtitle}>Try a different search term.</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <Icon name="search-outline" size={17} color="#999" style={{ marginRight: 7 }} />
                    <TextInput
                        placeholder="Search API results"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={query}
                        onChangeText={setQuery}
                        autoCapitalize="none"
                        editable={!loading && !error}
                    />
                </View>
            </View>

            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Latest photos from API</Text>
                <TouchableOpacity
                    onPress={() => {
                        setQuery('');
                        setFilteredItems(items);
                    }}
                >
                    <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={filteredItems.length === 0 && styles.flatListEmpty}
                ListEmptyComponent={renderEmpty}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    searchBarContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    input: { flex: 1, fontSize: 15, color: '#000' },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    headerTitle: { fontSize: 14, fontWeight: 'bold', color: '#000' },
    clearText: { color: '#0095f6', fontWeight: '600' },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#ddd',
        overflow: 'hidden',
        elevation: 1,
    },
    photo: {
        width: 90,
        height: 90,
    },
    cardText: {
        flex: 1,
        padding: 10,
    },
    photoTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#222',
    },
    photoId: {
        marginTop: 6,
        color: '#666',
        fontSize: 12,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        paddingHorizontal: 30,
    },
    emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12, color: '#000', textAlign: 'center' },
    emptySubtitle: { fontSize: 14, color: '#999', marginTop: 8, textAlign: 'center' },
    loadingText: { marginTop: 12, color: '#555', fontSize: 14 },
    flatListEmpty: { flexGrow: 1 },
});
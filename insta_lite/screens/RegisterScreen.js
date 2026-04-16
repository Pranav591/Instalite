import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }) {
    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Text style={styles.logo}>Instagram</Text>

                <Text style={styles.subtitle}>
                    Sign up to see photos and videos from your friends.
                </Text>

                <TextInput
                    placeholder="Mobile number or email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />

                <TextInput
                    placeholder="Full name"
                    style={styles.input}
                    value={fullname}
                    onChangeText={setFullname}
                    placeholderTextColor="#999"
                />

                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />

                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#999"
                />

                {/* DOB */}
                <Text style={styles.label}>Birthday</Text>
                <View style={styles.dobContainer}>
                    <Picker
                        style={styles.pickerBox}
                        selectedValue={month}
                        onValueChange={setMonth}
                    >
                        <Picker.Item label="Month" value="" />
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <Picker.Item key={m} label={m} value={m} />
                        ))}
                    </Picker>

                    <Picker
                        style={styles.pickerBox}
                        selectedValue={day}
                        onValueChange={setDay}
                    >
                        <Picker.Item label="Day" value="" />
                        {Array.from({ length: 31 }, (_, i) => (
                            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                        ))}
                    </Picker>

                    <Picker
                        style={styles.pickerBox}
                        selectedValue={year}
                        onValueChange={setYear}
                    >
                        <Picker.Item label="Year" value="" />
                        {Array.from({ length: 35 }, (_, i) => {
                            const y = 2024 - i;
                            return <Picker.Item key={y} label={`${y}`} value={`${y}`} />;
                        })}
                    </Picker>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Log in.</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, paddingHorizontal: 30, backgroundColor: '#fff' },
    logo: {
        fontSize: 42,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 15,
    },
    subtitle: {
        textAlign: 'center',
        color: '#999',
        fontSize: 14,
        marginBottom: 25,
        lineHeight: 20,
    },
    label: { fontSize: 13, fontWeight: 'bold', marginBottom: 5, color: '#555' },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fafafa',
        padding: 13,
        borderRadius: 8,
        marginBottom: 12,
        fontSize: 14,
        color: '#000',
    },
    button: {
        backgroundColor: '#0095f6',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 25,
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
    dobContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    pickerBox: { flex: 1, marginHorizontal: 2 },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 0.8,
        borderColor: '#ddd',
        paddingTop: 18,
    },
    loginText: { color: '#999', fontSize: 13 },
    loginLink: { color: '#000', fontWeight: 'bold', fontSize: 13 },
});
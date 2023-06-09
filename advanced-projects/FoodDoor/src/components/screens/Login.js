import { Image, SafeAreaView, StatusBar, 
    StyleSheet, Text, TextInput, TouchableOpacity, View 
} from 'react-native'
import React, { useState } from 'react'

// icons
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

// Lottie 
import Lottie from 'lottie-react-native'

// constants
import { Colors, Fonts, Images } from '../../contants'

// includes
import { Separator, ToggleButton } from '../includes'

// utils
import { Display } from '../../utils'

// services
import { AuthService } from '../../services'


export default function Login({ navigation }) {
    const [isPasswordShow, setIsPasswordShow] = useState(true)

    const [username, setUsernaem] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    // login form subbmition
    const login = async () => {
        const user = {
            username, password
        }

        setIsLoading(true)
        AuthService.loginUser(user)
            .then(
                (response)=> {
                    setIsLoading(false)
                    console.log(response)
                    if(!response?.status){
                        setErrorMessage(response?.message)
                    }
                }
            )
    }

    return (
        <View style={styles.container}>
            {/* Top section start */}
            <StatusBar 
                barStyle='dark-content' 
                backgroundColor={Colors.DEFAULT_WHITE} 
                translucent 
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                paddingHorizontal: 20,
            }}>
                <Ionic 
                    name="chevron-back-outline" 
                    size={30} 
                    color={Colors.DEFAULT_BLACK} 
                />
                <Text style={[styles.text, {
                    fontSize: 20,
                    fontFamily: Fonts.UBUNTU_BOLD,
                    lineHeight: 20 * 1.4,
                    textAlign: 'center',
                    width: Display.setWidth(80),
                }]}>Login</Text>
            </View>
            {/* Top section end */}

            <Text style={{
                fontSize: 20,
                fontFamily: Fonts.UBUNTU_MEDIUM,
                lineHeight: 20 * 1.4,
                marginTop: 50,
                marginBottom: 10,
                marginHorizontal: 20,
                color: Colors.DEFAULT_BLACK
            }}>Welcome</Text>
            <Text style={{
                fontSize: 20,
                fontFamily: Fonts.UBUNTU_REGULAR,
                color: Colors.DEFAULT_BLACK,
                lineHeight: 20 * 1.4,
                marginTop: 10,
                marginBottom: 20,
                marginHorizontal: 20,
            }}>Enter your username and password, and enjoy ordering food</Text>

            {/* Input section start */}
            <View style={{
                backgroundColor: Colors.LIGHT_GREY,
                marginHorizontal: 20,
                paddingHorizontal: 10,
                borderRadius: 8,
                borderWidth: .8,
                borderColor: Colors.LIGHT_GREY2,
                justifyContent: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Feather name='user' size={22} color={Colors.DEFAULT_GREY} style={{marginRight: 10}} />
                    <TextInput 
                        placeholder='Username' 
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={{
                            fontSize: 18,
                            textAlignVertical: 'center',
                            padding: 0,
                            height: Display.setHeight(6),
                            color: Colors.DEFAULT_BLACK,
                            flex: 1,
                        }}
                        onChangeText={(text) => setUsernaem(text)}
                     />
                </View>
            </View>{/* input username */}

            <Separator height={16} />

            <View style={{
                backgroundColor: Colors.LIGHT_GREY,
                marginHorizontal: 20,
                paddingHorizontal: 10,
                borderRadius: 8,
                borderWidth: .8,
                borderColor: Colors.LIGHT_GREY2,
                justifyContent: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Feather name='lock' size={22} color={Colors.DEFAULT_GREY} style={{marginRight: 10}} />
                    <TextInput
                        secureTextEntry={isPasswordShow}
                        placeholder='Password' 
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={{
                            fontSize: 18,
                            textAlignVertical: 'center',
                            padding: 0,
                            height: Display.setHeight(6),
                            color: Colors.DEFAULT_BLACK,
                            flex: 1,
                        }}
                        onChangeText={(text) => setPassword(text)}
                     />
                    <Feather 
                        name={!isPasswordShow ? 'eye' : 'eye-off'}
                        size={22} 
                        style={{marginRight:10}}
                        color={Colors.DEFAULT_GREY}
                        onPress={()=> setIsPasswordShow(!isPasswordShow)}
                    />
                </View>
            </View>
            {/* Input section end */}

            { // error message
                errorMessage && <Text style={{
                    fontSize: 10,
                    lineHeight: 10 * 1.4,
                    color: Colors.DEFAULT_RED,
                    fontFamily: Fonts.UBUNTU_MEDIUM,
                    marginHorizontal: 20,
                    marginTop: 3,
                    marginBottom: 10,
                }}>{errorMessage}</Text>
            }

            <View style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <ToggleButton size={.5} />
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 12,
                        lineHeight: 12 * 1.4,
                        color: Colors.DEFAULT_GREY,
                        fontFamily: Fonts.UBUNTU_MEDIUM,
                    }}>Remember me</Text>
                </View>
                <Text 
                    style={{
                        fontSize: 12,
                        fontFamily: Fonts.UBUNTU_BOLD,
                        color: Colors.DEFAULT_GREEN,
                        lineHeight: 12 * 1.4,
                    }}
                    onPress={()=> navigation.navigate('ForgotPassword')}
                >Forgot password</Text>
            </View>

            {/* sigin button */}
            <TouchableOpacity activeOpacity={0.8} 
                style={{
                    backgroundColor: Colors.DEFAULT_GREEN,
                    marginHorizontal: 20,
                    borderRadius: 8,
                    height: Display.setHeight(6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}
                onPress={login}
            >
                {
                    isLoading ? (
                        <Lottie
                            source={Images.LOADING}
                            autoPlay
                        />
                    ): (
                        <Text style={{
                            fontSize: 18,
                            fontFamily: Fonts.UBUNTU_MEDIUM,
                            color: Colors.DEFAULT_WHITE,
                            lineHeight: 18 * 1.4,
                        }}>Sign In</Text>
                    )
                }
            </TouchableOpacity>

            <View style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
            }}>
                <Text style={{
                    fontSize: 13,
                    fontFamily: Fonts.UBUNTU_MEDIUM,
                    color: Colors.DEFAULT_BLACK,
                    lineHeight: 13 * 1.4,
                }}>Don't have an account?</Text>
                <Text onPress={() => navigation.navigate('Signup')} style={{
                    fontSize: 13,
                    fontFamily: Fonts.UBUNTU_MEDIUM,
                    color: Colors.DEFAULT_GREEN,
                    lineHeight: 13 * 1.4,
                    marginLeft: 5,
                }}>Sign Up</Text>
            </View>

            <Text style={{
                fontSize: 15,
                fontFamily: Fonts.UBUNTU_MEDIUM,
                color: Colors.DEFAULT_BLACK,
                lineHeight: 15 * 1.4,
                alignSelf: 'center',
            }}>OR</Text>

            <TouchableOpacity activeOpacity={0.8} style={{
                backgroundColor: Colors.FABEBOOK_BLUE,
                paddingVertical: 15,
                marginHorizontal: 20,
                height: Display.setHeight(6),
                borderRadius: 8,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                    <View style={{
                        backgroundColor: Colors.DEFAULT_WHITE,
                        borderRadius: 3,
                        padding: 2,
                        position: 'absolute',
                        left: 25,
                    }}>
                        <Image source={Images.FACEBOOK} style={{
                            width: 18,
                            height: 18,
                        }} />
                    </View>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: Fonts.UBUNTU_MEDIUM,
                        color: Colors.DEFAULT_WHITE,
                        lineHeight: 13 * 1.4,
                    }}>Connect with Facebook</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.8} style={{
                backgroundColor: Colors.GOOGLE_BLUE,
                paddingVertical: 15,
                marginHorizontal: 20,
                height: Display.setHeight(6),
                borderRadius: 8,
                marginVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                    <View style={{
                        backgroundColor: Colors.DEFAULT_WHITE,
                        borderRadius: 3,
                        padding: 2,
                        position: 'absolute',
                        left: 25,
                    }}>
                        <Image source={Images.GOOGLE} style={{
                            width: 18,
                            height: 18,
                        }} />
                    </View>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: Fonts.UBUNTU_MEDIUM,
                        color: Colors.DEFAULT_WHITE,
                        lineHeight: 13 * 1.4,
                    }}>Connect with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    text: {
        color: Colors.DEFAULT_BLACK,
    }
})
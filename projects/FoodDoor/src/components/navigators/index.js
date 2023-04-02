import React from "react"

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screens
import { Login, Splash, Welcome } from "../screens"

const Stack = createNativeStackNavigator()

const Navigators = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators
import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";

import axios from "axios";

import { ENDPOINT_MS_USER } from 'react-native-dotenv';

import { TextInput, View, Text } from 'react-native';

//formik
import { Formik } from "formik";

// Icons 
import {Octicons, Ionicons, AntDesign} from "@expo/vector-icons";

import giraStyles from "./../components/style";

const {styleInput, styleIcon, styleContainer, styleIconContainer, styleLabel} = giraStyles


import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RigthIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent

} from './../components/style';

// Colors

const {brand, primary, secondary, terceary,  darkLight} = Colors; 

// Keyboards

import KeyboardWrapper from "../components/keyboardWrapper";



const Login = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
     
    const loginRequest = async (emal: string, password: string) => {
        setError(false);

        try{
            const response = await axios.post('${ENDPOINT_MS_USER}/login',{
                email,
                password,
            });

        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
    };

    return(
        <KeyboardWrapper>
            <StyledContainer>
                <StatusBar style="dark"/> 
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Acoount Login</SubTitle>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate('Welcome');
                        }}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    {/* <MyTextInput
                                        label="Email Address"
                                        icon="mail"
                                        placeholder="mail@site.com"
                                        placeholderTextColor={primary}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    /> */}
                                     
                                     {/* Mail */}
                                    <Text style={styleLabel}>Ingrese mail</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={secondary}/>

                                    <TextInput
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.email}
                                        placeholder="mail@site.com"
                                        onChangeText={(text: string) => setPassword(text)}
                                        onBlur={handleBlur('email')}
                                        keyboardType="email-address"
                                        />
                                    </View>
                                    
                                    {/* <MyTextInput
                                        label="Password"
                                        icon="lock"
                                        placeholder="********"
                                        placeholderTextColor={primary}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePasswword}
                                    /> */}

                                    {/* Contrasena */}
                                    
                                    <Text style={styleLabel}>Ingrese contraseña</Text>
                                    <View style={styleContainer}>
                                        <View style={styleIconContainer}>
                                            <Octicons style={styleIcon} name={'lock'} size={30} color={secondary}/>
                                        </View>

                                    <TextInput
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.password}
                                        placeholder="Password"
                                        secureTextEntry
                                        onChangeText={(text: string) => setEmail(text)}
                                        onBlur={handleBlur('password')}
                                        />
                                    </View>


                                    <MsgBox>...</MsgBox>
                                    <StyledButton onPress={() => handleSubmit}>
                                        <ButtonText onPress={() => loginRequest(email,password)}>
                                            Login
                                        </ButtonText>
                                    </StyledButton>
                                    <Line />
<<<<<<< Updated upstream
=======
                                    <StyledButton github= {true} onPress={() => handleSubmit}>
                                        <AntDesign name="github" color={primary} size={30}/> 
                                        <ButtonText github={true}>
                                            Sign in with GitHub
                                        </ButtonText>
                                    </StyledButton>
>>>>>>> Stashed changes
                                    <ExtraView>
                                        <ExtraText>
                                            Don't Have an account already?. 
                                        </ExtraText>
                                        <TextLink onPress={() =>  navigation.navigate('SignUp')}>
                                            <TextLinkContent>
                                                SignUp
                                            </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword,...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={primary}/>
            </LeftIcon> 
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RigthIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' :  'md-eye'} size={30} color={primary}/> 
                </RigthIcon>
            )}
        </View>
    )
}

export default Login;
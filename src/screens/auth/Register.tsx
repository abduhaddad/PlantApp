import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { myColors, myFonts } from '../../utils'
import Input from '../../components/inputs/Input'
import Button from '../../components/buttons/Button'
import { msgInfo } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../services/auth'
import { AppDispatch, RootState } from '../../redux/store'
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native'

export default function Register() {

  const nav = useNavigation()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { loading, token, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (token) nav.dispatch(StackActions.replace('TabMenu'))
  }, [token])

  function onRegister() {
    if (!username || !pass || !email) {
      msgInfo('Please fill in all the required data.')
      return
    }

    dispatch(register({ email, username, password: pass }))
  }

  function onEmail(text: string) {
    setEmail(text)
  }

  function onUsername(text: string) {
    setUsername(text)
  }

  function onPass(text: string) {
    setPass(text)
  }

  function onLogin() {
    nav.dispatch(CommonActions.goBack())
  }

  return (
    <View style={asdasd.container}>
      <View style={asdasd.content}>
        <Image style={asdasd.img} source={require('../../assets/images/auth.gif')} />
        <Text style={asdasd.title}>Welcome to PlantApp!</Text>
        <Input placeholder={'Email'} keyboardType='email-address' value={email} onChangeText={onEmail} />
        <Input placeholder={'Username'} value={username} onChangeText={onUsername} />
        <Input placeholder={'Password'} value={pass} onChangeText={onPass} isPassword={true} />
        <TouchableOpacity onPress={onLogin} style={asdasd.containerTxtInfo}>
          <Text style={asdasd.txtInfo}>Sudah punya akun?
            <Text style={asdasd.txtBtnSignUp}> Login di sini.</Text>
          </Text>
        </TouchableOpacity>
        <Button title={'Register'} onPress={onRegister} loading={loading}
          disabled={loading} />
      </View>
    </View>
  )
}

const asdasd = StyleSheet.create({
  containerTxtInfo: {
    marginTop: 12,
    marginBottom: 32,
  },
  txtInfo: {
    textAlign: 'center',
    fontFamily: myFonts.dmsans,
    color: myColors.darkGray,
  },
  txtBtnSignUp: {
    color: myColors.primary,
    fontFamily: myFonts.dmsans,
  },
  title: {
    fontFamily: myFonts.dmsansBold,
    fontSize: 18,
    color: myColors.black,
    textAlign: 'center',
    marginBottom: 16
  },
  content: {
    marginHorizontal: 24,
  },
  img: {
    width: 250,
    height: 250,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: myColors.white,
    justifyContent: 'center',
  }
})
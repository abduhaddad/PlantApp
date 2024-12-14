import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { myColors, myFonts } from '../../utils'
import Input from '../../components/inputs/Input'
import Button from '../../components/buttons/Button'
import { msgInfo } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/auth'
import { AppDispatch, RootState } from '../../redux/store'
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native'

export default function Login() {

  const nav = useNavigation()

  const [identifier, setIdentifier] = useState('')
  const [pass, setPass] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { loading, token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (token) nav.dispatch(StackActions.replace('TabMenu'))
  }, [token])

  function onLogin() {
    if (!identifier || !pass) {
      msgInfo('Please fill in all the required data.')
      return
    }

    dispatch(login({ identifier: identifier, password: pass }))
  }

  function onIdentifier(text: string) {
    setIdentifier(text)
  }

  function onPass(text: string) {
    setPass(text)
  }

  function onRegister() {
    nav.dispatch(CommonActions.navigate('Register'))
  }

  return (
    <View style={asdasd.container}>
      <View style={asdasd.content}>
        <Image style={asdasd.img} source={require('../../assets/images/auth.gif')} />
        <Text style={asdasd.title}>Welcome to PlantApp!</Text>
        <Input placeholder={'Email'} keyboardType='email-address' value={identifier} onChangeText={onIdentifier} />
        <Input placeholder={'Password'} value={pass} onChangeText={onPass} isPassword={true} />
        <TouchableOpacity onPress={onRegister} style={asdasd.containerTxtInfo}>
          <Text style={asdasd.txtInfo}>Masih belum punya akun?
            <Text style={asdasd.txtBtnSignUp}> Daftar di sini.</Text>
          </Text>
        </TouchableOpacity>
        <Button title={'Login'} onPress={onLogin} loading={loading}
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
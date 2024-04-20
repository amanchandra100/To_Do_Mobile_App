import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'

const SocialSignInButton = () => {

    
  const onSignInGoogle = () => {
    console.warn("onSignInGoogle");
  };

  const onSignInFacebook = () => {
    console.warn("onSignInFacebook");
  };

  const onSignInApple = () => {
    console.warn("onSignInApple");
  };

  return (
   <>
      <CustomButton
        text="Sign In With Google"
        onPress={onSignInGoogle}
        type="TERTIARY"
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In With Facebook"
        onPress={onSignInFacebook}
        type="TERTIARY"
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        text="Sign In With Apple"
        onPress={onSignInApple}
        type="TERTIARY"
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
   </>
  )
}

export default SocialSignInButton
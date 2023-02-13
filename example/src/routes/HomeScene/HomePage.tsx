import React from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import useHomePageHooks from './useHomePageHooks'

const HomePage = () => {
  const { toSimplestScene, toDefinedSizeScene } = useHomePageHooks()

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView>
        <TouchableOpacity style={styles.btn} onPress={toSimplestScene}>
          <Text style={styles.text}>Simplest example</Text>
          <Text style={styles.description}>Full page grid view with minimun setting.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={toDefinedSizeScene}>
          <Text style={styles.text}>Defined size example</Text>
          <Text style={styles.description}>Defined size grid view.</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

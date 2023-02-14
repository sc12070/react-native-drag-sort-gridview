import React from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import useHomePageHooks from './useHomePageHooks'

const HomePage = () => {
  const {
    toSimplestScene,
    toUsageScene,
    toDefinedSizeScene,
    toFixedItemWidthScene,
    toDynamicItemWidthScene
  } = useHomePageHooks()

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView>
        <TouchableOpacity style={styles.btn} onPress={toSimplestScene}>
          <Text style={styles.text}>Simplest example</Text>
          <Text style={styles.description}>Full page grid view with minimun setting.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={toUsageScene}>
          <Text style={styles.text}>Usage example</Text>
          <Text style={styles.description}>
            Press to select item when isEditing is false. Long press item to enable editing.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={toDefinedSizeScene}>
          <Text style={styles.text}>Defined list size example</Text>
          <Text style={styles.description}>Defined size of list.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={toFixedItemWidthScene}>
          <Text style={styles.text}>Fixed item width example</Text>
          <Text style={styles.description}>Gird view with fixed item width (65).</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={toDynamicItemWidthScene}>
          <Text style={styles.text}>Dynamic item width example</Text>
          <Text style={styles.description}>Gird view with dynamic item width.</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

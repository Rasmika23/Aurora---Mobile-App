import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
  return (
    <View className='flex item-center my-5'>
        <Image source={images.noResult} className='w-11/12 h-80' resizeMode='contain' />
        <Text className='text-black-300 font-rubik-bold text-2xl mt-5'>No Results Found</Text>
        <Text className='text-black-100 text-base mt-2'>We couldn't find any results matching your search.</Text>
    </View>
  )
}

export default NoResults
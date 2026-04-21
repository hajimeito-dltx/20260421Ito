const { createApp, ref, onMounted, computed } = Vue
const { createVuetify } = Vuetify
const vuetify = createVuetify()

createApp({
  setup () {
    
      const areaData = ref([])
      const selectedRegion = ref(null)
      const areaTime = ref([])
      
    onMounted(async () => {
      const res = await axios.get(
        'https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json'
      )
      areaData.value = res.data[0].timeSeries[0].areas
      areaTime.value = res.data[0].timeSeries[0].timeDefines
      
 //      console.log(areaData.value);
 //      console.log(selectedRegion.value);
         
    })
      console.log(areaTime.value);
//      const areatimeResult = slice.areaTime[0](0,5);
    
    const weatherIcon = computed(() =>{
      const weatherCodeH = selectedRegion.value.weatherCodes[0]
      console.log(weatherCodeH)
      const weatherCodeA = Math.floor(weatherCodeH / 100)
      if ( weatherCodeA === 1 ){
        return "mdi-weather-sunny"
      } else if (weatherCodeA === 2){
        return "mdi-weather-cloudy"
      } else if (weatherCodeA === 3){
        return "mdi-weather-rainy"
      } else if (weatherCodeA === 4){
        return "mdi-weather-snowing"
      } else{
        "error"
      }
})
    const weatherColor = computed(() =>{
      const weatherCodeH = selectedRegion.value.weatherCodes[0]
      const weatherCodeA = Math.floor(weatherCodeH / 100)
      if ( weatherCodeA === 1 ){
        return 'red'
      } else if (weatherCodeA === 2){
        return 'grey'
      } else if (weatherCodeA === 3){
        return "blue"
      } else if (weatherCodeA === 4){
        return "white"
      } else{
        "error"
      }
})
    
    const weatherBG = computed(() =>{
      const weatherBGc = selectedRegion.value.weatherCodes[0]
      const weatherBGr = Math.floor(weatherBGc / 100)
      if ( weatherBGr === 1 ){
        return 'bg-orange-lighten-4'
      } else if (weatherBGr === 2){
        return 'bg-blue-grey-lighten-4'
      } else if (weatherBGr === 3){
        return "bg-blue-lighten-4"
      } else if (weatherBGr === 4){
        return "bg-cyan-lighten-4"
      } else{
        "error"
      }
})
    

    return{ areaData, selectedRegion, weatherIcon, weatherColor, weatherBG, areaTime  }
  }
})
.use(vuetify)
.mount('#app')
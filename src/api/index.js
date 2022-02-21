import axios from "axios"

const url = "https://covid19.mathdro.id/api"

export const fetchData = async (country) => {
     let changebleaUrl = url
        if(country) {
            changebleaUrl = `${url}/countries/${country}`
        }
    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} =await axios.get(changebleaUrl)
        return {confirmed, recovered, deaths, lastUpdate}
        // const {data} = await axios.get(url)
        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate
        // }
        // return modifiedData
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)

        const modifiedData = data.map((dailyData) => ({
            confirmed:dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData
    } catch (error) {
        console.log(error)
    }
}

// export const fetchDailyData = async () => {
//  try {
//       const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
//       console.log(data)
//       return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
//     } catch (error) {
//       return error;
//     }
// }

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        // console.log({countries})
        return countries.map((country)=> country.name)
    } catch (error) {
        console.log(error)
    }
}
import { SerializedAutoFarm } from 'state/types'
import fetchPublicFarmData from './fetchPublicFarmData'

const fetchFarm = async (farm: SerializedAutoFarm): Promise<SerializedAutoFarm> => {
  const farmPublicData = await fetchPublicFarmData(farm)
  return { ...farm, ...farmPublicData }
}

export default fetchFarm

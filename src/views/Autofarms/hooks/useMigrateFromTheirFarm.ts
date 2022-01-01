import { useCallback } from 'react'
import { stakeFarm, unstakeFarm } from 'utils/calls'
import { useDeflixMainStakingContract, useWagFarmContract } from 'hooks/useContract'

const useMigrateFromTheirFarm = (theirPid: number, ourPid: number) => {
  const deflixMainStakingContract = useDeflixMainStakingContract()
  const wagFarmContract = useWagFarmContract()

  const handleMigrate = useCallback(
    async (amount: string) => {
      await unstakeFarm(wagFarmContract, theirPid, amount, 1)
      await stakeFarm(deflixMainStakingContract, ourPid, amount)
    },
    [deflixMainStakingContract, wagFarmContract, theirPid, ourPid]
  )

  return { onMigrate: handleMigrate }
}

export default useMigrateFromTheirFarm

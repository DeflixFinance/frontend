import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
import { useDeflixMainStakingContract } from 'hooks/useContract'

const useUnstakeFarms = (pid: number) => {
  const deflixMainStakingContract = useDeflixMainStakingContract()

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeFarm(deflixMainStakingContract, pid, amount)
    },
    [deflixMainStakingContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms

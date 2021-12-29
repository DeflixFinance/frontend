import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useDeflixMainStakingContract } from 'hooks/useContract'

const useStakeFarms = (pid: number) => {
  const deflixMainStakingContract = useDeflixMainStakingContract()

  const handleStake = useCallback(
    async (amount: string) => {
      await stakeFarm(deflixMainStakingContract, pid, amount)
    },
    [deflixMainStakingContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms

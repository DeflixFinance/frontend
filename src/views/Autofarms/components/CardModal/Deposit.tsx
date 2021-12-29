import { useCallback, useMemo, useState } from "react"
import useToast from "hooks/useToast"
import { ModalActions, ModalInput } from "components/Modal"
import { Button, WarningIcon, Text } from "uikit"
import BigNumber from "bignumber.js"
import styled from 'styled-components'
import { formatNumber, getFullDisplayBalance } from "utils/formatBalance"
import { FarmWithStakedValue } from "../FarmCard/FarmCard"
import useStakeFarms from "views/Autofarms/hooks/useStakeFarms"
import { useAppDispatch } from "state"
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from "state/autofarms"
import useApproveFarm from "views/Autofarms/hooks/useApproveFarm"
import { useERC20 } from "hooks/useContract"
import { getAddress } from "utils/addressHelpers"
import ConnectWalletButton from "components/ConnectWalletButton"
import "./Deposit.css"
import useMigrateFromTheirFarm from "views/Autofarms/hooks/useMigrateFromTheirFarm"

interface DepositProps {
    account?: string
    farm: FarmWithStakedValue
    lpPrice: BigNumber
    tokenName: string
    apy?: number
    onDismiss?: () => void
}

const Deposit: React.FC<DepositProps> = ({
    account,
    farm,
    tokenName,
    lpPrice,
    apy,
    onDismiss
}) => {
    const [val, setVal] = useState('')
    const { toastSuccess, toastError } = useToast()
    const [pendingTx, setPendingTx] = useState(false)
    const [pendingMigration, setPendingMigration] = useState(false)
    const [requestedApproval, setRequestedApproval] = useState(false)
    const { onStake } = useStakeFarms(farm.ourPid)
    const { onMigrate } = useMigrateFromTheirFarm(farm.theirPid, farm.ourPid)
    const dispatch = useAppDispatch()

    const { allowance, tokenBalance, stakedBalance } = farm.userData || {}
    const isApproved = account && allowance && allowance.isGreaterThan(0)

    const lpAddress = getAddress(farm.lpAddresses)
    const lpContract = useERC20(lpAddress)
    const { onApprove } = useApproveFarm(lpContract)

    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(tokenBalance)
    }, [tokenBalance])

    const theirFarmBalance = useMemo(() => {
        return getFullDisplayBalance(stakedBalance.wag)
    }, [stakedBalance])
    const theirFarmBalanceDollarValue = `$${formatNumber(new BigNumber(theirFarmBalance).times(lpPrice).toNumber(), 2)}`
    const hasTheirFarmStakedBalance = stakedBalance.wag.gt(0)

    const lpTokensToStake = new BigNumber(val)
    const fullBalanceNumber = new BigNumber(fullBalance)

    const usdMax = `$${formatNumber(fullBalanceNumber.times(lpPrice).toNumber(), 2)}`

    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            await onApprove()
            dispatch(fetchFarmsPublicDataAsync())
            dispatch(fetchFarmUserDataAsync({ account }))
            setRequestedApproval(false)
        } catch (e) {
            console.error(e)
        }
    }, [onApprove, dispatch, account])

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            if (e.currentTarget.validity.valid) {
                setVal(e.currentTarget.value.replace(/,/g, '.'))
            }
        },
        [setVal],
    )

    const handleSelectMax = useCallback(() => {
        setVal(fullBalance)
    }, [fullBalance, setVal])

    const handleStake = async (amount: string) => {
        await onStake(amount)
        dispatch(fetchFarmsPublicDataAsync())
        dispatch(fetchFarmUserDataAsync({ account }))
    }

    const handleMigrate = async (amount: string) => {
        await onMigrate(amount)
        dispatch(fetchFarmsPublicDataAsync())
        dispatch(fetchFarmUserDataAsync({ account }))
    }

    const disabled = pendingTx || pendingMigration || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(fullBalanceNumber)

    const renderApprovalOrStakeButton = () => {
        return isApproved ? (
            <div>
                <Button
                    width="100%"
                    disabled={disabled}
                    onClick={async () => {
                        setPendingTx(true)
                        try {
                            await handleStake(val)
                            //toastSuccess('Staked!', 'Your funds have been staked in the farm')                            
                            setPendingTx(false)
                            onDismiss()
                        } catch (e) {
                            // toastError(
                            //     'Error',
                            //     `Please try again. (error: ${e})`,
                            // )
                            console.error(e)
                            setPendingTx(false)
                        }
                    }}
                >
                    {pendingTx ? 'Confirming' : 'Deposit'}
                </Button>
            </div>
        ) : (
            <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
                Approve contract
            </Button>
        )
    }

    return (
        <div style={{ width: "100%" }}>
            <ModalInput
                value={val}
                onSelectMax={handleSelectMax}
                onChange={handleChange}
                max={fullBalance}
                dollarValue={usdMax}
                symbol={tokenName}
            />
            <ModalActions>
                {!account ? <ConnectWalletButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
            </ModalActions>
            {isApproved && hasTheirFarmStakedBalance && (<div>
                <Text fontSize="14px" color="#FFB237"><WarningIcon />You have {theirFarmBalance} {tokenName} (~{theirFarmBalanceDollarValue}) staked on {farm.theirFarm}.</Text>
                <Text fontSize="14px" color="#fff"><span className="spanBtn" onClick={async () => {
                    setPendingMigration(true)
                    try {
                        await handleMigrate(theirFarmBalance)
                        setPendingMigration(false)
                        onDismiss()
                    } catch (e) {
                        console.error(e)
                        setPendingMigration(false)
                    }
                }}>Click here</span> to unstake from their farm and stake into this vault (you'll be asked to sign 2 transactions).</Text>
            </div>)
            }
        </div>
    )
}

export default Deposit
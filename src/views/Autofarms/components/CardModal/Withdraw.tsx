import { useCallback, useState } from "react"
import { ModalActions, ModalInput } from "components/Modal"
import { Button } from "uikit"
import BigNumber from "bignumber.js"
import { FarmWithStakedValue } from "../FarmCard/FarmCard"
import { useAppDispatch } from "state"
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from "state/autofarms"
import useUnstakeFarms from "views/Autofarms/hooks/useUnstakeFarms"

interface WithdrawProps {
    account?: string
    farm: FarmWithStakedValue
    lpPrice: BigNumber
    tokenName: string
    stakedBalance: string
    stakedDollarValue: string
    onDismiss?: () => void
}

const Withdraw: React.FC<WithdrawProps> = ({
    account,
    farm,
    tokenName,
    lpPrice,
    stakedBalance,
    stakedDollarValue,
    onDismiss
}) => {
    const [val, setVal] = useState('')
    const [pendingTx, setPendingTx] = useState(false)
    const { onUnstake } = useUnstakeFarms(farm.ourPid)
    const dispatch = useAppDispatch()
         
    const fullBalanceNumber = new BigNumber(stakedBalance)
   
    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            if (e.currentTarget.validity.valid) {
                setVal(e.currentTarget.value.replace(/,/g, '.'))
            }
        },
        [setVal],
    )

    const handleSelectMax = useCallback(() => {
        setVal(stakedBalance)
    }, [stakedBalance, setVal])

    const handleUnstake = async (amount: string) => {
        await onUnstake(amount)
        dispatch(fetchFarmsPublicDataAsync())
        dispatch(fetchFarmUserDataAsync({ account }))
    }

    const valNumber = new BigNumber(val)
    const disabled = pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)

    return (
        <div style={{ width: "100%" }}>
            <ModalInput
                value={val}
                onSelectMax={handleSelectMax}
                onChange={handleChange}
                max={stakedBalance}
                symbol={tokenName}
                dollarValue={stakedDollarValue}
                lpPrice={lpPrice}
            />            
            <ModalActions>
                <Button
                    width="100%"
                    disabled={disabled}
                    onClick={async () => {
                        setPendingTx(true)
                        try {
                            await handleUnstake(val)
                            setPendingTx(false)
                            onDismiss()
                            //toastSuccess('Staked!'), t('Your funds have been staked in the farm'))                            
                        } catch (e) {
                            // toastError(
                            //     t('Error'),
                            //     t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                            // )
                            console.error(e)
                            setPendingTx(false)
                        }
                    }}
                >
                    {pendingTx ? 'Confirming' : 'Withdraw'}
                </Button>
            </ModalActions>
        </div>
    )
}

export default Withdraw
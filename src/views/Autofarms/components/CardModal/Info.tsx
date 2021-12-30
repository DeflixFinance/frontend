import { Flex, LinkExternal, Text } from "uikit"
import "./Info.css";

export interface InfoProps {
    lpLabel: string
    farm: string
    farmUrl: string
    tokenUrl: string
    displayApr: string
    displayApy: string
}

const Info: React.FC<InfoProps> = ({ lpLabel, farm, farmUrl, tokenUrl, displayApr, displayApy }) => {
    return (
        <Flex flexDirection="column" className="container" style={{ width: "100%" }}>
            <Text bold>VAULT DETAILS</Text>
            <div className="info-row">
                <span className="label">Token:</span><LinkExternal external={true} href={tokenUrl}>{lpLabel}</LinkExternal>
            </div>
            <div className="info-row">
                <span className="label">Farm:</span><LinkExternal external={true} href={farmUrl}>{farm}</LinkExternal>
            </div>
            
            <Text bold style={{ marginTop: "10px" }}>APY CALCULATIONS</Text>
            <div className="info-row">
                <span className="label">Original Farm APR:</span><span className="data">{displayApr}%</span>
            </div>
            <div className="info-row">
                <span className="label">Compounds per day:</span><span className="data">&#8805;3</span>
            </div>
            <div className="info-row">
                <span className="label">APY:</span><span className="data">{displayApy}%</span>
            </div>

            <Text bold style={{ marginTop: "10px" }}>FEES</Text>
            <div className="info-row">
                <span className="label">Performance:</span><span className="data">3.5%</span>
            </div>
            <div className="info-row">
                <span className="label">Deposit:</span><span className="data">&#8804;0.1%</span>
            </div>
            <div className="info-row">
                <span className="label">Widthdrawal:</span><span className="data">0%</span>
            </div>
        </Flex>
    )
}

export default Info
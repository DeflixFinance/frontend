import React from 'react'
import './Exchange.css'

function Exchange() {
    return (
        <>
            <h2 className="text-white text-center mt-3">ZAP</h2>
            <div className="bg-darker p-0 rounded-5 m-auto mt-3 mb-5 mw-480px overflow-hidden">
                <div className="p-4">
                    <div className="row justify-content-center">
                        Swap from single token:
                    </div>
                    <div className="row align-items-center justify-content-between">
                        <div className="col-4 dropdown">
                            <a className="btn btn-secondary dropdown-toggle rounded-pill bg-dark border-0 fs-5 px-3"
                                href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                USDC
                            </a>
                            <ul className="dropdown-menu bg-black" aria-labelledby="dropdownMenuLink">
                                <li><a className="dropdown-item text-white" href="/">Action</a></li>
                                <li><a className="dropdown-item text-white" href="/">Another action</a></li>
                                <li><a className="dropdown-item text-white" href="/">Something else here</a></li>
                            </ul>
                        </div>
                        <input className="col-7 input-custom-1" type="text" placeholder="0.00" />
                    </div>
                    <div className="row text-gray fw-light mt-3">
                        <div className="col-6 text-start">
                            Balance: <span id="balance">--</span>
                        </div>
                        <div className="col-6 text-end">
                            %<span id="%">--</span>
                        </div>
                    </div>
                    <hr />
                    <div className="row justify-content-center">
                        To LP token:
                    </div>
                    <div className="row align-items-center justify-content-between">
                        <div className="col-4 dropdown">
                            <a className="btn btn-secondary dropdown-toggle rounded-pill bg-dark border-0 fs-5 px-3"
                                href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                USDT
                            </a>
                            <ul className="dropdown-menu bg-black" aria-labelledby="dropdownMenuLink">
                                <li><a className="dropdown-item text-white" href="/">Action</a></li>
                                <li><a className="dropdown-item text-white" href="/">Another action</a></li>
                                <li><a className="dropdown-item text-white" href="/">Something else here</a></li>
                            </ul>
                        </div>
                        <input className="col-7 input-custom-1" type="text" placeholder="0.00" />
                    </div>
                    <div className="row text-gray fw-light mt-3">
                        <div className="col-6 text-start">
                            Balance: <span id="balance">--</span>
                        </div>
                        <div className="col-6 text-end">
                            %<span id="%">--</span>
                        </div>
                    </div>
                </div>
                <div className="row bg-lighter text-nowrap text-gray swap-bottom">
                    <div className="col-6 m-0 text-start"><i className="fas fa-exchange-alt me-2"></i>Exchange Rate</div>
                    <div className="col-6 m-0 text-end text-white"><span>1 USDC = 0.9996 USDT</span></div>
                </div>
            </div>
        </>
    )
}

export default Exchange
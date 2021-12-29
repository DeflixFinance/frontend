import React, { Component } from 'react';
import './Carousel.css'

export class Carousel extends Component<{ title: string }, {}> {
    render() {
        return (
            <>
                <hr className="bg-black mt-5" />
                <h2 className="h1 text-white text-center mb-3">{this.props.title}</h2>
                <div className='container-fluid'>                    
                        <div className="card">
                            <div className="sc-dYCqDv gUyDHd">
                                <div className="sc-hRUHzT eJeYyZ">
                                    <div className="sc-giAqHp gzYXcH">
                                        <div className="sc-giAqHp gzYXcH sc-iklJeh sc-jJMGnK hbusih igvven">
                                            <img src="https://github.com/wagyuswapapp/assets/blob/master/blockchains/velas/assets/0xabf26902fd7b624e0db40d31171ea9dddf078351/logo.png?raw=true" className="sc-kLojOw iehvjW" />
                                        </div>
                                        <div className="sc-giAqHp qLJMX sc-iklJeh sc-hiKfDv hbusih ljjXFN">
                                            <img src="https://github.com/wagyuswapapp/assets/blob/master/blockchains/velas/assets/0xc579d1f3cf86749e05cd06f7ade17856c2ce3126/logo.png?raw=true" className="sc-kLojOw iehvjW" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div color="text" className="sc-gtsrHT kiqEux">VLX_WAG</div>
                                </div>
                            </div>
                        </div>
                        <div className="card">2</div>
                        <div className="card">3</div>
                        <div className="card">4</div>
                        <div className="card">5</div>
                        <div className="card">6</div>
                        <div className="card">7</div>
                        <div className="card">8</div>
                        <div className="card">9</div>
                        <div className="card">10</div>                   
                </div>

            </>
        )
    }
}
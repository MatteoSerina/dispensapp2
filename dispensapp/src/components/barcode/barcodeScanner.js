import React, { useEffect } from 'react';
import Quagga from "quagga";
import config from './quaggaConfig.json';

const BarcodeScanner = (props) => {

    function handleScan(data) {
        Quagga.stop(); 
        play();
        props.onScan(data.codeResult.code);
    }

    const { onDetected } = props;

    let beep = new Audio("/beep.mp3");
    function play() {
        beep.play();
    }

    useEffect(() => {
        if (props.enableScanner) {
            Quagga.init(config, err => {
                if (err) {
                    console.log(err, "error msg");
                }
                Quagga.start();
                return () => {
                    Quagga.stop()
                }
            });

            Quagga.onDetected(handleScan);
        } else {
            try { Quagga.stop(); }
            catch (e) { }
        }
    });

    return (
        <div id="interactive" className="viewport" />
    );
}

export default BarcodeScanner;
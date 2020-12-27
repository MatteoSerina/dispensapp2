import React, { useEffect } from 'react';
import Quagga from "quagga";
import config from './quaggaConfig.json';

const BarcodeScanner = (props) => {

    function handleScan(data) {
        if (data.codeResult === undefined) { return; }
        if (isValid(data)) {
            Quagga.offDetected();
            Quagga.stop();
            play();
            console.log(data.codeResult);
            props.onScan(data.codeResult.code);
        } else {
            console.log(`Barcode ${data.codeResult.code} not valid`);
        }
    }

    let beep = new Audio("/beep.mp3");
    function play() {
        beep.play();
    }

    function getMedian(arr) {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }
    function isValid(result) {
        const errors = result.codeResult.decodedCodes
            .filter(_ => _.error !== undefined)
            .map(_ => _.error);

        const median = getMedian(errors);

        //Good result for code_128 : median <= 0.08 and maxError < 0.1
        return !(median > process.env.REACT_APP_BARCODE_MEDIAN_ERR || errors.some(err => err > process.env.REACT_APP_BARCODE_MAX_ERR))        
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
import React, { useState, useEffect } from 'react';
import {
    BrowserQRCodeReader,
    NotFoundException,
    ChecksumException,
    FormatException,
    
} from "@zxing/library";

const BarcodeScanner = (props) => {
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [code, setCode] = useState("");
    const [videoInputDevices, setVideoInputDevices] = useState([]);

    const codeReader = new BrowserQRCodeReader();

    console.log("ZXing code reader initialized");

    useEffect(() => {
        codeReader
            .getVideoInputDevices()
            .then(videoInputDevices => {
                setupDevices(videoInputDevices);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function setupDevices(videoInputDevices) {
        const sourceSelect = document.getElementById("sourceSelect");

        // selects first device
        setSelectedDeviceId(videoInputDevices[0].deviceId);

        // setup devices dropdown
        if (videoInputDevices.length >= 1) {
            setVideoInputDevices(videoInputDevices)
        }
    }

    function resetClick() {
        codeReader.reset();
        setCode("");
        console.log("Reset.");
    }

    function decodeContinuously(selectedDeviceId) {
        codeReader.decodeFromInputVideoDeviceContinuously(
            selectedDeviceId,
            "video",
            (result, err) => {
                if (result) {
                    // properly decoded qr code
                    console.log("Found QR code!", result);
                    setCode(result.text);
                }

                if (err) {
                    setCode("");

                    // As long as this error belongs into one of the following categories
                    // the code reader is going to continue as excepted. Any other error
                    // will stop the decoding loop.
                    //
                    // Excepted Exceptions:
                    //
                    //  - NotFoundException
                    //  - ChecksumException
                    //  - FormatException

                    if (err instanceof NotFoundException) {
                        console.log("No QR code found.");
                    }

                    if (err instanceof ChecksumException) {
                        console.log("A code was found, but it's read value was not valid.");
                    }

                    if (err instanceof FormatException) {
                        console.log("A code was found, but it was in a invalid format.");
                    }
                }
            }
        );
    }

    useEffect(
        deviceId => {
            decodeContinuously(selectedDeviceId);
            console.log(`Started decode from camera with id ${selectedDeviceId}`);
        },
        [selectedDeviceId]
    );


    return (
        <main class="wrapper">
            <section className="container" id="demo-content">
                <div id="sourceSelectPanel">
                    <label for="sourceSelect">Change video source:</label>
                    <select
                        id="sourceSelect"
                        onChange={() => setSelectedDeviceId(sourceSelect.value)}
                    >
                        {
                            videoInputDevices.map(element => (
                                <option value={element.deviceId}>{element.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <video id="video" width="300" height="200" />
                </div>

                <label>Result:</label>
                <pre>
                    <code id="result">{code}</code>
                </pre>

                <button id="resetButton" onClick={() => resetClick()}>
                    Reset
        </button>
            </section>
        </main>
    );
}

export default BarcodeScanner;
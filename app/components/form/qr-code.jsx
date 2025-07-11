//https://articles.readytowork.jp/implementing-a-qr-code-scanner-in-react-4c8f4e3c6f2e
import { useEffect, useRef, useState } from "react";
import ButtonBack from './buttonBack';
import ButtonNext from './buttonNext';


// Styles
import "./qr-code.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import Title from "../molecules/title";

const QrCode = ({ formData, setFormData }) => {
    // QR States
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);

    // Result
    const [scannedResult, setScannedResult] = useState("");

    // Success
    const onScanSuccess = (result) => {
        // 🖨 Print the "result" to browser console.
        console.log(result);
        // ✅ Handle success.
        // 😎 You can do whatever you want with the scanned result.
        setScannedResult(result?.data);

        console.log(`${import.meta.env.BASE_URL}qrCode`);
        if (result.data === "https://jana-elst.github.io/Abby/qrCode") {
            console.log('NextPage');
            setFormData({
                ...formData,
                state: formData.state + 1
            });
        }
    };

    // Fail
    const onScanFail = (err) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            // 👉 Instantiate the QR Scanner
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
                preferredCamera: "environment",
                // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
                highlightScanRegion: true,
                // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
                highlightCodeOutline: true,
                // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
                overlay: qrBoxEl?.current || undefined,
            });

            // 🚀 Start QR Scanner
            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        // 🧹 Clean up on unmount.
        // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    // ❌ If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);

    return (
        <>
            <div className="container--form container--qrCode">
                <div className="progress__container">
                    <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
                </div>
                <Title extraClass="form__title h3">Scan de QR-code naast de momentenmuur aan de ingang van Abby</Title>

                <div className="qr-reader">
                    {/* QR */}
                    <video ref={videoEl}></video>
                    <div ref={qrBoxEl} className="qr-box">
                    </div>
                </div>
            </div>

            <ButtonNext formData={formData} setFormData={setFormData}> Volgende stap DIT MOET AANGEPAST WORDEN!!!</ButtonNext>
        </>
    );
};

export default QrCode;
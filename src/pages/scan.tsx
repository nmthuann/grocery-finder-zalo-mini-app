import { Box, Button, Header, Page } from "zmp-ui";
import { Divider } from "../components/common/divider";
import { useEffect, useRef, useState } from "react";
import api, { FacingMode, ZMACamera } from "zmp-sdk";
import { BrowserMultiFormatReader } from "@zxing/browser";

const ScanPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cameraRef = useRef<ZMACamera>();

    const [barcode, setBarcode] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current as HTMLVideoElement;
        if (!videoElement) {
            console.log("Media component not ready");
            return;
        }
        if (!cameraRef.current) {
            cameraRef.current = api.createCameraContext({
                videoElement: videoElement,
                mediaConstraints: {
                    width: 640,
                    height: 480,
                    facingMode: FacingMode.BACK,
                    audio: false,
                },
            });
        }
    }, []);

    const startScanning = async () => {
        if (!cameraRef.current) return;
        await cameraRef.current.start();
        setIsScanning(true);
        const codeReader = new BrowserMultiFormatReader();

        const decodeFromVideo = () => {
            codeReader
                .decodeFromVideoElement(
                    videoRef.current as HTMLVideoElement,
                    (result, err) => {
                        if (result) {
                            setBarcode(result.getText());
                            stopCamera();
                        }
                        if (err) {
                            if (err.name === "NotFoundException") {
                                console.log("No barcode found");
                            } else {
                                console.error("Error scanning barcode", err);
                            }
                        }
                    }
                )
                .catch((err) => console.error("Error scanning barcode", err));
        };
        decodeFromVideo();
    };

    const stopCamera = () => {
        setIsScanning(false);
        cameraRef.current?.stop();
    };

    return (
        <Page className="bg-slate-100">
            <Header title="Scan barcode" showBackIcon={false} />
            <Divider />
            <Box>
                <div
                    className="border-dashed border-2 border-gray-300 rounded-lg
                 mt-20 ml-4 mr-4 p-4
      
                 "
                >
                    <video
                        style={{ width: "100vw", height: "auto" }}
                        ref={videoRef}
                        muted
                        playsInline
                    />
                </div>
            </Box>

            <Box
                mt={5}
                flex
                alignContent={"center"}
                className="w-full flex justify-center items-center space-x-2"
            >
                <Button
                    size={"small"}
                    className="mb-2"
                    variant="primary"
                    onClick={startScanning}
                    disabled={isScanning}
                >
                    Scan
                </Button>
                <Button
                    size={"small"}
                    className="mb-2"
                    variant="primary"
                    onClick={stopCamera}
                >
                    Stop
                </Button>
            </Box>

            {barcode && (
                <Box mt={3}>
                    <p>Scanned Barcode: {barcode}</p>
                </Box>
            )}
        </Page>
    );
};

export default ScanPage;

//  <div className="flex justify-center items-center">
//      <Icon icon="zi-camera" />
//  </div>;

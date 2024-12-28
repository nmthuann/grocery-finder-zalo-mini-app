import { Box, Button, Header, Icon, Page } from "zmp-ui";
import { Divider } from "../components/common/divider";
import { useEffect, useRef, useState } from "react";
import api, { FacingMode, ZMACamera } from "zmp-sdk";
import {
    BarcodeFormat,
    BrowserMultiFormatReader,
    DecodeHintType,
} from "@zxing/library";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, productByBarcodeState } from "../state";
import { Product } from "../types/product";

const ScanPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cameraRef = useRef<ZMACamera>();

    const [barcode, setBarcode] = useState<string>("");
    const [isScanning, setIsScanning] = useState(false);
    const [scannedProducts, setScannedProducts] = useState<Product[]>([]);

    const product = useRecoilValue(productByBarcodeState(barcode));
    const [quantity, setQuantity] = useState(1);
    const setCart = useSetRecoilState(cartState);
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
        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [
            BarcodeFormat.EAN_13,
            BarcodeFormat.QR_CODE,
        ]);
        codeReader.hints = hints;

        const decodeFromVideo = () => {
            codeReader
                .decodeFromVideoElement(videoRef.current as HTMLVideoElement)
                .then((result) => {
                    if (result) {
                        const scannedBarcode = result.getText();
                        setBarcode(scannedBarcode);

                        if (product) {
                            // Thêm sản phẩm vào danh sách nếu chưa có
                            setScannedProducts((prev) => {
                                const alreadyScanned = prev.some(
                                    (p) => p.barcode === scannedBarcode
                                );
                                return alreadyScanned
                                    ? prev
                                    : [...prev, product];
                            });
                        }
                        stopCamera();
                    }
                })
                .catch((err) => {
                    if (err.name === "NotFoundException") {
                        console.log("No barcode found");
                    } else {
                        console.error("Error scanning barcode", err);
                    }
                });
        };
        decodeFromVideo();
    };

    const stopCamera = () => {
        setIsScanning(false);
        cameraRef.current?.stop();
    };

    function handleAddProduct(product: Product): void {
        alert("Đã thêm vào giỏ hàng.");
        if (product) {
            setCart((cart: any) => {
                let res = [...cart];

                const existed = cart.find(
                    (item: { product: { id: number } }) =>
                        item.product.id === product.id
                );
                if (existed) {
                    res.splice(cart.indexOf(existed), 1, {
                        ...existed,
                        quantity: existed.quantity + quantity,
                    });
                } else {
                    res = res.concat({
                        product,
                        quantity,
                    });
                }

                return res;
            });
        }
    }

    return (
        <Page className="bg-slate-100 ">
            <Header title="Scan barcode" showBackIcon={false} />
            <Divider />
            <Box>
                <div className="border-dashed border-2 border-gray-300 rounded-lg mt-20 ml-4 mr-4 p-4">
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

            <Box mt={3} className="mb-16 p-2">
                <h1 className="text-lg font-bold mb-2">Scanned Products</h1>
                {scannedProducts.length > 0 ? (
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left  p-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Barcode</th>
                                <th className="border px-4 py-2">Thêm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scannedProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="border px-4 py-2">
                                        {product.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.price}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.barcode}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Button
                                            size={"small"}
                                            variant="primary"
                                            onClick={() =>
                                                handleAddProduct(product)
                                            }
                                            icon={<Icon icon="zi-plus" />}
                                        ></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products scanned yet.</p>
                )}
            </Box>
        </Page>
    );
};

export default ScanPage;

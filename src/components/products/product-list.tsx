import { useRecoilValue } from "recoil";
import Section from "../ui/section";
import { FC, Suspense, useEffect, useState } from "react";
import { ProductItemSkeleton } from "../ui/skeleton";
import { Box, Text } from "zmp-ui";
import { ProductItem } from "./product-item";
import { initProductsState } from "../../states/state";
import ReactPaginate from "react-paginate";
import { Page, Product } from "../../types/product";

export const ProductListContent: FC = () => {
    const products = useRecoilValue(initProductsState);
    const [loading, setLoading] = useState<boolean>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productData, setProductData] = useState<Page<Product>>(products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `https://staging-shop.fado.vn/api/admin/products?page[number]=${currentPage}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            apikey: "9cdfc6b4-2b4b-44b5-b427-b27c0dc32dfa",
                            apiconnection: "appmobile",
                            Authorization:
                                "Bearer 1|CVPgFpL9i1kYdzGUrz02ySMn76kBoseALxXHHDL713f60738",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP Error: ${response.status} - ${response.statusText}`
                    );
                }

                const data: Page<Product> = await response.json();
                setCurrentPage(data.current_page);
                setProductData(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected + 1);
    };

    return (
        <Box className="bg-slate-100 p-4">
            <Box className="flex flex-row justify-center items-center w-full m-4">
                <Text.Title className="text-[3A3C3D] font-semibold text-lg">
                    SẢN PHẨM HOT
                </Text.Title>
            </Box>

            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 ">
                {loading ? (
                    <ProductItemSkeleton />
                ) : (
                    productData.data.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))
                )}
            </Box>

            <Box className="mt-5 ">
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={productData.last_page}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={"flex justify-center space-x-2"}
                    pageClassName={"px-3 py-1 bg-gray-200 rounded"}
                    activeClassName={"bg-blue-500 text-white"}
                    previousClassName={"px-3 py-1 bg-gray-200 rounded"}
                    nextClassName={"px-3 py-1 bg-gray-200 rounded"}
                    disabledClassName={"opacity-50"}
                />
            </Box>
        </Box>
    );
};

export const ProductListFallback: FC = () => {
    const products = [...new Array(12)];

    return (
        <Section title="SẢN PHẨM HOT">
            <Box className="grid grid-cols-2 gap-4">
                {products.map((_, i) => (
                    <ProductItemSkeleton key={i} />
                ))}
            </Box>
        </Section>
    );
};

export const ProductList: FC = () => {
    return (
        <Suspense fallback={<ProductListFallback />}>
            <ProductListContent />
        </Suspense>
    );
};

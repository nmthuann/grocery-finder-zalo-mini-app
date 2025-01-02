import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Text } from "zmp-ui";
import { categoriesState, selectedCategoryIdState } from "../../state";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const categories = useRecoilValue(categoriesState);
    const navigate = useNavigate();
    const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

    const gotoCategory = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        navigate("/category");
        console.log("Navigate to category", categoryId);
    };

    return (
        <Box className="bg-white grid grid-cols-2 gap-2 p-4 mt-3 ml-4 mr-4 mb-8 rounded-xl">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => gotoCategory(category.id)}
                    className="
                    flex flex-col space-y-2 
                    m-4
                    items-center bg-transparent border-0 
                    p-0 cursor-pointer"
                >
                    <img
                        className="w-24 h-24"
                        src={category.icon}
                        alt={category.name}
                    />
                    <Text bold size="normal" className="text-gray-700">
                        {category.name}
                    </Text>
                </button>
            ))}
        </Box>
    );
};

export default Categories;

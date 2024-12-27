import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, useNavigate, Text, Button } from "zmp-ui";
import { categoriesState, selectedCategoryIdState } from "../../state";

const Categories = () => {
    const categories = useRecoilValue(categoriesState);
    const navigate = useNavigate();
    const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);
    const gotoCategory = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        navigate("/category");
    };
    return (
        <Box className="bg-white grid grid-cols-4 gap-4 p-4">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => gotoCategory(category.id)}
                    className="flex flex-col space-y-2 items-center bg-transparent border-0 p-0 cursor-pointer"
                >
                    <img
                        className="w-12 h-12"
                        src={category.icon}
                        alt={category.name}
                    />
                    <Text size="xxSmall" className="text-gray">
                        {category.name}
                    </Text>
                </button>
            ))}
        </Box>
    );
};

export default Categories;

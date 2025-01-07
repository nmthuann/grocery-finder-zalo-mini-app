import { Button, Icon } from "zmp-ui";

const ChatButton = () => {
    return (
        <div>
            <Button
                size="large"
                className=" fixed animate-bounce  
                flex justify-center items-center
        opacity-90 rounded-full left-3/4 bottom-14   
        bg-orange-500"
                icon={
                    <Icon
                        icon="zi-chat"
                        size={32}
                        className="text-white bottom-1 right-1"
                    />
                }
            ></Button>
        </div>
    );
};

export default ChatButton;

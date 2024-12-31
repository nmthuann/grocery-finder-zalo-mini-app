export const truncateText = (text: string, maxLength: number): string => {
  if(text == null){
    return "sản phẩm không có mô tả.";
  }
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength)} ...`;
};

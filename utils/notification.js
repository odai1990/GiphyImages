import Toast from "react-native-toast-message";
const showToast = (type, title, subTitle) => {
  Toast.show({
    type: type,
    text1: title,
    text2: subTitle,
  });
};

export default showToast;

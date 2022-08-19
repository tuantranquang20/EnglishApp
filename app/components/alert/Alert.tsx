import { Alert } from "react-native";

export const showConfirm = (
  title: string,
  content?: string,
  action?: (value?: string) => void
) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xác nhận",
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 200);
};

export const showMessages = (
  title: string,
  content?: string,
  action?: (value?: string) => void
) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "OK",
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 200);
};

export const showDialog = (
  title: string,
  textSubmit?: string,
  content?: string,
  action?: (value?: string) => void
) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "Đóng",
          style: "cancel"
        },
        {
          text: textSubmit || "Xem ngay",
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 200);
};

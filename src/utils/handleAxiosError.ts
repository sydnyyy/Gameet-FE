import { AxiosError } from "axios";

// error가 HTML 반환하는지 확인
function isHtmlString(str: string) {
  return /<[^>]+>/.test(str);
}

export function handleAxiosError(error: AxiosError) {
  if (error.response) {
    const data = error.response.data;

    if (!data) {
      return { message: "요청하신 작업을 수행할 수 없습니다." };
    }

    if (typeof data === "string") {
      if (isHtmlString(data)) {
        return { message: "요청하신 작업을 수행할 수 없습니다." };
      }
      return { message: data };
    }
    return data;
  }

  return { message: "요청하신 작업을 수행할 수 없습니다." };
}

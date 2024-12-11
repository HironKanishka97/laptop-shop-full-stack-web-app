package com.hklapstore.backend.dto.response;

import lombok.NoArgsConstructor;


@NoArgsConstructor
public class ResponseDto {
    private int code;
    private String message;
    private Object data;

    public ResponseDto(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResponseDto(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ResponseDto{" +
               "code=" + code +
               ", message='" + message + '\'' +
               ", data=" + data +
               '}';
    }
}

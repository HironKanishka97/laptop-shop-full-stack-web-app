package com.hklapstore.backend.dto.response;


public class TokenResponse {
    private String token;

    public TokenResponse(String token) {
        this.token = token;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {}

    @Override
    public String toString() {
        return "TokenResponse{" +
               "token='" + token + '\'' +
               '}';
    }
}

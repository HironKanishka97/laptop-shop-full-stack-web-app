package com.hklapstore.backend.dto;

import com.hklapstore.backend.entity.CartItem;
import com.hklapstore.backend.entity.Client;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class ClientOrderDto {
    private int id;
    private Date date;
    private Client client;
    private List<CartItem> cartItems;
    private BigDecimal lineTotal;

    public ClientOrderDto() {
    }

    public ClientOrderDto(int id, Date date, Client client, List<CartItem> cartItems, BigDecimal lineTotal) {
        this.id = id;
        this.date = date;
        this.client = client;
        this.cartItems = cartItems;
        this.lineTotal = lineTotal;
    }

    public BigDecimal getLineTotal() {
        return lineTotal;
    }

    public void setLineTotal(BigDecimal lineTotal) {
        this.lineTotal = lineTotal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    @Override
    public String toString() {
        return "ClientOrderDto{" +
               "id=" + id +
               ", date=" + date +
               ", client=" + client +
               ", cartItems=" + cartItems +
               '}';
    }
}

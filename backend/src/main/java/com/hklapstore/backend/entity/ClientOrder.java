package com.hklapstore.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Entity
public class ClientOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private Date date;
    @ManyToOne
    private Client client;
    @OneToMany(mappedBy = "clientOrder",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems;
    private BigDecimal lineTotal;

    // Helper method to set client order in CartItem
    public void setClientOrderInCartItem(List<CartItem> cartItems) {

        for (CartItem cartItem : cartItems) {

            cartItem.setClientOrder(this);  // Set the clientOrder in CartItem
        }

    }

    public ClientOrder() {
    }

    public ClientOrder(int id, Date date, Client client, List<CartItem> cartItems, BigDecimal lineTotal) {
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
        return "ClientOrder{" +
               "id=" + id +
               ", date=" + date +
               ", client=" + client +
               ", cartItems=" + cartItems +
               '}';
    }
}

package com.hklapstore.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Product product;
    @Column(nullable = false)
    private int totalCount;
    private BigDecimal total ;

    @JsonIgnore
    @ManyToOne
    private ClientOrder clientOrder;


    public CartItem() {}

    public CartItem(int id, Product product, int totalCount, BigDecimal total, ClientOrder clientOrder) {
        this.id = id;
        this.product = product;
        this.totalCount = totalCount;
        this.total = total;
        this.clientOrder = clientOrder;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int quantity) {
        this.totalCount = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public ClientOrder getClientOrder() {
        return clientOrder;
    }

    public void setClientOrder(ClientOrder clientOrder) {
        this.clientOrder = clientOrder;
    }

    @Override
    public String toString() {
        return "CartItem{" +
               "id=" + id +
               ", totalCount=" + totalCount +
               ", product=" + product +
               ", total=" + total +
               '}';
    }
}

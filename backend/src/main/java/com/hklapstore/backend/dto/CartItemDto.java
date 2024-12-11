package com.hklapstore.backend.dto;

import com.hklapstore.backend.entity.Product;

import java.math.BigDecimal;

public class CartItemDto {
    private int id;
    private Product product;
    private int totalCount;
    private BigDecimal total ;

    public CartItemDto() {}

    public CartItemDto(int id, Product product, int totalCount, BigDecimal total) {
        this.id = id;
        this.product = product;
        this.totalCount = totalCount;
        this.total = total;
    }

    @Override
    public String toString() {
        return "CartItemDto{" +
               "id=" + id +
               ", product=" + product +
               ", totalCount=" + totalCount +
               ", total=" + total +
               '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}

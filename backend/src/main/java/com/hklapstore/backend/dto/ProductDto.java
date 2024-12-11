package com.hklapstore.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;

import java.math.BigDecimal;


public class ProductDto {
    private int id;
    private String name;
    private String brand;
    private String description;
    private BigDecimal price;
    private int quantity;
    private int rop;
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getRop() {
        return rop;
    }

    public void setRop(int rop) {
        this.rop = rop;
    }

    public ProductDto() {}

    public ProductDto(int id, String name, String brand, String description, BigDecimal price, int quantity, int rop, String image) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.rop = rop;
        this.image = image;
    }

    @Override
    public String toString() {
        return "ProductDto{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", brand='" + brand + '\'' +
               ", description='" + description + '\'' +
               ", price=" + price +
               ", quantity=" + quantity +
               ", rop=" + rop +
               ", image='" + image + '\'' +
               '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

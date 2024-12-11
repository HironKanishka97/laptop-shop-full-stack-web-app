package com.hklapstore.backend.service;

import com.hklapstore.backend.dto.ProductDto;
import com.hklapstore.backend.entity.Product;
import com.hklapstore.backend.entity.User;
import com.hklapstore.backend.repository.ProductRepo;
import com.hklapstore.backend.util.VarList;
import com.hklapstore.backend.util.mapper.ProductMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;


@Slf4j
@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private ProductMapper productMapper;


    public List<ProductDto> getAllProducts() {
        try {
            List<Product> productList = productRepo.findAll();
            List<ProductDto>  productDtoList = new ArrayList<>();
            for (Product product : productList) {
                ProductDto productDto = new ProductDto();
                productDto.setId(product.getId());
                productDto.setName(product.getName());
                productDto.setBrand(product.getBrand());
                productDto.setDescription(product.getDescription());
                productDto.setPrice(product.getPrice());
                productDto.setQuantity(product.getQuantity());
                productDto.setRop(product.getRop());
                if(product.getImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(product.getImage());
                    productDto.setImage(base64Image);
                }
                productDtoList.add(productDto);
            }
            return productDtoList;
        } catch (Exception e) {
            return null;
        }
    }


    public ProductDto getProduct(int id) {
        try {
            Product product = productRepo.findById(id).orElse(null);
            if (product != null) {
                ProductDto productDto = new ProductDto();
                productDto.setId(product.getId());
                productDto.setName(product.getName());
                productDto.setBrand(product.getBrand());
                productDto.setDescription(product.getDescription());
                productDto.setPrice(product.getPrice());
                productDto.setQuantity(product.getQuantity());
                productDto.setRop(product.getRop());
                if (product.getImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(product.getImage());
                    productDto.setImage(base64Image);
                }
                return productDto;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public ProductDto saveProduct(ProductDto productdto) {
        try {
            byte[] imageBytes = Base64.getDecoder().decode(productdto.getImage());

            Product product1 = new Product(productdto.getId(),
                    productdto.getName(),
                    productdto.getBrand(),
                    productdto.getDescription(),
                    productdto.getPrice(),
                    productdto.getQuantity(),
                    productdto.getRop(),
                    imageBytes
            );
            Product product = productRepo.save(product1);
            productdto.setId(product.getId());
            return productdto;
        } catch (Exception e) {
            return null;
        }
    }

    public int updateProduct(int id, ProductDto productdto) {
        try {

            if (productRepo.existsById(id)) {

                byte[] imageBytes = Base64.getDecoder().decode(productdto.getImage());
                Product product1 = new Product(id,
                        productdto.getName(),
                        productdto.getBrand(),
                        productdto.getDescription(),
                        productdto.getPrice(),
                        productdto.getQuantity(),
                        productdto.getRop(),
                        imageBytes
                );
                Product product = productRepo.save(product1);
                return VarList.OK;
            } else {
                return VarList.NOT_FOUND;
            }
        } catch (Exception e) {
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public boolean deleteProduct(int id) {
        try {
            productRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

package com.hklapstore.backend.service;

import com.hklapstore.backend.dto.ClientOrderDto;
import com.hklapstore.backend.entity.CartItem;
import com.hklapstore.backend.entity.ClientOrder;
import com.hklapstore.backend.entity.Product;
import com.hklapstore.backend.repository.ClientOrderRepo;
import com.hklapstore.backend.repository.ProductRepo;
import com.hklapstore.backend.util.VarList;
import com.hklapstore.backend.util.mapper.ClientOrderMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
@Transactional
public class ClientOrderService {

    @Autowired
    private ClientOrderRepo clientOrderRepo;
    @Autowired
    private ClientOrderMapper clientOrderMapper;
    @Autowired
    private ProductRepo productRepo;


    public List<ClientOrderDto> getAllClientOrders() {
        try {
            List<ClientOrder> clientOrderList = clientOrderRepo.findAll();
//            System.out.println( clientOrderMapper.clientOrderListToDtoList(clientOrderList));
            return clientOrderMapper.clientOrderListToClientOrderDtoList(clientOrderList);
        } catch (Exception e) {
            return null;
        }
    }


    public ClientOrderDto getClientOrder(int id) {
        try {
            ClientOrder clientOrder = clientOrderRepo.findById(id).orElse(null);
            if (clientOrder != null) {
                return clientOrderMapper.clientOrderToClientOrderDto(clientOrder);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public int saveClientOrder(ClientOrderDto clientOrderdto) {
        try {
            ClientOrder clientOrder1 = clientOrderMapper.clientOrderDtoToClientOrder(clientOrderdto);
            //bl
            for (CartItem cartItem : clientOrder1.getCartItems()) {
                int productId = cartItem.getProduct().getId();
                int availableQty = productRepo.getCurrentQuantity(productId);
                int quantity = cartItem.getTotalCount();
                if (availableQty == 0 || availableQty - quantity <= 0) {
                    return VarList.BAD_REQUEST;
                } else {
                    productRepo.updateQuantity(productId, quantity);
                }
            }

            clientOrder1.setClientOrderInCartItem(clientOrder1.getCartItems());
            ClientOrder clientOrder = clientOrderRepo.save(clientOrder1);

            return VarList.CREATED;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public int updateClientOrder(int id, ClientOrderDto clientOrderdto) {
        try {
            boolean b = clientOrderRepo.existsById(id);
            ClientOrder clientOrder = clientOrderRepo.findById(id).orElse(null);
            if (b) {
                ClientOrder clientOrder1 = clientOrderMapper.clientOrderDtoToClientOrder(clientOrderdto);
                //bl
                for (CartItem cartItem : clientOrder1.getCartItems()) {
                    int productId = cartItem.getProduct().getId();
                    for (CartItem ci : clientOrder.getCartItems()) {
                        int currentOrderProductCount = ci.getTotalCount();
                        int availableQtyInProduct = productRepo.getCurrentQuantity(productId);
                        int quantityToUpdate = cartItem.getTotalCount();
                        int diff = currentOrderProductCount - quantityToUpdate;

                        if (availableQtyInProduct == 0 || availableQtyInProduct - diff <= 0) {
                            return VarList.BAD_REQUEST;
                        } else {
                            productRepo.updateQuantityAfterClientOrderUpdate(productId, diff);
                        }
                    }
                }

                clientOrder1.setClientOrderInCartItem(clientOrder1.getCartItems());
                ClientOrder save = clientOrderRepo.save(clientOrder1);

                return VarList.OK;
            } else {
                return VarList.NOT_FOUND;
            }

        } catch (Exception e) {
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public boolean deleteClientOrder(int id) {
        try {
            ClientOrder co = clientOrderRepo.findById(id).orElse(null);
            //bl
            if (co != null) {
                for (CartItem cartItem : co.getCartItems()) {
                    int quantityToIncrease = cartItem.getTotalCount();
                    productRepo.updateQuantityAfterClientOrderDelete(id, quantityToIncrease);
                }
            }
            clientOrderRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

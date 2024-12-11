package com.hklapstore.backend.util.mapper;

import com.hklapstore.backend.dto.ClientOrderDto;
import com.hklapstore.backend.entity.ClientOrder;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientOrderMapper {
   ClientOrderDto clientOrderToClientOrderDto(ClientOrder clientOrder);
   ClientOrder clientOrderDtoToClientOrder(ClientOrderDto clientOrderDto);
   List<ClientOrderDto> clientOrderListToClientOrderDtoList(List<ClientOrder> clientOrderList);
}

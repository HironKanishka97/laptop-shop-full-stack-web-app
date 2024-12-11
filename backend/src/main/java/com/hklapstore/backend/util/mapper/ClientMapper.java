package com.hklapstore.backend.util.mapper;

import com.hklapstore.backend.dto.ClientDto;
import com.hklapstore.backend.dto.ProductDto;
import com.hklapstore.backend.entity.Client;
import com.hklapstore.backend.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientMapper {
   ClientDto clientToClientDto(Client client);
   Client clientDtoToClient(ClientDto clientDto);
   List<ClientDto> clientListToClientDtoList(List<Client> clientList);
}

package com.hklapstore.backend.service;

import com.hklapstore.backend.dto.ClientDto;
import com.hklapstore.backend.entity.Client;
import com.hklapstore.backend.repository.ClientRepo;
import com.hklapstore.backend.util.VarList;
import com.hklapstore.backend.util.mapper.ClientMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class ClientService {

    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private ClientMapper clientMapper;


    public List<ClientDto> getAllClients() {
        try {
            List<Client> clientList = clientRepo.findAll();
//            System.out.println( clientMapper.clientListToDtoList(clientList));
            return clientMapper.clientListToClientDtoList(clientList);
        } catch (Exception e) {
            return null;
        }
    }


    public ClientDto getClient(int id) {
        try {
            Client client = clientRepo.findById(id).orElse(null);
            if (client != null) {
                return clientMapper.clientToClientDto(client);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public ClientDto saveClient(ClientDto clientdto) {
        try {
            Client client = clientRepo.save(clientMapper.clientDtoToClient(clientdto));
            return clientMapper.clientToClientDto(client);
        } catch (Exception e) {
            return null;
        }
    }

    public int updateClient(int id ,ClientDto clientdto) {
        try {
            if (clientRepo.existsById(id)) {
                Client client = clientRepo.save(clientMapper.clientDtoToClient(clientdto));
                return VarList.OK;
            } else {
                return VarList.NOT_FOUND;
            }
        } catch (Exception e) {
            return VarList.INTERNAL_SERVER_ERROR;
        }
    }

    public boolean deleteClient(int id) {
        try {
            clientRepo.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

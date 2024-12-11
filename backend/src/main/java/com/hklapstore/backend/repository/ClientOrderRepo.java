package com.hklapstore.backend.repository;

import com.hklapstore.backend.entity.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientOrderRepo extends JpaRepository<ClientOrder, Integer> {

}

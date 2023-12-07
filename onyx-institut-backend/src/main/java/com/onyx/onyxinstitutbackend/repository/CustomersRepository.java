package com.onyx.onyxinstitutbackend.repository;

import com.onyx.onyxinstitutbackend.model.Customers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends CrudRepository<Customers, Long> {
    Customers findCustomerById(Long id);
}

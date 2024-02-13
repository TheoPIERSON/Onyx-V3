package com.onyx.onyxinstitutbackend.customer;

import com.onyx.onyxinstitutbackend.customer.Customers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomersRepository extends CrudRepository<Customers, Long> {
    Customers findCustomerById(Long id);
    void deleteById(Long id);

}

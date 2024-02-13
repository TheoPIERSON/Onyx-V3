package com.onyx.onyxinstitutbackend.customer;

import com.onyx.onyxinstitutbackend.customer.Customers;
import com.onyx.onyxinstitutbackend.customer.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomersService {
    @Autowired
    private CustomersRepository customerRepository;

    public Iterable<Customers> getAllCustomers(){
        return customerRepository.findAll();
    }

    public Customers findCustomerById(Long id){
        return customerRepository.findCustomerById(id);
    }

    public Customers addCustomer(Customers customer){
        return customerRepository.save(customer);
    }

    public Customers updateCustomer(Customers customer){
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id){
        customerRepository.deleteById(id);
    }


}

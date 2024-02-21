package com.onyx.onyxinstitutbackend.customer;

import com.onyx.onyxinstitutbackend.exceptions.CustomerNotFoundException;
import com.onyx.onyxinstitutbackend.exceptions.InvalidEmailException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class CustomersService {
    @Autowired
    private CustomersRepository customerRepository;

    private static boolean isValidEmail(String email) {
        String regex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
        return Pattern.matches(regex, email);
    }


    public Iterable<Customers> getAllCustomers(){
        return customerRepository.findAll();
    }

    public Customers findCustomerById(Long id){
        return customerRepository.findCustomerById(id);
    }

    public Customers addCustomer(Customers customer){
        return customerRepository.save(customer);
    }

    @Transactional
    public Customers updateCustomer(Long id, Customers updatedCustomer) {
        Customers existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));

        // Validation des données (exemple)
        if (!isValidEmail(updatedCustomer.getEmail())) {
            new InvalidEmailException(updatedCustomer.getEmail());
        }

        // Mise à jour des champs
        BeanUtils.copyProperties(updatedCustomer, existingCustomer, "id"); // Copie sélective

        return customerRepository.save(existingCustomer);
    }

    public void deleteCustomer(Long id){
        customerRepository.deleteById(id);
    }
}

package com.onyx.onyxinstitutbackend.exceptions;

public class CustomerNotFoundException extends RuntimeException {

    public CustomerNotFoundException(Long id) {
        super("Customer with ID " + id + " not found");
    }
}

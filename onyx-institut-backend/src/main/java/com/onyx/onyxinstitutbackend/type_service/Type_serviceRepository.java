package com.onyx.onyxinstitutbackend.type_service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Type_serviceRepository extends CrudRepository<Type_service, Long> {
}

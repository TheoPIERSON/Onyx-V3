package com.onyx.onyxinstitutbackend.repository;

import com.onyx.onyxinstitutbackend.model.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {
}

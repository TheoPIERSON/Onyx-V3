package com.onyx.onyxinstitutbackend.appointment;

import com.onyx.onyxinstitutbackend.appointment.Appointment;
import com.onyx.onyxinstitutbackend.appointment.AppointmentRepository;
import com.onyx.onyxinstitutbackend.type_prestation.Type_prestation;
import com.onyx.onyxinstitutbackend.type_prestation.Type_prestationRepository;
import com.onyx.onyxinstitutbackend.type_prestation.Type_prestationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private Type_prestationRepository typePrestationRepository;
    private Type_prestationService typePrestationService;

    public Iterable<Appointment> getAllAppointments() {return appointmentRepository.findAll();
    }

    public Appointment addAppointment(Appointment appointment) {return appointmentRepository.save(appointment);
    }
    public Appointment findById(Long id){
        return appointmentRepository.findAppointmentById(id);
    }
    public Appointment updateAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }
    public void deleteAppointment(Long id){
        appointmentRepository.deleteById(id);
    }

    public Appointment assignPrestationToAppointment(Long idAppointment, Long idTypePrestation) {
        Set<Type_prestation> typePrestationSet = null;
        Appointment appointment = appointmentRepository.findAppointmentById(idAppointment);
        Type_prestation typePrestation = typePrestationRepository.findTypePrestationById(idTypePrestation);
        typePrestationSet = appointment.getPrestation();
        typePrestationSet.add(typePrestation);
        appointment.setPrestation(typePrestationSet);
        return appointmentRepository.save(appointment);
    }

    public Appointment findLatestAppointment() {
        List<Appointment> latestAppointment = appointmentRepository.findAll(
                PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "id"))).getContent();

        if (!latestAppointment.isEmpty()) {
            return latestAppointment.get(0);
        } else {
            // Gérer le cas où il n'y a pas de rendez-vous
            return null;
        }
    }

}

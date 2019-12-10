package com.viridis.management.service;

import com.viridis.management.service.dto.MaintenanceOrderDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.viridis.management.domain.MaintenanceOrder}.
 */
public interface MaintenanceOrderService {

    /**
     * Save a maintenanceOrder.
     *
     * @param maintenanceOrderDTO the entity to save.
     * @return the persisted entity.
     */
    MaintenanceOrderDTO save(MaintenanceOrderDTO maintenanceOrderDTO);

    /**
     * Get all the maintenanceOrders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MaintenanceOrderDTO> findAll(Pageable pageable);


    /**
     * Get the "id" maintenanceOrder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MaintenanceOrderDTO> findOne(Long id);

    /**
     * Delete the "id" maintenanceOrder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

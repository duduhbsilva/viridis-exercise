package com.viridis.management.service.impl;

import com.viridis.management.service.MaintenanceOrderService;
import com.viridis.management.domain.MaintenanceOrder;
import com.viridis.management.repository.MaintenanceOrderRepository;
import com.viridis.management.service.dto.MaintenanceOrderDTO;
import com.viridis.management.service.mapper.MaintenanceOrderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link MaintenanceOrder}.
 */
@Service
@Transactional
public class MaintenanceOrderServiceImpl implements MaintenanceOrderService {

    private final Logger log = LoggerFactory.getLogger(MaintenanceOrderServiceImpl.class);

    private final MaintenanceOrderRepository maintenanceOrderRepository;

    private final MaintenanceOrderMapper maintenanceOrderMapper;

    public MaintenanceOrderServiceImpl(MaintenanceOrderRepository maintenanceOrderRepository, MaintenanceOrderMapper maintenanceOrderMapper) {
        this.maintenanceOrderRepository = maintenanceOrderRepository;
        this.maintenanceOrderMapper = maintenanceOrderMapper;
    }

    /**
     * Save a maintenanceOrder.
     *
     * @param maintenanceOrderDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MaintenanceOrderDTO save(MaintenanceOrderDTO maintenanceOrderDTO) {
        log.debug("Request to save MaintenanceOrder : {}", maintenanceOrderDTO);
        MaintenanceOrder maintenanceOrder = maintenanceOrderMapper.toEntity(maintenanceOrderDTO);
        maintenanceOrder = maintenanceOrderRepository.save(maintenanceOrder);
        return maintenanceOrderMapper.toDto(maintenanceOrder);
    }

    /**
     * Get all the maintenanceOrders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MaintenanceOrderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MaintenanceOrders");
        return maintenanceOrderRepository.findAll(pageable)
            .map(maintenanceOrderMapper::toDto);
    }


    /**
     * Get one maintenanceOrder by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MaintenanceOrderDTO> findOne(Long id) {
        log.debug("Request to get MaintenanceOrder : {}", id);
        return maintenanceOrderRepository.findById(id)
            .map(maintenanceOrderMapper::toDto);
    }

    /**
     * Delete the maintenanceOrder by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MaintenanceOrder : {}", id);
        maintenanceOrderRepository.deleteById(id);
    }
}

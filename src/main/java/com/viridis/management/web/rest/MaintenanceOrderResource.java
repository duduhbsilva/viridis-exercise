package com.viridis.management.web.rest;

import com.viridis.management.service.MaintenanceOrderService;
import com.viridis.management.web.rest.errors.BadRequestAlertException;
import com.viridis.management.service.dto.MaintenanceOrderDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.viridis.management.domain.MaintenanceOrder}.
 */
@RestController
@RequestMapping("/api")
public class MaintenanceOrderResource {

    private final Logger log = LoggerFactory.getLogger(MaintenanceOrderResource.class);

    private static final String ENTITY_NAME = "maintenanceOrder";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaintenanceOrderService maintenanceOrderService;

    public MaintenanceOrderResource(MaintenanceOrderService maintenanceOrderService) {
        this.maintenanceOrderService = maintenanceOrderService;
    }

    /**
     * {@code POST  /maintenance-orders} : Create a new maintenanceOrder.
     *
     * @param maintenanceOrderDTO the maintenanceOrderDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new maintenanceOrderDTO, or with status {@code 400 (Bad Request)} if the maintenanceOrder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/maintenance-orders")
    public ResponseEntity<MaintenanceOrderDTO> createMaintenanceOrder(@Valid @RequestBody MaintenanceOrderDTO maintenanceOrderDTO) throws URISyntaxException {
        log.debug("REST request to save MaintenanceOrder : {}", maintenanceOrderDTO);
        if (maintenanceOrderDTO.getId() != null) {
            throw new BadRequestAlertException("A new maintenanceOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaintenanceOrderDTO result = maintenanceOrderService.save(maintenanceOrderDTO);
        return ResponseEntity.created(new URI("/api/maintenance-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /maintenance-orders} : Updates an existing maintenanceOrder.
     *
     * @param maintenanceOrderDTO the maintenanceOrderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated maintenanceOrderDTO,
     * or with status {@code 400 (Bad Request)} if the maintenanceOrderDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the maintenanceOrderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/maintenance-orders")
    public ResponseEntity<MaintenanceOrderDTO> updateMaintenanceOrder(@Valid @RequestBody MaintenanceOrderDTO maintenanceOrderDTO) throws URISyntaxException {
        log.debug("REST request to update MaintenanceOrder : {}", maintenanceOrderDTO);
        if (maintenanceOrderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MaintenanceOrderDTO result = maintenanceOrderService.save(maintenanceOrderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, maintenanceOrderDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /maintenance-orders} : get all the maintenanceOrders.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of maintenanceOrders in body.
     */
    @GetMapping("/maintenance-orders")
    public ResponseEntity<List<MaintenanceOrderDTO>> getAllMaintenanceOrders(Pageable pageable) {
        log.debug("REST request to get a page of MaintenanceOrders");
        Page<MaintenanceOrderDTO> page = maintenanceOrderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /maintenance-orders/:id} : get the "id" maintenanceOrder.
     *
     * @param id the id of the maintenanceOrderDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the maintenanceOrderDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/maintenance-orders/{id}")
    public ResponseEntity<MaintenanceOrderDTO> getMaintenanceOrder(@PathVariable Long id) {
        log.debug("REST request to get MaintenanceOrder : {}", id);
        Optional<MaintenanceOrderDTO> maintenanceOrderDTO = maintenanceOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(maintenanceOrderDTO);
    }

    /**
     * {@code DELETE  /maintenance-orders/:id} : delete the "id" maintenanceOrder.
     *
     * @param id the id of the maintenanceOrderDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/maintenance-orders/{id}")
    public ResponseEntity<Void> deleteMaintenanceOrder(@PathVariable Long id) {
        log.debug("REST request to delete MaintenanceOrder : {}", id);
        maintenanceOrderService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}

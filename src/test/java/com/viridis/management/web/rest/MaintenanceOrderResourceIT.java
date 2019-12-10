package com.viridis.management.web.rest;

import com.viridis.management.ManagementApp;
import com.viridis.management.domain.MaintenanceOrder;
import com.viridis.management.domain.Equipment;
import com.viridis.management.repository.MaintenanceOrderRepository;
import com.viridis.management.service.MaintenanceOrderService;
import com.viridis.management.service.dto.MaintenanceOrderDTO;
import com.viridis.management.service.mapper.MaintenanceOrderMapper;
import com.viridis.management.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.viridis.management.web.rest.TestUtil.sameInstant;
import static com.viridis.management.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MaintenanceOrderResource} REST controller.
 */
@SpringBootTest(classes = ManagementApp.class)
public class MaintenanceOrderResourceIT {

    private static final ZonedDateTime DEFAULT_SCHEDULED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_SCHEDULED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MaintenanceOrderRepository maintenanceOrderRepository;

    @Autowired
    private MaintenanceOrderMapper maintenanceOrderMapper;

    @Autowired
    private MaintenanceOrderService maintenanceOrderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMaintenanceOrderMockMvc;

    private MaintenanceOrder maintenanceOrder;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaintenanceOrderResource maintenanceOrderResource = new MaintenanceOrderResource(maintenanceOrderService);
        this.restMaintenanceOrderMockMvc = MockMvcBuilders.standaloneSetup(maintenanceOrderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaintenanceOrder createEntity(EntityManager em) {
        MaintenanceOrder maintenanceOrder = new MaintenanceOrder()
            .scheduledDate(DEFAULT_SCHEDULED_DATE);
        // Add required entity
        Equipment equipment;
        if (TestUtil.findAll(em, Equipment.class).isEmpty()) {
            equipment = EquipmentResourceIT.createEntity(em);
            em.persist(equipment);
            em.flush();
        } else {
            equipment = TestUtil.findAll(em, Equipment.class).get(0);
        }
        maintenanceOrder.setEquipment(equipment);
        return maintenanceOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaintenanceOrder createUpdatedEntity(EntityManager em) {
        MaintenanceOrder maintenanceOrder = new MaintenanceOrder()
            .scheduledDate(UPDATED_SCHEDULED_DATE);
        // Add required entity
        Equipment equipment;
        if (TestUtil.findAll(em, Equipment.class).isEmpty()) {
            equipment = EquipmentResourceIT.createUpdatedEntity(em);
            em.persist(equipment);
            em.flush();
        } else {
            equipment = TestUtil.findAll(em, Equipment.class).get(0);
        }
        maintenanceOrder.setEquipment(equipment);
        return maintenanceOrder;
    }

    @BeforeEach
    public void initTest() {
        maintenanceOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaintenanceOrder() throws Exception {
        int databaseSizeBeforeCreate = maintenanceOrderRepository.findAll().size();

        // Create the MaintenanceOrder
        MaintenanceOrderDTO maintenanceOrderDTO = maintenanceOrderMapper.toDto(maintenanceOrder);
        restMaintenanceOrderMockMvc.perform(post("/api/maintenance-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maintenanceOrderDTO)))
            .andExpect(status().isCreated());

        // Validate the MaintenanceOrder in the database
        List<MaintenanceOrder> maintenanceOrderList = maintenanceOrderRepository.findAll();
        assertThat(maintenanceOrderList).hasSize(databaseSizeBeforeCreate + 1);
        MaintenanceOrder testMaintenanceOrder = maintenanceOrderList.get(maintenanceOrderList.size() - 1);
        assertThat(testMaintenanceOrder.getScheduledDate()).isEqualTo(DEFAULT_SCHEDULED_DATE);
    }

    @Test
    @Transactional
    public void createMaintenanceOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = maintenanceOrderRepository.findAll().size();

        // Create the MaintenanceOrder with an existing ID
        maintenanceOrder.setId(1L);
        MaintenanceOrderDTO maintenanceOrderDTO = maintenanceOrderMapper.toDto(maintenanceOrder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaintenanceOrderMockMvc.perform(post("/api/maintenance-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maintenanceOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MaintenanceOrder in the database
        List<MaintenanceOrder> maintenanceOrderList = maintenanceOrderRepository.findAll();
        assertThat(maintenanceOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkScheduledDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = maintenanceOrderRepository.findAll().size();
        // set the field null
        maintenanceOrder.setScheduledDate(null);

        // Create the MaintenanceOrder, which fails.
        MaintenanceOrderDTO maintenanceOrderDTO = maintenanceOrderMapper.toDto(maintenanceOrder);

        restMaintenanceOrderMockMvc.perform(post("/api/maintenance-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maintenanceOrderDTO)))
            .andExpect(status().isBadRequest());

        List<MaintenanceOrder> maintenanceOrderList = maintenanceOrderRepository.findAll();
        assertThat(maintenanceOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMaintenanceOrders() throws Exception {
        // Initialize the database
        maintenanceOrderRepository.saveAndFlush(maintenanceOrder);

        // Get all the maintenanceOrderList
        restMaintenanceOrderMockMvc.perform(get("/api/maintenance-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maintenanceOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].scheduledDate").value(hasItem(sameInstant(DEFAULT_SCHEDULED_DATE))));
    }
    
    @Test
    @Transactional
    public void getMaintenanceOrder() throws Exception {
        // Initialize the database
        maintenanceOrderRepository.saveAndFlush(maintenanceOrder);

        // Get the maintenanceOrder
        restMaintenanceOrderMockMvc.perform(get("/api/maintenance-orders/{id}", maintenanceOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(maintenanceOrder.getId().intValue()))
            .andExpect(jsonPath("$.scheduledDate").value(sameInstant(DEFAULT_SCHEDULED_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingMaintenanceOrder() throws Exception {
        // Get the maintenanceOrder
        restMaintenanceOrderMockMvc.perform(get("/api/maintenance-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaintenanceOrder() throws Exception {
        // Initialize the database
        maintenanceOrderRepository.saveAndFlush(maintenanceOrder);

        int databaseSizeBeforeUpdate = maintenanceOrderRepository.findAll().size();

        // Update the maintenanceOrder
        MaintenanceOrder updatedMaintenanceOrder = maintenanceOrderRepository.findById(maintenanceOrder.getId()).get();
        // Disconnect from session so that the updates on updatedMaintenanceOrder are not directly saved in db
        em.detach(updatedMaintenanceOrder);
        updatedMaintenanceOrder
            .scheduledDate(UPDATED_SCHEDULED_DATE);
        MaintenanceOrderDTO maintenanceOrderDTO = maintenanceOrderMapper.toDto(updatedMaintenanceOrder);

        restMaintenanceOrderMockMvc.perform(put("/api/maintenance-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maintenanceOrderDTO)))
            .andExpect(status().isOk());

        // Validate the MaintenanceOrder in the database
        List<MaintenanceOrder> maintenanceOrderList = maintenanceOrderRepository.findAll();
        assertThat(maintenanceOrderList).hasSize(databaseSizeBeforeUpdate);
        MaintenanceOrder testMaintenanceOrder = maintenanceOrderList.get(maintenanceOrderList.size() - 1);
        assertThat(testMaintenanceOrder.getScheduledDate()).isEqualTo(UPDATED_SCHEDULED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingMaintenanceOrder() throws Exception {
        int databaseSizeBeforeUpdate = maintenanceOrderRepository.findAll().size();

        // Create the MaintenanceOrder
        MaintenanceOrderDTO maintenanceOrderDTO = maintenanceOrderMapper.toDto(maintenanceOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaintenanceOrderMockMvc.perform(put("/api/maintenance-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maintenanceOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MaintenanceOrder in the database
        List<MaintenanceOrder> maintenanceOrderList = maintenanceOrderRepository.findAll();
        assertThat(maintenanceOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMaintenanceOrder() throws Exception {
        // Initialize the database
        maintenanceOrderRepository.saveAndFlush(maintenanceOrder);

        int databaseSizeBeforeDelete = maintenanceOrderRepository.findAll().size();

        // Delete the maintenanceOrder
        restMaintenanceOrderMockMvc.perform(delete("/api/maintenance-orders/{id}", maintenanceOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MaintenanceOrder> maintenanceOrderList = maintenanceOrderRepository.findAll();
        assertThat(maintenanceOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

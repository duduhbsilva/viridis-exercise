package com.viridis.management.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class MaintenanceOrderMapperTest {

    private MaintenanceOrderMapper maintenanceOrderMapper;

    @BeforeEach
    public void setUp() {
        maintenanceOrderMapper = new MaintenanceOrderMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(maintenanceOrderMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(maintenanceOrderMapper.fromId(null)).isNull();
    }
}

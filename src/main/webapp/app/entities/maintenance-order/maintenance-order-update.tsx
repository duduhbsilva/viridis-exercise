import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEquipment } from 'app/shared/model/equipment.model';
import { getEntities as getEquipment } from 'app/entities/equipment/equipment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './maintenance-order.reducer';
import { IMaintenanceOrder } from 'app/shared/model/maintenance-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMaintenanceOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMaintenanceOrderUpdateState {
  isNew: boolean;
  equipmentId: string;
}

export class MaintenanceOrderUpdate extends React.Component<IMaintenanceOrderUpdateProps, IMaintenanceOrderUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      equipmentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEquipment();
  }

  saveEntity = (event, errors, values) => {
    values.scheduledDate = convertDateTimeToServer(values.scheduledDate);

    if (errors.length === 0) {
      const { maintenanceOrderEntity } = this.props;
      const entity = {
        ...maintenanceOrderEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/maintenance-order');
  };

  render() {
    const { maintenanceOrderEntity, equipment, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="managementApp.maintenanceOrder.home.createOrEditLabel">Cadastrar ou editar uma manutenção</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <AvForm model={isNew ? {} : maintenanceOrderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="maintenance-order-id">ID</Label>
                    <AvInput id="maintenance-order-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="scheduledDateLabel" for="maintenance-order-scheduledDate">
                  Data Marcada
                  </Label>
                  <AvInput
                    id="maintenance-order-scheduledDate"
                    type="datetime-local"
                    className="form-control"
                    name="scheduledDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.maintenanceOrderEntity.scheduledDate)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="maintenance-order-equipment">Equipamento</Label>
                  <AvInput id="maintenance-order-equipment" type="select" className="form-control" name="equipmentId" required>
                    {equipment
                      ? equipment.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvFeedback>Este campo é obrigatório.</AvFeedback>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/maintenance-order" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Voltar</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Salvar
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  equipment: storeState.equipment.entities,
  maintenanceOrderEntity: storeState.maintenanceOrder.entity,
  loading: storeState.maintenanceOrder.loading,
  updating: storeState.maintenanceOrder.updating,
  updateSuccess: storeState.maintenanceOrder.updateSuccess
});

const mapDispatchToProps = {
  getEquipment,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenanceOrderUpdate);

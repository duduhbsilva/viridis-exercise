import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './maintenance-order.reducer';
import { IMaintenanceOrder } from 'app/shared/model/maintenance-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMaintenanceOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MaintenanceOrderDetail extends React.Component<IMaintenanceOrderDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { maintenanceOrderEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Manutenção [<b>{maintenanceOrderEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="scheduledDate">Scheduled Date</span>
            </dt>
            <dd>
              <TextFormat value={maintenanceOrderEntity.scheduledDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Equipamento</dt>
            <dd>{maintenanceOrderEntity.equipmentId ? maintenanceOrderEntity.equipmentId : ''}</dd>
          </dl>
          <Button tag={Link} to="/maintenance-order" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Voltar</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/maintenance-order/${maintenanceOrderEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ maintenanceOrder }: IRootState) => ({
  maintenanceOrderEntity: maintenanceOrder.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenanceOrderDetail);

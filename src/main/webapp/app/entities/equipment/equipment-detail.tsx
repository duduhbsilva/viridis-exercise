import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './equipment.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EquipmentDetail extends React.Component<IEquipmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { equipmentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Equipamento [<b>{equipmentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Nome</span>
            </dt>
            <dd>{equipmentEntity.name}</dd>
          </dl>
          <Button tag={Link} to="/equipment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Voltar</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/equipment/${equipmentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ equipment }: IRootState) => ({
  equipmentEntity: equipment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentDetail);

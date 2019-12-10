import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './maintenance-order.reducer';
import { IMaintenanceOrder } from 'app/shared/model/maintenance-order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMaintenanceOrderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IMaintenanceOrderState = IPaginationBaseState;

export class MaintenanceOrder extends React.Component<IMaintenanceOrderProps, IMaintenanceOrderState> {
  state: IMaintenanceOrderState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { maintenanceOrderList, match } = this.props;
    return (
      <div>
        <h2 id="maintenance-order-heading">
          Manutenções
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Cadastrar Manutenção
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Carregando ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {maintenanceOrderList && maintenanceOrderList.length > 0 ? (
              <Table responsive aria-describedby="maintenance-order-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      ID <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('scheduledDate')}>
                     Data Marcada  <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      Equipamento <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {maintenanceOrderList.map((maintenanceOrder, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${maintenanceOrder.id}`} color="link" size="sm">
                          {maintenanceOrder.id}
                        </Button>
                      </td>
                      <td>
                        <TextFormat type="date" value={maintenanceOrder.scheduledDate} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        {maintenanceOrder.equipmentId ? (
                          <Link to={`equipment/${maintenanceOrder.equipmentId}`}>{maintenanceOrder.equipmentId}</Link>
                        ) : (
                          ''
                        )}
                      </td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${maintenanceOrder.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Ver</span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${maintenanceOrder.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${maintenanceOrder.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Excluir</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">Nenhuma manutenção encontrada</div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ maintenanceOrder }: IRootState) => ({
  maintenanceOrderList: maintenanceOrder.entities,
  totalItems: maintenanceOrder.totalItems,
  links: maintenanceOrder.links,
  entity: maintenanceOrder.entity,
  updateSuccess: maintenanceOrder.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenanceOrder);

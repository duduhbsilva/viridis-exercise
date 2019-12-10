import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMaintenanceOrder, defaultValue } from 'app/shared/model/maintenance-order.model';

export const ACTION_TYPES = {
  FETCH_MAINTENANCEORDER_LIST: 'maintenanceOrder/FETCH_MAINTENANCEORDER_LIST',
  FETCH_MAINTENANCEORDER: 'maintenanceOrder/FETCH_MAINTENANCEORDER',
  CREATE_MAINTENANCEORDER: 'maintenanceOrder/CREATE_MAINTENANCEORDER',
  UPDATE_MAINTENANCEORDER: 'maintenanceOrder/UPDATE_MAINTENANCEORDER',
  DELETE_MAINTENANCEORDER: 'maintenanceOrder/DELETE_MAINTENANCEORDER',
  RESET: 'maintenanceOrder/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMaintenanceOrder>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MaintenanceOrderState = Readonly<typeof initialState>;

// Reducer

export default (state: MaintenanceOrderState = initialState, action): MaintenanceOrderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MAINTENANCEORDER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MAINTENANCEORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MAINTENANCEORDER):
    case REQUEST(ACTION_TYPES.UPDATE_MAINTENANCEORDER):
    case REQUEST(ACTION_TYPES.DELETE_MAINTENANCEORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MAINTENANCEORDER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MAINTENANCEORDER):
    case FAILURE(ACTION_TYPES.CREATE_MAINTENANCEORDER):
    case FAILURE(ACTION_TYPES.UPDATE_MAINTENANCEORDER):
    case FAILURE(ACTION_TYPES.DELETE_MAINTENANCEORDER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAINTENANCEORDER_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_MAINTENANCEORDER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MAINTENANCEORDER):
    case SUCCESS(ACTION_TYPES.UPDATE_MAINTENANCEORDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MAINTENANCEORDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/maintenance-orders';

// Actions

export const getEntities: ICrudGetAllAction<IMaintenanceOrder> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MAINTENANCEORDER_LIST,
    payload: axios.get<IMaintenanceOrder>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMaintenanceOrder> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MAINTENANCEORDER,
    payload: axios.get<IMaintenanceOrder>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMaintenanceOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MAINTENANCEORDER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMaintenanceOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MAINTENANCEORDER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMaintenanceOrder> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MAINTENANCEORDER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

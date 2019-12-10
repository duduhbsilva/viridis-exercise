import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { getUrlParameter } from 'react-jhipster';
import { RouteComponentProps } from 'react-router-dom';

import { handlePasswordResetFinish, reset } from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';

export interface IPasswordResetFinishProps extends DispatchProps, RouteComponentProps<{ key: string }> {}

export const PasswordResetFinishPage = (props: IPasswordResetFinishProps) => {
  const [password, setPassword] = useState('');
  const [key] = useState(getUrlParameter('key', props.location.search));

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => props.handlePasswordResetFinish(key, values.newPassword);

  const updatePassword = event => setPassword(event.target.value);

  const getResetForm = () => {
    return (
      <AvForm onValidSubmit={handleValidSubmit}>
        <AvField
          name="newPassword"
          label="Nova Senha"
          placeholder={'Nova Senha'}
          type="password"
          validate={{
            required: { value: true, errorMessage: 'Este campo é obrigatório.' },
            minLength: { value: 4, errorMessage: 'Sua senha deve ter pelo menos 4 caracteres.' },
            maxLength: { value: 50, errorMessage: 'Sua senha não pode ter mais de 50 caracteres.' }
          }}
          onChange={updatePassword}
        />
        <PasswordStrengthBar password={password} />
        <AvField
          name="confirmPassword"
          label="Confirmar Senha"
          placeholder="Confirmar Senha"
          type="password"
          validate={{
            required: { value: true, errorMessage: 'Este campo é obrigatório.' },
            minLength: { value: 4, errorMessage: 'É necessário que sua senha de confirmação tenha no mínimo 4 caracteres.' },
            maxLength: { value: 50, errorMessage: 'Sua senha de confirmação não pode ter mais de 50 caracteres.' },
            match: { value: 'newPassword', errorMessage: 'A senha e sua confirmação não coincidem!' }
          }}
        />
        <Button color="success" type="submit">
          Validar nova senha
        </Button>
      </AvForm>
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="4">
          <h1>Redefinir Senha</h1>
          <div>{key ? getResetForm() : null}</div>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = { handlePasswordResetFinish, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(PasswordResetFinishPage);

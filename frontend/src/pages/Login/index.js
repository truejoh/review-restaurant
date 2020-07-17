import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import { Link } from 'react-router-dom'

import { Button, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Input } from 'reactstrap'

import useKeyPress from 'hooks/useKeyPress'

import authActions from 'redux/auth/actions'

import style from './style.module.scss'

const Login = ({ error, login }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const keyEvent = useKeyPress()
  const { addToast } = useToasts()

  useEffect(() => {
    if (error) {
      console.log(error)
      addToast('Email or password is not correct', { appearance: 'error' })
    }
  }, [error])

  useEffect(() => {
    if (keyEvent && keyEvent.key === 'Enter') {
      handleSubmit()
    }
    //eslint-disable-next-line
  }, [keyEvent])

  const isValidEmail = () => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email)
  }

  const isValidPassword = () => {
    return password.length > 5 && password.length < 128
  }

  const isValidForm = () => {
    if (!email || !password) return false
    if (isValidEmail() && isValidPassword()) return true
    return false
  }

  const handleSubmit = () => {
    if (isValidForm()) {
      login({ email, password })
    }
  }

  return (
    <div className={style.container}>
      <Card className={style.card}>
        <CardHeader className={style.cardHeader}>
          <h3>Login</h3>
        </CardHeader>

        <CardBody className={style.cardBody}>
          <Form>
            <FormGroup className={style.formField}>
              <Input type="text" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
              {email && !isValidEmail() && <span>Email address is invalid.</span>}
            </FormGroup>

            <FormGroup className={style.formField}>
              <Input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
              {password && !isValidPassword() && <span>Password length should be more than 5 and less than 128.</span>}
            </FormGroup>

            <FormGroup>
              <Button disabled={!isValidForm()} className={style.submit} onClick={handleSubmit}>Login</Button>
            </FormGroup>
          </Form>
        </CardBody>

        <CardFooter className={style.cardFooter}>
          Don't have an account? <Link to="/register">Register</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.Auth.user,
  error: state.Auth.error,
})

const mapDispatchToProps = {
  login: authActions.signinRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

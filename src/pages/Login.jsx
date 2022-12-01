import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user')||localStorage.getItem('user'))

    const submit = (data) => {
        axios.post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                localStorage.setItem('token', res.data.data.token);
                navigate('/');
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert('Error')
                } else {
                    console.log(error.response?.data)
                }
            })
    }


    return (
        <div className='container'>
            <h1>LOGIN</h1>

            { token? (
                <div className='container'>
                    <h1>{user?.firstName+' '+user?.lastName}</h1>
                    <h2>{user?.email}</h2>
                </div>
            ) : (<Form className='mx-auto' onSubmit={handleSubmit(submit)} style={{ maxWidth: '500px' }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                            placeholder="Enter email"
                            {...register("email")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            {...register("password")}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login!
                    </Button>
                </Form>) }
        </div>
    );
};

export default Login;
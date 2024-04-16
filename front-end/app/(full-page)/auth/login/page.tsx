/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState,useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
import { Toast } from 'primereact/toast';
import {  login } from '@/app/GlobalRedux/Features/task/taskSlice';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const dispatch = useAppDispatch();
    const toast = useRef<Toast>(null);
    const showSuccess = () => {
        toast.current?.show({
            severity: 'success',
            summary: 'Login Successfully',
            detail: 'Message Detail',
            life: 3000
        });
        router.push('/');
    };
    const validate = (values: {  email: string; password: string }) => {
        const errors :any = {};
      
        if (!values.password) {
          errors.lastName = 'Required';
        } else if (values.password.length <8) {
          errors.password = 'Must be 8 characters or more';
        }
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
      
        return errors;
      };
    const formik = useFormik({
        initialValues: {
          email: '',
          password:''
        },
        validate,
        onSubmit: values => {
        
      dispatch(login(values))
      .unwrap()
      .then(data => {
        console.log("Dispatch data",data);
        showSuccess();
      })
      .catch(e => {
        console.log(e);
      });

        },
      });

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>
                        <Toast ref={toast} />
                        <form className='CTOFForm' onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} onBlur={formik.handleBlur}
                            value={formik.values.email} onChange={formik.handleChange} />
                        {formik.errors.email ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.email}</div>
        
        : null}
                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password id = "password" name="password" inputId="password"  placeholder="Password"  className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" onBlur={formik.handleBlur}
                            value={formik.values.password} onChange={formik.handleChange}></Password>
 {formik.errors.password ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.password}</div>
        
        : null}
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button type="submit" label="Sign In" className="w-full p-3 text-xl"></Button>
                           
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';


const RegisterPage = () => {
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen  overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    
    const validate = (values: { firstName: string; emailInput: string; password: string }) => {
        const errors :any = {};
        
      
        if (!values.firstName) {
          errors.firstName = 'Please enter any value';
        } else if (!/^\d+$/i.test(values.firstName)) {
            errors.firstName = 'Invalid Entry';
          }
      
        if (!values.password) {
          errors.lastName = 'Required';
        } else if (values.password.length <8) {
          errors.password = 'Must be 8 characters or more';
        }
      
        if (!values.emailInput) {
          errors.emailInput = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailInput)) {
          errors.emailInput = 'Invalid email address';
        }
      
        return errors;
      };
    const formik = useFormik({
        initialValues: {
          firstName: '',
          emailInput: '',
          password:''
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

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
                            <div className="text-900 text-3xl font-medium mb-3">Task Managment</div>
                            <span className="text-600 font-medium">Sign UP to join us</span>
                        </div>
                        <form className='CTOFForm' onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="firstName" className="block text-900 text-xl font-medium mb-2">
                                Full Name
                            </label>
                            <InputText id="firstName"
                            name="firstName" type="text" placeholder="Full Name" className="w-full md:w-30rem" style={{ padding: '1rem' }} onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName} />
                            {formik.errors.firstName ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.firstName}</div>
        
        : null}
                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                email
                            </label>
                            <InputText id="emailInput" type="text" placeholder="email address" className="w-full md:w-30rem" style={{ padding: '1rem' }} onBlur={formik.handleBlur}
                            value={formik.values.emailInput} onChange={formik.handleChange} />
                        {formik.errors.emailInput ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.emailInput}</div>
        
        : null}
                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password id = "password" name="password" inputId="password1" placeholder="Password"  className="w-full" inputClassName="w-full p-3 md:w-30rem" onBlur={formik.handleBlur}
                            value={formik.values.password} onChange={formik.handleChange} ></Password>
                            {formik.errors.emailInput ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.emailInput}</div>
        
        : null}
                            
                            <Button type="submit" label="Register" className="w-full mb-5 p-3 text-xl"></Button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

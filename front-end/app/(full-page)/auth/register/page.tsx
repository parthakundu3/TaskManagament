/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useFormik } from 'formik';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
import { createUser } from '@/app/GlobalRedux/Features/task/taskSlice';


const RegisterPage = () => {
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const [submitted, setSubmitted] = useState(false);
 
    const dispatch = useAppDispatch();
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen  overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const toast = useRef<Toast>(null);
    const showSuccess = () => {
        toast.current?.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Message Detail',
            life: 3000
        });
        router.push('/auth/login');
    };
    const validate = (values: { fullname: string; email: string; password: string }) => {
        const errors :any = {};
        
      
        if (!values.fullname) {
          errors.fullname = 'Please enter any value';
        } else if (!/^[a-z0-9]+$/i.test(values.fullname)) {
            errors.fullname = 'Invalid Entry';
          }
      
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
          fullname: '',
          email: '',
          password:''
        },
        validate,
        onSubmit: values => {
        
      dispatch(createUser(values))
      .unwrap()
      .then(data => {
        console.log("Dispatch data",data);
        showSuccess();
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });

        },
      });

  const count = useSelector((state: RootState) => state.counter.value);
  
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
                        <Toast ref={toast} />
                        <form className='CTOFForm' onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="fullname" className="block text-900 text-xl font-medium mb-2">
                                Full Name
                            </label>
                            <InputText id="fullname"
                            name="fullname" type="text" placeholder="Full Name" className="w-full md:w-30rem mb-2" style={{ padding: '1rem' }} onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullname} />
                            {formik.errors.fullname ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.fullname}</div>
        
        : null}
                            <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                                email
                            </label>
                            <InputText id="email" type="text" placeholder="email address" className="w-full md:w-30rem mb-2" style={{ padding: '1rem' }} onBlur={formik.handleBlur}
                            value={formik.values.email} onChange={formik.handleChange} />
                        {formik.errors.email ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.email}</div>
        
        : null}
                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password id = "password" name="password" inputId="password1" placeholder="Password"  className="w-full mb-2" inputClassName="w-full p-3 md:w-30rem" onBlur={formik.handleBlur}
                            value={formik.values.password} onChange={formik.handleChange} ></Password>
                            {formik.errors.password ? <div className='ValidationEle' style={{color:'red'}}>{formik.errors.password}</div>
        
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

/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { loginRequest } from 'queryhook/auth';
import { LocalStorage } from 'services/localStorage';
import PublicLayout from 'components/Layout/Public/PublicLayout';
import AppButton from 'Components/Shared/AppButton/AppButton';
import Link from 'next/link';
import styles from 'styles/Home.module.css';
import Background from '/public/assets/login_bck.jpg'
import {resetPassword} from 'queryhook/auth'

const LoginSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().min(6).max(50).required('Password is required'),
});

const LoginPage = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: ''
  })

  const resetPasswordMutation = useMutation((email) => resetPassword(email), {
    onSuccess: () => {
      toast.success('Recovery email was sent to you')
      router.replace('/login')
    },
    onError: (error) => {
      toast.error(error.response.data.error)
    }
  })

  const onFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await LoginSchema.validate(formData)
    } catch (error) {
      toast.error('Invalid email or password')
      setLoading(false)
      return
    }
    resetPasswordMutation.mutate(formData)
    setLoading(false)
  }
	return (
		<PublicLayout pageTitle="Login bs">
			<section id='auth' className="vh-100" >
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5">
							<form onSubmit={onFormSubmit}>
							<div
								className="card shadow-2-strong"
								style={{ borderRadius: '1rem' }}
							>
								<div className="p-5 card card-body ">
									<h3 className="mb-5 text-center font-weight-bold">Reset password</h3>

									<div className="mb-4 form-outline">
										<label className="form-label" htmlFor="typeEmailX-2">
											Email
										</label>
										<input
											type="email"
											id="typeEmailX-2"
											className="form-control form-control-lg"
											onChange={e => setFormData({ ...formData, email: e.target.value })}
										/>
									</div>

									<div className="mb-4 form-outline">
										<label className="form-label" htmlFor="typePasswordX-2">
											Password
										</label>
										<input
											type="password"
											id="typePasswordX-2"
											className="form-control form-control-lg"
											onChange={e => setFormData({ ...formData, password: e.target.value })}
										/>
									</div>

									{/* <!-- Checkbox --> */}
									<div className="mb-4 form-check d-flex justify-content-start">
										<input
											className="mb-2 form-check-input me-1"
											type="checkbox"
											value=""
											id="form1Example3"
										/>
										<label className="form-check-label " htmlFor="form1Example3">
											{'  '}
											Remember password{' '}
										</label>
										</div>

										
										<div className="d-flex mb-4 ">
											<p className="me-1">Don&apos;t have an account?</p>
											<Link href='/register' className="link-primary ">register</Link>
										</div>
									<button
										// className="btn btn-primary btn-lg btn-block w-100"
										className={`${styles['app-button']} ${styles['app-button--blue']} w-100`}
										type="submit"
									>
										Reset password
									</button>

								</div>
								</div>
								</form>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
};

export default memo(LoginPage);
``
/* eslint-disable jsx-a11y/label-has-associated-control */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Link from 'next/link';
import { useMutation } from 'react-query';
import AppButton from '../Components/Shared/AppButton/AppButton';
import PublicLayout from '../Components/Layout/Public/PublicLayout';
import { registerRequest } from 'queryhook/auth';
import styles from 'styles/Home.module.css';
import {
	createAuthUserWithEmailAndPassword,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopuop
} from 'utils/Firebase';
import { LocalStorage } from "services/localStorage";

const RegisterSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup.string().min(6).max(50).required('Password is required'),
});

const defaultFormFields = {
	email: '',
	password: '',
};

const RegisterPage = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(defaultFormFields);

	const resetFormFields = () => setFormFields(defaultFormFields);

	const registerMutation = useMutation(
		(loginInfo) => registerRequest(loginInfo),
		{
			onSuccess: (data) => {
				if (data.status_code !== 400) {
					toast.success('User successfully registered');
					router.replace('/login');
				} else {
					toast.error(data.detail.message);
				}
			},
			onError: (error) => {
				toast.error(error.response.data.message);
			},
		}
	);

	const submitRegister = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			await RegisterSchema.validate(formData);
		} catch (errory) {
			toast.error('Invalid email or password');
			setLoading(false);
			return;
		}
		registerMutation.mutate(formData);
		setLoading(false);
	};

	// const submitRegisterWithFirebase = async (event) => {
	// 	event.preventDefault();
	// 	setLoading(true);

	// 	try {
	// 		await RegisterSchema.validate(formData);
	// 	} catch {
	// 		toast.error('Invalid email or password');
	// 		setLoading(false);
	// 		return;
	// 	}
	// 	console.log(formData);
	// 	const a = await createAuthUserWithEmailAndPassword(
	// 		formData.email,
	// 		formData.password
	// 	);
	// 	console.log(a);
	// };

	const onSignUpWithFirebase = async (event) => {
		event.preventDefault();
		try {
			const { user } = await signInWithGooglePopuop();
			console.log(user);
			registerMutation.mutate({email: user.email, password: user.uid})
			LocalStorage.setItem(user.accessToken)
			router.push('/')
			// await createUserDocumentFromAuth(user, { displayName });

			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				toast('this email is already registered before');
			} else {
				console.error('error has happend', error);
			}
		}
	};

	return (
		<PublicLayout pageTitle="Register">
			<section id="auth" className="vh-100">
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5">
							<form onSubmit={submitRegister}>
								<div
									className="card shadow-2-strong"
									style={{ borderRadius: '1rem' }}
								>
									<div className="p-5 card  ">
										<h3 className="mb-5 text-center font-weight-bold">
											Sign up
										</h3>

										<div className="mb-4 form-outline">
											<label className="form-label" htmlFor="typeEmailX-2">
												Email
											</label>
											<input
												type="email"
												id="typeEmailX-2"
												className="form-control form-control-lg"
												onChange={(e) =>
													setFormData({ ...formData, email: e.target.value })
												}
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
												onChange={(e) =>
													setFormData({ ...formData, password: e.target.value })
												}
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
											<label
												className="form-check-label "
												htmlFor="form1Example3"
											>
												{'  '}
												Remember password{' '}
											</label>
										</div>

										<div className="d-flex mb-4 ">
											<p className="me-1">Already have an account?</p>
											<Link href="/login" className="link-primary ">
												login
											</Link>
										</div>

										<button
											// className="btn btn-primary btn-lg btn-block w-100"
											className={`${styles['app-button']} ${styles['app-button--blue']} w-100`}
											type="submit"
										>
											Sign up
										</button>

										<hr className="my-4" />

										<button
											// className="btn btn-lg btn-block btn-secondary w-100"
											className={`${styles['app-button']} ${styles['app-button--red']} bg-danger w-100`}
											style={{ backgroundColor: '#dd4b39' }}
											type="button"
											onClick={onSignUpWithFirebase}
										>
											<i className="fab fa-google me-2"></i> Sign up with google
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

export default RegisterPage;

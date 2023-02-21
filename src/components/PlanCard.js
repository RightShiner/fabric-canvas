import React, { FC } from 'react';
import styles from 'styles/Home.module.css';


const PlanCard = ({ title, price, balance }) => {
	return (
		<div className="flex-col justify-between p-5 rounded-lg d-flex card h-72 p-11" style={{
			width:'400px'
		}}>
			<div>
				<h3 className="pb-2 text-xl font-bold">{title}</h3>
				<p className="pb-2">Usage {price} Credits</p>
				<p>Balance {balance} Credits</p>
			</div>
			{/* <AppButton size='sm' variant='primary' buttonContent='Upgrade' /> */}
			<button
				// className="btn btn-lg btn-block btn-secondary w-100"
				className={`${styles['app-button']} ${styles['app-button--blue']} w-25`}
				style={{ backgroundColor: '#dd4b39' }}
				type="submit"
			>
				<i className="fab me-2"></i>Buy
			</button>
		</div>
	);
};

export default PlanCard;

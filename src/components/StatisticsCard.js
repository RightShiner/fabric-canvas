import React, { FC } from 'react';

const StatisticsCard = ({ icon, value, label }) => {
	return (
		<div className="d-flex flex-row items-center w-full h-48 gap-8 p-3 pl-12 bg-white rounded-lg card sm:h-36 sm:w-80">
			<div className="pe-2" style={{width: '40px', height: '40px'}}>
				<i className="text-primo" >{icon}</i>
			</div>
			<div className="">
				<h4 className="text-2xl font-bold">{value ?? 0}</h4>
				<p className="font-medium">{label}</p>
			</div>
		</div>
	);
};

export default StatisticsCard;

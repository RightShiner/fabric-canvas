import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOutUser } from "utils/Firebase";
import React from 'react';

const nav = [
	{ title: 'Home', pathName: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
 },
	{ title: 'Accounts', pathName: '/accounts', icon: 'fa-user' },
];

export default function Sidebar() {
	const router = useRouter();
	const path = router.pathname;

	const handleLogoutClick = () => {
		localStorage.removeItem('auth-token');
		signOutUser()
		router.push('/login');
	};

	return (
		<div
			className="d-flex flex-column flex-shrink-0 p-3 bg-white"
			style={{ width: '200px' }}
		>
			<Link
				href="/"
				className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
			>
				{/* <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
				<span className="fs-4">Image Gen</span>
			</Link>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				{nav.map((item) => {
					return (
						<li key={item.title} className="nav-item">
							<Link
								href={item.pathName}
								className={`nav-link ${path === item.pathName ? 'active' : ''}`}
								aria-current="page"
							>
								{/* <svg className="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg> */}
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
			<hr />
			<div className="card">
				<div className="card text-center cursor-pointer bg-primo p-2 text-white ">
					<span onClick={() => handleLogoutClick()}>Logout</span>
				</div>
			</div>
		</div>
	);
}

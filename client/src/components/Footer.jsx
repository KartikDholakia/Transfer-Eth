import React from 'react';
// import { AiOutlineLinkedin } from "react-icons/ai";
import { BsLinkedin, BsGithub, BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
	return (
		<section className='bg-dark'>
			<div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
				<div className="flex justify-center mt-8 space-x-6">
					<a href="https://github.com/KartikDholakia" target="_blank" className="text-white hover:text-blue-500">
						<span className="sr-only">GitHub</span>
						<BsGithub className='text-white w-6 h-6 hover:text-blue-500'/>
					</a>
					<a href="https://www.linkedin.com/in/kartik-dholakia-99436716a/" target="_blank" className="text-white hover:text-blue-500">
						<span className="sr-only">LinkedIn</span>
						<BsLinkedin className='text-white w-6 h-6 hover:text-blue-500'/>
					</a>
					<a href="#" className="text-white hover:text-blue-500">
						<span className="sr-only">Facebook</span>
						<BsFacebook className='text-white w-6 h-6 hover:text-blue-500'/>
					</a>
					<a href="#" className="text-white hover:text-blue-500">
						<span className="sr-only">Instagram</span>
						<BsInstagram className='text-white w-6 h-6 hover:text-blue-500'/>
					</a>
				</div>
				{/* <AiOutlineLinkedin className='text-white'/> */}
				<p className="mt-8 text-base leading-6 text-center text-white">
					Made by Kartik Dholakia
				</p>
			</div>
		</section>	);
}

export default Footer;
import React, { useState } from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
import useForm from '@core/hooks/useForm';
import CryptoJS from 'crypto-js';

interface FormType {
	city: string;
	story: string;
}

const Form = (): JSX.Element=> {
	const [isLoading, setIsLoading] = useState<false | string>(false);

	const {form, mutateForm, resetForm} = useForm<FormType>({
		story: '',
		city: '',
	});

	const TIMBUS = () => {
		return CryptoJS.AES.encrypt(form.story, form.city).toString();
	};

	const SUBMIT = () => {
		return CryptoJS.AES.decrypt(form.story, form.city).toString(CryptoJS.enc.Utf8);
	};

	const handleSubmit = () => {
		setIsLoading('submit');
		
		setTimeout(() => {
			const result = SUBMIT();
			alert(result);
			resetForm();
			setIsLoading(false);
		}, 1000);
	};
	
	const handleTimbus = () => {
		setIsLoading('timbus');
		
		setTimeout(() => {
			const result = TIMBUS();
			alert(result);
			resetForm();
			setIsLoading(false);
		}, 1000);
	};

	return (
		<MainLayout title="Form" className="flex-cc col">
			<h1 className="mb-4 text-4xl font-bold">f orm</h1>

			<div className="flex-cc col gap-4 mb-12 w-80">
				<textarea name="story" value={form.story} onChange={mutateForm} placeholder="What is your story?" rows={4} className="w-full border"/>
				<input type="password" name="city" value={form.city} onChange={mutateForm} placeholder="do you know something?" className="w-full border"/>

				<div className="flex-cc gap-4">
					<button onClick={handleSubmit} className="p-2 ml-auto text-white bg-accent" data-loading={isLoading === 'submit'}>
					SUBMIT <i className="spinner"></i>
					</button>
					<button onClick={handleTimbus} className="p-2 ml-auto text-white bg-black" data-loading={isLoading === 'timbus'}>
					TIMBUS <i className="spinner"></i>
					</button>
				</div>
			</div>

			<Link href="/" className="px-4 py-2 text-white bg-gray-400 hover:bg-opacity-80">BACK HOME</Link>
		</MainLayout>
	);
};

// Example use of :
// useForm, unified form state control
// built in loading style button with data-loading= true or false 

export default Form;

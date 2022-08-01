// created this file to store the logic to connect to blockchain
// here we have used React Context

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	// Fetch the contract:
	const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
	// console.log(provider, signer, transactionContract);

	return transactionContract;
}

export const TransactionProvider = ({ children }) => {

	const [CurrentAccount, setCurrentAccount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [transactionsCount, setTransactionsCount] = useState(localStorage.getItem('transactionsCount'));
	const [transactions, setTransactions] = useState([]);

	// to get the form data from Welcome component:
	const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
	const handleChange = (e, name) => {	// e -> keyboard event, name -> form field (eg addressTo, amount, etc.)
		// this function will dynamically update the formData
		// https://stackoverflow.com/questions/49792757/react-how-to-update-the-state-with-previous-state
		// ... = spread operator
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
	}

	// get the list of transactions:
	const getAllTransactions = async() => {
		try {
			if (!ethereum) return alert('Please install a wallet (Recommended wallet: Metamask)!');			
			const transactionContract = getEthereumContract();
			const availableTransactions = await transactionContract.getAllTransactions();

			// to structre the transactions:
			const structuredTransactions = availableTransactions.map((transaction) => ({
				addressTo: transaction.receiver,
				addressFrom: transaction.sender,
				timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
				message: transaction.message,
				keyword: transaction.keyword,
				amount: parseInt(transaction.amount._hex) / (10 ** 18)	// wei to ethers
			}));

			setTransactions(structuredTransactions);
			console.log(structuredTransactions);
		} catch (error) {
			console.log(error);
		}
	}

	const checkIfWalletIsConnected = async () => {
		try {
			// if browser was not able to get ethereum object:
			if (!ethereum) return alert('Please install a wallet (Recommended wallet: Metamask)!');

			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length) {
				console.log(accounts);
				setCurrentAccount(accounts[0]);
				getAllTransactions();
			}
			else {
				console.log('No account found!');
			}			
		} catch (error) {
			console.log(error);
			throw new Error('No ethereum object detected!');
		}
	}

	const chechIfTransactionsExist = async() => {
		try {
			const transactionContract = getEthereumContract();
			const transactionCount = await transactionContract.getTransactionsCount();

			// save in local storage:
			window.localStorage.setItem("transaction-count: ", transactionCount);
		} catch (error) {
			console.log(error);
			throw new Error('No ethereum object detected!');			
		}
	}

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert('Please install a wallet (Recommended wallet: Metamask)!');

			// eth_requestAccounts - to fetch the list of accounts
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

			// connect to first account:
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error('No ethereum object detected!');
		}
	}

	const sendTransaction = async() => {
		try {
			if (!ethereum) return alert('Please install a wallet (Recommended wallet: Metamask)!');
			
			// get the data from form in 'Welcome' component:
			const { addressTo, amount, keyword, message } = formData;
			
			const transactionContract = getEthereumContract();

			// convert amount (in ether) to gwei
			const parsedAmount = ethers.utils.parseEther(amount);

			// to send ether:
			// (ethereum.request: to submit RPC requests to Ethereum via MetaMask)
			await ethereum.request({
				// https://docs.metamask.io/guide/sending-transactions.html#example
				method: 'eth_sendTransaction',
				params: [{
					from: CurrentAccount,
					to: addressTo,
					// gas: '0x4E20', // random value; 0x4E20 = 20000 gwei
					value: parsedAmount._hex
				}]
			})

			// store the record of transaction in blockchain:
			const transactionHash = await transactionContract.addTransaction(addressTo, parsedAmount, message, keyword);
			setIsLoading(true);
			console.log(`Loading - ${transactionHash.hash}`);
			await transactionHash.wait();
			setIsLoading(false);
			console.log(`Success - ${transactionHash.hash}`);

			const transactionCount = await transactionContract.getTransactionsCount();
			setTransactionsCount(transactionCount.toNumber());

			// reload the page once the transaction is completed:
			location.reload();
		} catch (error) {
			console.log(error);
			throw new Error('No ethereum object detected!');
		}		
	}

	// the function will be called only once when a react component will be mounted:
	useEffect(() => {
		checkIfWalletIsConnected();
		chechIfTransactionsExist();
	}, []);
	
	// we are wrapping our entire react application with all of 
	// the data that is going to be passed into it:
	// we are passing 'connectWallet' function to all components
	return (
		<TransactionContext.Provider value={{ connectWallet, CurrentAccount, formData, handleChange, sendTransaction, transactions, isLoading }}>
			{ children }
		</TransactionContext.Provider>
	);
}
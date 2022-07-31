// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
	uint transactions_count;

	event Transfer(address from, address receiver, uint amount, string message, uint timestamp, string keyword);

	// properties of a transaction:
	struct TransferStruct {
		address sender;
		address receiver;
		uint amount;
		string message;
		uint timestamp;
		string keyword;
	}

	TransferStruct[] transactions;

	function addTransaction(address payable receiver, uint amount, string memory message, string memory keyword) public {
		transactions_count++;
		transactions.push(TransferStruct(
			msg.sender,
			receiver,
			amount,
			message,
			block.timestamp,
			keyword
		));

		// to actually make a transaction:
		emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
	}

	function getAllTransactions() public view returns (TransferStruct[] memory) {
		return transactions;
	}

	function getTransactionsCount() public view returns (uint) {
		return transactions_count;
	}
}
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//use github link

contract stoken is ERC20 {
  
  constructor() ERC20("votecoin","vote"){
    _mint(msg.sender, 1000);
  }
    
  function decimals() public view override returns (uint8) {
		return 0;
	}
    

}
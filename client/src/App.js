import React, { Component } from "react";
import electionContract from "./contracts/election.json";
import stokenContract from "./contracts/stoken.json"
import getWeb3 from "./getWeb3";
import ReactDOM from 'react-dom';


class App extends Component {

  state = {web3: null, accounts: null, contract1: null ,contract2: null, start: null ,listitems : []  ,winner : []};

  componentDidMount = async () => {
    setInterval(() => {
      window.location.reload()
      
    }, 2*60*1000);
    try {
      // Get network provider and web3 instance1.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

  

      // Get the contract instance1.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork1 = electionContract.networks[networkId];
      const deployedNetwork2= stokenContract.networks[networkId]
      const instance1 = new web3.eth.Contract(
        electionContract.abi,
        deployedNetwork1 && deployedNetwork1.address,
      );
      const instance2 = new web3.eth.Contract(
        stokenContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );
     

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.]
      const stamp= await instance1.methods.get_time().call()
     
    
     this.setState({ web3, accounts, contract1: instance1 , contract2 : instance2 , start : stamp });
     
    
     console.log(Date.now()/1000)
      console.log(Number(this.state.start))



    
   /* if (Date.now()/1000 < Number(this.state.start)+ (2*60)){
    for(var i=0 ; i< candidates.length ;i++ ){
      await instance1.methods.add_candidates(candidates[i]).send({from : this.state.accounts[0]})
    }}*/
  
   
    
      //this.vote(instance2)
    }
     catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  register = async (e) =>{
    e.preventDefault()
  

   if (Date.now()/1000 > Number(this.state.start) + (2*60) && Date.now()/1000 < Number(this.state.start) + (4*60) ){
  
    const {accounts ,contract1, contract2} =this.state;
    const add_= e.target.add.value
    console.log(add_)

      try{
        const bal=await contract2.methods.balanceOf(add_).call()
      }
      catch(error){
        return console.log("invalid")
      }
      const bal=await contract2.methods.balanceOf(add_).call()
      console.log(bal)
      if(bal != 0){
        alert("account balance is exceeded or address is not valid")
        return
      }

    
    var t=await contract1.methods.authorise(add_).send({from: accounts[0]});
    if(t.events.Authorise.returnValues.voted !== true && t.events.Authorise.returnValues.weight >= 1){
      await contract2.methods.approve(add_,1).send({from : accounts[0]});
      await contract2.methods.transfer(add_,1).send({from: accounts[0]});
      }  
    }
    else{
      alert( "Time out")
      window.location.reload()

    }
    
  
    
    
    
    

    
    






    //const y=await contract.methods.get().call();
   //const y=await contract.methods.approve("0x7af349ed36863a66b04c2ac567abb6f8a4cf76c4",1000).send({from : accounts[0]});
    //console.log(y);

    
    //const p=await contract.methods.increase_allowence("0xFD3D5e1999e66a81000e4039619924eD02f9927Aa6","0xf59f2181479b9ee0a4849dae1b90d7c600330283",1000).send({from : accounts[0]});
   //console.log(y);
  //const k=await contract.methods.allowance(accounts[0],"0x7af349ed36863a66b04c2ac567abb6f8a4cf76c4").call();
   // await contract.methods.transferfrom("0xFD3D5e1999e66a81000e4039619924eD02f9927Aa6","0xf59f2181479b9ee0a4849dae1b90d7c600330283",1).call();
    //console.log(k);
    
    //const x=await contract.methods.ballanceof("0xFD3D5e1999e66a81000e4039619924eD02f9927Aa6","0xd8625d44aD7D5C52bE54a932e33AeE59DE0d8F0A").call();
    //console.log(x);
    
    //console.log(p);
    //console.log(y);
    //await contract.approve(" 0xFD3D5e1999e66a81000e4039619924eD02f9927Aa6"," 0xf59f2181479b9ee0a4849dae1b90d7c600330283", 1000 );
  
    //await contract.methods.transfer("0x7af349ed36863a66b04c2ac567abb6f8a4cf76c4", 1000 ).send({from : accounts[0]});
    //const x=await contract.methods.balanceOf("0x7af349ed36863a66b04c2ac567abb6f8a4cf76c4").call();
    //console.log(x);
  };

  vote = async (e) =>{
  
    e.persist()
    if (Date.now()/1000  > Number(this.state.start) + (4*60) && Date.now()/1000 < Number(this.state.start) + (6*60) ){
      
    const {accounts ,contract1, contract2} =this.state;
    console.log(e)
    const candidate= e.target.value;
    console.log(accounts[0])
    const bal=await contract2.methods.balanceOf(accounts[0]).call()
    if( bal < 1){
      alert("insufficient balance")
      window.location.reload()
    }
    await contract2.methods.transfer("0xd8625d44aD7D5C52bE54a932e33AeE59DE0d8F0A",1).send({from : accounts[0]})
    await contract1.methods.vote(candidate).send({from :accounts[0]})
    window.location.reload()
    
  }
  
  else{
    alert( "Time out")
    window.location.reload()

  }

    
  };

  add_can = async (e)=>{
    e.preventDefault()

    if (Date.now()/1000 < Number(this.state.start)+ (2*60)){

    const can= e.target.can.value
    const {accounts ,contract1} =this.state
    

    await contract1.methods.add_candidates(can).send({from :accounts[0]})
    await contract1.methods.get_can().call()
  }

    else{
      alert( "Time out")
      window.location.reload()

    }

  }
  
 


   
 /*ren= async ()=> {
   console.log("cdsd")
    const {start} =this.state;
    if (Date.now()/1000 > Number(start) + (4*60) && Date.now()/1000 < Number(start) + (6*60) ){
      ReactDOM.render(
        <div>
          <h1>enter your address</h1>
          <form onSubmit={this.register}>
        <input id ="add"type ="text"  placeholder="0x......"></input>
        <input type="submit"></input>

      </form>
        </div>

        ,document.getElementById('root'))

    }

    if (Date.now()/1000  > Number(start) + (6*60) && Date.now()/1000 < Number(start) + (20*60) ){
      console.log("cds")
      ReactDOM.render(
        <div>
          <h1>voting phase</h1>
          {this.state.listitems.map(listitem => (
            <input type="submit" value={listitem} onClick={this.vote} />
          ))}
    
            </div>
       ,document.getElementById('root'))
      
   }
    if (Date.now()/1000 > Number(start) + (20*60)){
    const {contract1} =this.state;
    const winner_= await contract1.methods.winner().call()
    this.setState({winner : winner_ })
      console.log("sdc")
      ReactDOM.render(
        <div>
          <h1>winners</h1>
          {this.state.winner.map(listitem => (
            <input type="submit" value={listitem} />
          ))}
            </div>
       ,document.getElementById('root'))
     }

    
  }*/
  
  winner = async (e)=>{
    e.preventDefault()
    const {contract1} =this.state;
    const winner_= await contract1.methods.winner().call()
    this.setState({winner : winner_ })
     ReactDOM.render(
      <div>
        <h1>winners</h1>
        {this.state.winner.map(listitem => (
          <input type="submit" value={listitem} />
        ))}
          </div>
     ,document.getElementById('root'))




  }

  vote_ = async (e)=>{
    e.preventDefault()

    const {contract1} =this.state;
    const can= await contract1.methods.get_can().call()
    const ac=await this.state.web3.eth.getAccounts()
    this.setState({accounts : ac})
    this.setState({listitems : can })
    console.log(this.state.listitems)
    ReactDOM.render(
      <div>
        <h1>voting</h1>
        

        {this.state.listitems.map(listitem => (
          <input id="candi" type="submit" value={listitem} onClick={this.vote} />
        ))}
     
          </div>

     ,document.getElementById('root'))




  }



  

 render(){
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if (Date.now()/1000 < Number(this.state.start)+ (2*60)){
    return( 
      <div>
          <h1>add candidate</h1>
          <form onSubmit={this.add_can}>
        <input id ="can"type ="text"  placeholder="Name"></input>
        <input type="submit"></input>

      </form>
        </div>)
        }
      if (Date.now()/1000 > Number(this.state.start) + (2*60) && Date.now()/1000 < Number(this.state.start) + (4*60) ){
        return(

          <div>
          <h1>enter your address</h1>
          <form onSubmit={this.register}>
        <input id ="add"type ="text"  placeholder="0x......"></input>
        <input type="submit"></input>

      </form>
        </div>
        )
      }
      if (Date.now()/1000  > Number(this.state.start) + (4*60) && Date.now()/1000 < Number(this.state.start) + (6*60) ){
        return(
          <div>
          <h1>voting phase</h1>
          <form onSubmit={this.vote_}>
          <input type="submit" value="voting is started ..click to vote" ></input>
          </form>
            </div>
        )
      }
      if (Date.now()/1000 > Number(this.state.start) + (6*60)){
        return(
          <div>
          <h1>winners</h1>
          <input type="submit" value="voting has been completed click to know the winner" onClick={this.winner}></input>
            </div>

        )
      }

  }

 /*render(){
  return(

    <div>
        <h1>voting</h1>
        

        {this.state.listitems.map(listitem => (
          <input type="button" value={listitem} onClick={this.vote} />
        ))}
     
          </div>
  )
  }*/
   
  

}
 
export default App;
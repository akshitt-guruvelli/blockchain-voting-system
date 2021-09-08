// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
pragma abicoder v2;

contract election
{
    struct voter
    {
        bool voted;
        uint weight;
    }
    event Authorise(bool voted,uint weight);
    
    
    address public admin;
    string[] Candidates;
    mapping(string => uint) public CandidateVotes;
    mapping(address=>voter) voterlist;
    string[] winners;
    uint StartTime;
    
    constructor()
    {
        admin=msg.sender;
        voterlist[admin].weight=1;
        StartTime=block.timestamp;
        Candidates.push("NOTA");
    }
    modifier add_candidates_requirements()
    {
        if(msg.sender!=admin)
        {
            revert("YOU ARE NOT AUTHORISED TO ADD CANDIDATES");
        }
        _;
    }
    function add_candidates (string memory x) public add_candidates_requirements
    {
        Candidates.push(x);
        
    }
    modifier Vote_requirements()
    {
        if(Candidates.length<=1)
        {
            
            revert("NOT SUFFICIENT NUMBER OF CANDIDADTES TO CONDUCT ELECTION");
        }
        _;
    }
    function vote(string memory v) public Vote_requirements
    {
        CandidateVotes[v]+=voterlist[msg.sender].weight;
        voterlist[msg.sender].weight=0;
        voterlist[msg.sender].voted=true;
    }

 function authorise (address _address) public verify(_address)
 {
 voterlist[_address].voted=false;
 voterlist[_address].weight=1;
 emit Authorise(voterlist[_address].voted,voterlist[_address].weight);

 }
 modifier verify(address _address)
 {
 if(msg.sender != admin || voterlist[_address].voted==true)
 {
    
 revert("ERROR!!!");
 }
 _;
 }
    

    function winner() public returns(string[] memory)
    {
        uint maximum=0;
        for(uint i=0; i<Candidates.length; i++)
        {
            if(CandidateVotes[Candidates[i]]>=maximum)
            maximum=CandidateVotes[Candidates[i]];
        }
        for(uint i=0; i<Candidates.length; i++)
        {
            if(CandidateVotes[Candidates[i]]==maximum)
            winners.push(Candidates[i]);
        }
        return winners;
    }
    function get_time() public view returns(uint){
    return StartTime ;}

    function get_can() public view returns(string[] memory){
    return Candidates ;}

}
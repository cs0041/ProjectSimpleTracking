// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Tracking{

    struct Order {
        address owner;
        Map[] AllMap;
        bool isOpen;
    }

    struct Map{
        address sender;
        string where;
    }



  mapping(uint256 => Order)  tracking;
  mapping(address => uint256[])  ownerALLID;
  uint256 numberID = 0;

  modifier onlyOwnerTracking(address _sender,uint256 _id) {
        require(tracking[_id].owner == _sender, "Ownable: caller is not the owner");
        _;
    }

  function createNewRouteTracking() external {
    Order storage newUsuario = tracking[numberID];
    newUsuario.owner =  msg.sender;
    Map memory newMap = Map(msg.sender, "init");
    newUsuario.AllMap.push(newMap);
    newUsuario.isOpen = true;

    ownerALLID[msg.sender].push(numberID);
    numberID++;
  }

  function addMapRoute(uint256 _id,string memory where) external onlyOwnerTracking(msg.sender,_id) {
    Order storage _Route = tracking[_id];
    Map memory newMap = Map(msg.sender, where);
    _Route.AllMap.push(newMap);
  }

  function editMapRoute(uint256 _id,string memory _where) external onlyOwnerTracking(msg.sender,_id) {
    Order storage _Route = tracking[_id];
    require(_Route.AllMap[_Route.AllMap.length-1].sender == msg.sender,"Ownable: caller is not the owner of this map");
    _Route.AllMap[_Route.AllMap.length-1].where= _where;
  }

  function transferOwerTracking(uint256 _id,address newOwner)  external onlyOwnerTracking(msg.sender,_id) {
    require(newOwner != address(0),"newOwner can't be address0");
    Order storage _Route = tracking[_id];
    Map memory newMap = Map(msg.sender, "transferOwer");
    _Route.AllMap.push(newMap);
    _Route.owner =  newOwner;
    ownerALLID[newOwner].push(_id);

     for(uint i = 0 ;i < ownerALLID[msg.sender].length;i++)
      {
        if(ownerALLID[msg.sender][i] == _id){
           remove(msg.sender,i);
           break;
        }
      }
  }

  function remove(address owner,uint256 _index) private {
        require(_index < ownerALLID[owner].length, "index out of bound");

        for (uint i = _index; i < ownerALLID[owner].length - 1; i++) {
            ownerALLID[owner][i] = ownerALLID[owner][i + 1];
        }
        ownerALLID[owner].pop();
    }

  function closeTracking(uint256 _id) external onlyOwnerTracking(msg.sender,_id) {
    Order storage _Route = tracking[_id];
    _Route.isOpen = false;
    _Route.owner =  address(0);
  }

  function readAllIDOwner() view external returns(uint256[] memory){
      uint256[] memory allID = new uint256[](ownerALLID[msg.sender].length);
      
      for(uint i = 0 ;i < ownerALLID[msg.sender].length;i++)
      {
          allID[i] = ownerALLID[msg.sender][i];
      }

      return allID;
  }


  function readRoute(uint256 _id) view external returns(Map[] memory){
      Order storage _Route = tracking[_id];
      Map[] memory dataMap = new Map[](_Route.AllMap.length);
      for(uint i = 0 ;i < _Route.AllMap.length;i++)
      {
          dataMap[i] = _Route.AllMap[i];
      }

      return dataMap;
      
  }

  function getDataByID(uint256 _id) view external returns(Order memory){
    return tracking[_id];
  }

} 
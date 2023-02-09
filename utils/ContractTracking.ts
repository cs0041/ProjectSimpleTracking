export const contractAddress = '0xbeb72e1E02556dCDfCEFa401774aEeC2886334dd'

export const contractABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'where',
        type: 'string',
      },
    ],
    name: 'addMapRoute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'closeTracking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'createNewRouteTracking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_where',
        type: 'string',
      },
    ],
    name: 'editMapRoute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getDataByID',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'sender',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'where',
                type: 'string',
              },
            ],
            internalType: 'struct Tracking.Map[]',
            name: 'AllMap',
            type: 'tuple[]',
          },
          {
            internalType: 'bool',
            name: 'isOpen',
            type: 'bool',
          },
        ],
        internalType: 'struct Tracking.Order',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'readAllIDOwner',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'readRoute',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'where',
            type: 'string',
          },
        ],
        internalType: 'struct Tracking.Map[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwerTracking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
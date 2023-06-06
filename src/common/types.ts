export interface Transaction {
  hash: string;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  size: number;
  weight: number;
  fee: number;
  relayed_by: string;
  lock_time: number;
  tx_index: number;
  double_spend: boolean;
  time: number;
  block_index: number;
  block_height: number;
  inputs: Input[];
  out: Out[];
}

export interface Address {
  hash160: string;
  address: string;
  n_tx: number;
  n_unredeemed: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: Transaction[];
}

export interface Message {
  op: string;
  x: X;
}

export interface X {
  lock_time: number;
  ver: number;
  size: number;
  inputs: Input[];
  time: number;
  tx_index: number;
  vin_sz: number;
  hash: string;
  vout_sz: number;
  relayed_by: string;
  out: Out[];
}

export interface Input {
  sequence: number;
  prev_out: Out;
  script: string;
}

export interface Out {
  spent: boolean;
  tx_index: number;
  type: number;
  addr: string;
  value: number;
  n: number;
  script: string;
}

export interface CurrencyInfo {
  '15m': number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
}

export interface Ticker {
  EUR: CurrencyInfo;
  USD: CurrencyInfo;
}

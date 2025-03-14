enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
  };


interface IPurchasesAttrs {
    user_id: number;
    basket: number[];
}


interface IProductAttrs {
  id?: number;
  market_hash_name: string;
  min_tradable_price: number;
  min_no_tradable_price: number;
}


interface IUserAttrs {
  id?: number;
  name: string;
  password: string;
  balance: number;
}
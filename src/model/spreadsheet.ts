export interface Spreadsheet {
  id?: string;
  sheet?: string;
}

export interface Sheet {
  sheet?: string;
  data?: Input[];
}

export class Input {
  date: Date;
  kind: string;
  category: string;
  currency: string;
  amount: number;
  description?: string;

  constructor(date: any, kind: string, category: string, currency: string, amount: any, description?: string) {
    this.date = date;
    this.kind = kind.toUpperCase();
    this.category = category.toUpperCase();
    this.currency = currency.toUpperCase();
    this.amount = amount;
    this.description = description;
  }
}

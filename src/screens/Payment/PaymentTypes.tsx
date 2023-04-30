export interface PaymentMethod {
  key: string;
  card_number: string;
}

export interface Payment {
  key: string;
  card_number: string;
  card_expiration_date: string;
  card_holder_name: string;
  card_cvv: string;
  card_document: string;
}

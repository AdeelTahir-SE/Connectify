export type message = {
  role: "user" | "bot";
    content: string;
};

export type friend={
  uid: string;
  email: string;
  name: string;
 image:string
}
export type User= {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: number;
  image: string;
  tier: string;
  daysRemaining: string;
  dateOfPurchase: string;

}
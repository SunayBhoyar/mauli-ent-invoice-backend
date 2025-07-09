import mongoose from "mongoose";

const InvoiceItemSchema = new mongoose.Schema({
  id: String,
  description: String,
  hsnSac: String,
  gstRate: Number,
  quantity: Number,
  rate: Number,
  taxAmount: Number,
  amount: Number,
}, { _id: false });

const InvoiceSchema = new mongoose.Schema({
  // Header
  title: String,
  copyType: String,

  // Basic Info
  invoiceTo: String,
  billingAddress: String,
  shippingAddress: String,
  invoiceNo: String,
  dated: String,
  deliveryChallenDate: String,
  modeOfPayments: String,
  referenceNo: String,
  refDate: String,

  // GSTIN/UIN
  supplierGstin: String,
  supplierState: String,
  supplierCode: String,

  buyerGstin: String,
  buyerOrderNo: String,
  buyerOrderDate: String,

  // Dispatch Details
  dispatchDocNo: String,
  dispatchedThrough: String,
  destination: String,
  termsOfDelivery: String,

  // Items
  items: [InvoiceItemSchema],

  // Tax Details
  cgstRate: Number,
  sgstRate: Number,

  // Declaration
  declaration: String,
  authorizedSignatory: String,

  // Bank Settings
  bankName: String,
  accountName: String,
  accountNumber: String,
  branchName: String,
  ifscCode: String,

}, { timestamps: true });

export const Invoice = mongoose.model("Invoice", InvoiceSchema);

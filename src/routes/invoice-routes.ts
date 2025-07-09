import { Router, Request, Response } from "express";
import { Invoice } from "../models/Invoice";

const router = Router();

// POST: Add new invoice
router.post("/add", async (req: Request, res: Response) => {
    try {
        const invoice = new Invoice(req.body);
        const saved = await invoice.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save invoice" });
    }
});

// GET: Filter invoices
// Example: GET /api/invoices?invoiceTo=ABC&dated=2024-07-06&invoiceNo=INV123
router.get("/", async (req: Request, res: Response) => {
    try {
        const { invoiceTo, dated, invoiceNo } = req.query;
        const filter: any = {};
        if (invoiceTo) filter.invoiceTo = invoiceTo;
        if (dated) filter.dated = dated;
        if (invoiceNo) filter.invoiceNo = invoiceNo;

        const invoices = await Invoice.find(filter).sort({ createdAt: -1 });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch invoices" });
    }
});

// GET: Next invoice number in the series
router.get("/next-invoice-no", async (req: Request, res: Response) => {
    try {
        // Find the most recent invoice for the current year
        const currentYear = new Date().getFullYear().toString();
        const regex = new RegExp(`^INV-${currentYear}-\\d{4}$`);
        const lastInvoice = await Invoice.findOne({ invoiceNo: { $regex: regex } })
            .sort({ createdAt: -1 });

        let nextNumber = 1;
        if (lastInvoice && lastInvoice.invoiceNo) {
            // Extract the XXXX part and increment
            const parts = lastInvoice.invoiceNo.split("-");
            if (parts.length === 3) {
                const lastNum = parseInt(parts[2], 10);
                if (!isNaN(lastNum)) {
                    nextNumber = lastNum + 1;
                }
            }
        }

        // Pad the number to 4 digits
        const nextInvoiceNo = `INV-${currentYear}-${nextNumber.toString().padStart(4, "0")}`;
        res.json({ nextInvoiceNo });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate next invoice number" });
    }
});


// GET: All invoices
router.get("/getAll", async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch invoices" });
    }
});

// GET: 5 most recently created invoices
router.get("/recent", async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 }).limit(5);
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch recent invoices" });
    }
});

// DELETE: Invoice by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deleted = await Invoice.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: "Invoice not found" });
        }
        res.json({ message: "Invoice deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete invoice" });
    }
});

// PATCH: Update invoice by ID
router.patch("/:id", async (req: Request, res: Response) => {
    try {
        const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ error: "Invoice not found" });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update invoice" });
    }
});

export default router;

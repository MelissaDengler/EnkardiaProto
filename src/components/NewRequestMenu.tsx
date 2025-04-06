import { useState } from 'react';
import { 
  PlusCircle, FileText, Calculator, Calendar, MessageSquare, 
  FileQuestion, Receipt, ClipboardList, X 
} from 'lucide-react';

interface NewRequestMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewRequestMenu({ isOpen, onClose }: NewRequestMenuProps) {
  if (!isOpen) return null;

  const requestTypes = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Financial Report Request",
      description: "Request specific financial reports or statements",
      action: () => console.log("Financial Report requested")
    },
    {
      icon: <Calculator className="h-5 w-5" />,
      title: "Tax Consultation",
      description: "Schedule a tax planning or consultation session",
      action: () => console.log("Tax Consultation requested")
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Meeting Request",
      description: "Schedule a meeting with your account manager",
      action: () => console.log("Meeting requested")
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Advisory Session",
      description: "Book a business advisory session",
      action: () => console.log("Advisory Session requested")
    },
    {
      icon: <FileQuestion className="h-5 w-5" />,
      title: "Document Review",
      description: "Submit documents for professional review",
      action: () => console.log("Document Review requested")
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      title: "Certificate Request",
      description: "Request tax clearance or other certificates",
      action: () => console.log("Certificate requested")
    },
    {
      icon: <ClipboardList className="h-5 w-5" />,
      title: "Compliance Check",
      description: "Request a compliance status review",
      action: () => console.log("Compliance Check requested")
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">New Request</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {requestTypes.map((request, index) => (
              <button
                key={index}
                onClick={() => {
                  request.action();
                  onClose();
                }}
                className="flex items-start gap-4 p-4 text-left rounded-lg
                         hover:bg-gray-50 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]
                            group-hover:bg-[hsl(var(--primary))] group-hover:text-white
                            transition-colors">
                  {request.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{request.title}</h3>
                  <p className="text-sm text-gray-500">{request.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
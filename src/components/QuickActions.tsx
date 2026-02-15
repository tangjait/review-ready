import { useState } from "react";
import { Calendar, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Employee } from "@/data/mockData";

interface QuickActionsProps {
  employee: Employee;
  onMarkComplete: (id: string) => void;
}

export function QuickActions({ employee, onMarkComplete }: QuickActionsProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  const meetingTemplate = `Performance Review Meeting

Employee: ${employee.name}
Role: ${employee.role} · ${employee.team}
Date: [Schedule Date]
Duration: 45 minutes

Agenda:
1. Review highlights and accomplishments
2. Discuss areas for growth
3. Set goals for next cycle
4. Career development conversation
5. Open Q&A

Preparation:
- Review AI-generated summary
- Prepare specific examples
- Update goal tracking`;

  const emailTemplate = `Subject: Peer Feedback Request - ${employee.name} Performance Review

Hi [Colleague Name],

I'm preparing ${employee.name}'s performance review for Q4 2025 and would value your perspective.

Could you share brief feedback on:
1. ${employee.name}'s key contributions you've observed
2. Collaboration and communication
3. Areas where they could grow

A few sentences for each would be very helpful. Please respond by [Date].

Thank you!
[Your Name]`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <>
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => setCalendarOpen(true)} title="Schedule review meeting">
          <Calendar size={14} />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => setEmailOpen(true)} title="Request peer feedback">
          <Mail size={14} />
        </Button>
        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-success" onClick={() => { onMarkComplete(employee.id); toast.success(`${employee.name} marked as completed`); }} title="Mark as completed">
          <CheckCircle size={14} />
        </Button>
      </div>

      <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-display">Meeting Template</DialogTitle></DialogHeader>
          <Textarea value={meetingTemplate} readOnly className="min-h-[250px] bg-secondary border-border text-sm font-mono" />
          <Button onClick={() => handleCopy(meetingTemplate, "Meeting template")} className="w-full">Copy to Clipboard</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-display">Peer Feedback Email</DialogTitle></DialogHeader>
          <Textarea value={emailTemplate} readOnly className="min-h-[250px] bg-secondary border-border text-sm font-mono" />
          <Button onClick={() => handleCopy(emailTemplate, "Email template")} className="w-full">Copy to Clipboard</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

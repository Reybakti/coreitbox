export type TicketStatus =
  | "OPEN"
  | "ASSIGNMENT_REQUEST"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export type TicketPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface TicketCategory {
  id: string;
  name: string;
}

export interface TicketUser {
  id: string;
  username: string;
  fullName: string;
  role: string;
}

export interface Ticket {
  id: string;

  ticketNumber: string;

  title: string;

  description: string;

  status: TicketStatus;

  priority: TicketPriority;

  createdAt: string;

  creator?: TicketUser;

  assignee?: TicketUser;

  category?: TicketCategory;
}
import { format } from 'date-fns';

export default function formatDate(dateString) {
  return format(new Date(dateString), 'MMMM d, yyyy');
}
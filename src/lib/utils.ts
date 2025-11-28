export const formatDisplayDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const hour = `${d.getHours()}`.padStart(2, "0");
    const minute = `${d.getMinutes()}`.padStart(2, "0");
    return `${year}/${month}/${day} ${hour}:${minute}`;
  }
  
  export const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate).getTime() > Date.now();
  }